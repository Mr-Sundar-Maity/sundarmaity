import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import nodemailer from 'nodemailer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildContactEmailContent,
  buildContactMailtoUrl,
  DEFAULT_CONTACT_RECIPIENT,
  formatContactReference,
  validateContactPayload,
  type ContactSubmissionPayload,
} from './src/utils/contactEmail.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';

async function sendViaSmtp(
  payload: ContactSubmissionPayload,
  reference: string,
  recipient: string
): Promise<boolean> {
  const user = process.env.SMTP_USER?.trim() || process.env.GMAIL_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim() || process.env.GMAIL_APP_PASSWORD?.trim();
  if (!user || !pass) {
    return false;
  }

  const host = process.env.SMTP_HOST?.trim() || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT || '465');
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465;
  const from = process.env.SMTP_FROM?.trim() || `"Sundar Maity Portfolio" <${user}>`;
  const { subject, text, html } = buildContactEmailContent(payload, reference);

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to: recipient,
    replyTo: `"${payload.name.replace(/"/g, '')}" <${payload.email}>`,
    subject,
    text,
    html,
  });

  return true;
}

async function sendViaResend(
  payload: ContactSubmissionPayload,
  reference: string,
  recipient: string
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return false;
  }

  const from = process.env.RESEND_FROM?.trim() || 'Portfolio Contact <onboarding@resend.dev>';
  const { subject, text, html } = buildContactEmailContent(payload, reference);

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [recipient],
      reply_to: payload.email,
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend API rejected the request (${response.status}): ${details}`);
  }

  return true;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.post('/api/contact', async (req: Request, res: Response) => {
    const validation = validateContactPayload((req.body ?? {}) as Partial<ContactSubmissionPayload>);
    if (!validation.isValid) {
      res.status(400).json({
        delivered: false,
        error: validation.error ?? 'Please fill in all required inquiry fields.',
      });
      return;
    }

    const recipient = process.env.CONTACT_RECIPIENT_EMAIL?.trim() || DEFAULT_CONTACT_RECIPIENT;
    const reference = formatContactReference(validation.sanitized.name);
    const mailtoUrl = buildContactMailtoUrl(validation.sanitized, recipient);

    try {
      const sentSmtp = await sendViaSmtp(validation.sanitized, reference, recipient);
      const sentResend = sentSmtp
        ? false
        : await sendViaResend(validation.sanitized, reference, recipient);

      if (!sentSmtp && !sentResend) {
        console.warn(
          'Contact form received without SMTP_USER/SMTP_PASS or RESEND_API_KEY configured.'
        );
        res.status(503).json({
          delivered: false,
          code: 'EMAIL_NOT_CONFIGURED',
          recipient,
          mailtoUrl,
          error: `Direct web mail delivery is currently unavailable on the server. Click below to send your message straight to ${recipient} from your email app.`,
        });
        return;
      }

      res.status(200).json({
        delivered: true,
        reference,
        recipient,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to deliver email through mail server.';
      console.error('Contact /api/contact delivery error:', message);
      res.status(502).json({
        delivered: false,
        code: 'EMAIL_DELIVERY_FAILED',
        recipient,
        mailtoUrl,
        error:
          'We could not deliver your message via the mail server right now. Please try again or use your email app below.',
      });
    }
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
