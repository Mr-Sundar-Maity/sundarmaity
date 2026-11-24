import { useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Mail, Send } from 'lucide-react';
import {
  buildContactMailtoUrl,
  DEFAULT_CONTACT_RECIPIENT,
} from '../utils/contactEmail';
import {
  formatInquiryReference,
  INQUIRY_TYPES,
  validateInquiryForm,
  type InquiryValidationErrors,
} from '../utils/portfolio';

interface SubmittedRecord {
  reference: string;
  recipient: string;
  name: string;
  email: string;
  inquiryType: string;
  message: string;
}

interface DeliveryFailureState {
  message: string;
  mailtoUrl: string;
}

export function InquirySection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState<string>(INQUIRY_TYPES[0]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<InquiryValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryFailure, setDeliveryFailure] = useState<DeliveryFailureState | null>(null);
  const [submitted, setSubmitted] = useState<SubmittedRecord | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const result = validateInquiryForm({ name, email, inquiryType, message });
    if (!result.isValid) {
      setErrors(result.errors);
      setDeliveryFailure(null);
      return;
    }

    setErrors({});
    setDeliveryFailure(null);
    setIsSubmitting(true);

    const trimmedPayload = {
      name: name.trim(),
      email: email.trim(),
      inquiryType,
      message: message.trim(),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trimmedPayload),
      });

      const data = (await response.json().catch(() => ({}))) as {
        delivered?: boolean;
        reference?: string;
        recipient?: string;
        mailtoUrl?: string;
        error?: string;
      };

      if (!response.ok || !data.delivered) {
        setDeliveryFailure({
          message:
            data.error ??
            'Unable to send the email automatically right now. You can still send it directly using your email app.',
          mailtoUrl: data.mailtoUrl || buildContactMailtoUrl(trimmedPayload),
        });
        return;
      }

      setSubmitted({
        reference: data.reference || formatInquiryReference(trimmedPayload.name),
        recipient: data.recipient || DEFAULT_CONTACT_RECIPIENT,
        ...trimmedPayload,
      });
    } catch {
      setDeliveryFailure({
        message:
          'Network error while contacting the mail service. Please try again or send directly via your email app.',
        mailtoUrl: buildContactMailtoUrl(trimmedPayload),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewInquiry = () => {
    setSubmitted(null);
    setDeliveryFailure(null);
    setName('');
    setEmail('');
    setInquiryType(INQUIRY_TYPES[0]);
    setMessage('');
    setErrors({});
  };

  return (
    <section id="inquire" className="scroll-mt-24 py-16 sm:py-24 px-5 sm:px-8 lg:px-16">
      <div className="max-w-[1360px] mx-auto">
        <div className="seraphic-card rounded-2xl p-6 sm:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Contact Invitation */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)] mb-2">
                Internships, Roles &amp; Research
              </p>
              <h2 className="font-serif text-[28px] leading-[36px] sm:text-[40px] sm:leading-[50px] font-medium tracking-[-0.015em] text-[var(--text-primary)]">
                Get in Touch
              </h2>
              <p className="mt-4 text-[15px] leading-[25px] text-[var(--text-secondary)]">
                Open to backend, systems, and AI engineering internships, new-grad SWE roles (2027),
                and open-source or academic research collaborations.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] space-y-3 text-[14px]">
              <div>
                <span className="text-[var(--text-secondary)]">Direct Email: </span>
                <a
                  href={`mailto:${DEFAULT_CONTACT_RECIPIENT}`}
                  className="font-semibold text-[var(--text-accent-blue)] hover:underline"
                >
                  {DEFAULT_CONTACT_RECIPIENT}
                </a>
              </div>
              <p className="text-[var(--text-secondary)]">
                Typical response window: within 24 hours.
              </p>
            </div>
          </div>

          {/* Right Form or Confirmation Receipt */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div
                className="rounded-xl bg-[var(--surface-subtle)] border border-[#8db9f0]/45 p-6 sm:p-8"
                data-testid="inquiry-confirmation"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[var(--text-accent-blue-strong)] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-accent-blue-strong)]">
                      Email Delivered · {submitted.reference}
                    </p>
                    <h3 className="mt-1 font-serif text-[26px] text-[var(--text-primary)]">
                      Thank you, {submitted.name}.
                    </h3>
                    <p className="mt-2 text-[15px] leading-[24px] text-[var(--text-secondary)]">
                      Your {submitted.inquiryType.toLowerCase()} note has been emailed to Sundar
                      Maity ({submitted.recipient}). He will reply to{' '}
                      <span className="font-semibold text-[var(--text-primary)]">{submitted.email}</span>{' '}
                      shortly.
                    </p>

                    <div className="mt-5 p-4 rounded-lg bg-[var(--surface-card)] border border-[var(--border-card)] text-[13px] text-[var(--text-secondary)]">
                      <p className="font-semibold text-[var(--text-primary)] mb-1">Submitted Summary</p>
                      <p>{submitted.message}</p>
                    </div>

                    <button
                      type="button"
                      onClick={handleNewInquiry}
                      className="mt-6 inline-flex items-center px-5 py-2.5 rounded-lg bg-[var(--surface-card)] border border-[var(--border-subtle)] text-[13px] font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-subtle-hover)] transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {deliveryFailure && (
                  <div
                    role="alert"
                    data-testid="inquiry-delivery-error"
                    className="rounded-xl bg-[var(--surface-subtle)] border border-[var(--text-error)]/35 p-4 text-[13px]"
                  >
                    <div className="flex items-start gap-2.5 text-[var(--text-error)] font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{deliveryFailure.message}</span>
                    </div>
                    <div className="mt-3 pl-6">
                      <a
                        href={deliveryFailure.mailtoUrl}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--surface-card)] border border-[var(--border-subtle)] text-[13px] font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-subtle-hover)] transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-[var(--text-accent-blue)]" />
                        <span>Send via Email App</span>
                      </a>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="inquiry-name"
                      className="block text-[13px] font-semibold text-[var(--text-primary)] mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="inquiry-name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
                      placeholder="John Doe"
                      className="w-full h-12 px-4 rounded-lg bg-[var(--surface-card)] border border-[var(--border-input)] text-[15px] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 focus:outline-none focus:border-[#8db9f0] focus:ring-3 focus:ring-[#8db9f0]/25 transition-all"
                    />
                    {errors.name && (
                      <p
                        id="inquiry-name-error"
                        className="mt-1.5 inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--text-error)]"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-email"
                      className="block text-[13px] font-semibold text-[var(--text-primary)] mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="inquiry-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'inquiry-email-error' : undefined}
                      placeholder="name@company.com"
                      className="w-full h-12 px-4 rounded-lg bg-[var(--surface-card)] border border-[var(--border-input)] text-[15px] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 focus:outline-none focus:border-[#8db9f0] focus:ring-3 focus:ring-[#8db9f0]/25 transition-all"
                    />
                    {errors.email && (
                      <p
                        id="inquiry-email-error"
                        className="mt-1.5 inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--text-error)]"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-type"
                    className="block text-[13px] font-semibold text-[var(--text-primary)] mb-1.5"
                  >
                    Inquiry Focus
                  </label>
                  <select
                    id="inquiry-type"
                    name="inquiryType"
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full h-12 px-4 rounded-lg bg-[var(--surface-card)] border border-[var(--border-input)] text-[15px] text-[var(--text-primary)] focus:outline-none focus:border-[#8db9f0] focus:ring-3 focus:ring-[#8db9f0]/25 transition-all"
                  >
                    {INQUIRY_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-message"
                    className="block text-[13px] font-semibold text-[var(--text-primary)] mb-1.5"
                  >
                      Message / Role Outline
                    </label>
                    <textarea
                      id="inquiry-message"
                      name="message"
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                      }}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'inquiry-message-error' : undefined}
                      placeholder="Share details about the engineering team, internship timeline, or research topic..."
                      className="w-full p-4 rounded-lg bg-[var(--surface-card)] border border-[var(--border-input)] text-[15px] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 focus:outline-none focus:border-[#8db9f0] focus:ring-3 focus:ring-[#8db9f0]/25 transition-all resize-y"
                    />
                    {errors.message && (
                      <p
                        id="inquiry-message-error"
                        className="mt-1.5 inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--text-error)]"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <p className="text-[12px] text-[var(--text-secondary)]">
                      All notes are reviewed directly by Sundar Maity.
                    </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="seraphic-3d-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] text-[14px] font-semibold hover:brightness-105 disabled:opacity-65 disabled:cursor-not-allowed whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-accent-blue)]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
