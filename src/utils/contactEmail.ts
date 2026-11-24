export const DEFAULT_CONTACT_RECIPIENT = 'maitysundar84@gmail.com';

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function formatContactReference(name: string, timestamp = new Date()): string {
  const initials =
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('') || 'SM';
  const year = timestamp.getFullYear();
  const month = String(timestamp.getMonth() + 1).padStart(2, '0');
  const day = String(timestamp.getDate()).padStart(2, '0');
  return `INQ-${year}${month}${day}-${initials}`;
}

export function validateContactPayload(input: Partial<ContactSubmissionPayload>): {
  isValid: boolean;
  sanitized: ContactSubmissionPayload;
  error?: string;
} {
  const name = typeof input.name === 'string' ? input.name.trim() : '';
  const email = typeof input.email === 'string' ? input.email.trim() : '';
  const inquiryType =
    typeof input.inquiryType === 'string' ? input.inquiryType.trim() : '';
  const message = typeof input.message === 'string' ? input.message.trim() : '';

  if (name.length < 2) {
    return {
      isValid: false,
      sanitized: { name, email, inquiryType, message },
      error: 'Please enter your name (at least 2 characters).',
    };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailPattern.test(email)) {
    return {
      isValid: false,
      sanitized: { name, email, inquiryType, message },
      error: 'Please enter a valid email address.',
    };
  }

  if (!inquiryType) {
    return {
      isValid: false,
      sanitized: { name, email, inquiryType, message },
      error: 'Please select an inquiry focus.',
    };
  }

  if (message.length < 15) {
    return {
      isValid: false,
      sanitized: { name, email, inquiryType, message },
      error: 'Please share a brief note or role outline (at least 15 characters).',
    };
  }

  return {
    isValid: true,
    sanitized: {
      name: name.slice(0, 120),
      email: email.slice(0, 200),
      inquiryType: inquiryType.slice(0, 120),
      message: message.slice(0, 5000),
    },
  };
}

export function buildContactMailtoUrl(
  payload: ContactSubmissionPayload,
  recipient = DEFAULT_CONTACT_RECIPIENT
): string {
  const subject = `[Portfolio Inquiry] ${payload.inquiryType || 'Inquiry'} — ${payload.name || 'Visitor'}`;
  const body = [
    `Name: ${payload.name}`,
    `Reply Email: ${payload.email}`,
    `Inquiry Focus: ${payload.inquiryType}`,
    '',
    'Message:',
    payload.message,
  ].join('\n');

  const params = new URLSearchParams({ subject, body });
  return `mailto:${recipient}?${params.toString().replace(/\+/g, '%20')}`;
}

export function buildContactEmailContent(
  payload: ContactSubmissionPayload,
  reference: string
): {
  subject: string;
  text: string;
  html: string;
} {
  const subject = `[Portfolio Inquiry] ${payload.inquiryType} — ${payload.name} (${reference})`;

  const text = [
    `New portfolio inquiry received (${reference})`,
    '',
    `From: ${payload.name} <${payload.email}>`,
    `Inquiry Focus: ${payload.inquiryType}`,
    '',
    'Message:',
    payload.message,
  ].join('\n');

  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeType = escapeHtml(payload.inquiryType);
  const safeRef = escapeHtml(reference);
  const safeMessageHtml = escapeHtml(payload.message).replace(/\r?\n/g, '<br />');

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a2130; background: #f8fafd; border: 1px solid #d9e2f2; border-radius: 12px;">
      <p style="margin: 0 0 8px; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #4678b8;">
        Portfolio Inquiry &middot; ${safeRef}
      </p>
      <h2 style="margin: 0 0 20px; font-size: 22px; font-weight: 600; color: #121826;">
        New Message from ${safeName}
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; background: #ffffff; border: 1px solid #e3eaf6; border-radius: 8px;">
        <tr>
          <td style="padding: 10px 14px; font-size: 13px; color: #5b677a; width: 130px; border-bottom: 1px solid #edf2fa;">Sender</td>
          <td style="padding: 10px 14px; font-size: 14px; font-weight: 600; color: #121826; border-bottom: 1px solid #edf2fa;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 14px; font-size: 13px; color: #5b677a; border-bottom: 1px solid #edf2fa;">Reply-To Email</td>
          <td style="padding: 10px 14px; font-size: 14px; color: #121826; border-bottom: 1px solid #edf2fa;">
            <a href="mailto:${safeEmail}" style="color: #2f66ad; text-decoration: none;">${safeEmail}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 14px; font-size: 13px; color: #5b677a;">Inquiry Focus</td>
          <td style="padding: 10px 14px; font-size: 14px; color: #121826;">${safeType}</td>
        </tr>
      </table>
      <div style="padding: 16px; background: #ffffff; border: 1px solid #e3eaf6; border-radius: 8px;">
        <p style="margin: 0 0 8px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #5b677a;">Message</p>
        <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1a2130;">${safeMessageHtml}</p>
      </div>
    </div>
  `.trim();

  return { subject, text, html };
}
