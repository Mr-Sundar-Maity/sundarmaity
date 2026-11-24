import { Github, Linkedin, Mail } from 'lucide-react';
import { DEFAULT_CONTACT_RECIPIENT } from '../utils/contactEmail';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

const SOCIAL_LINKS = [
  // {
  //   id: 'github',
  //   label: 'GitHub',
  //   href: 'https://github.com/sundarmaity',
  //   ariaLabel: 'Sundar Maity on GitHub',
  //   external: true,
  //   icon: Github,
  // },
  // {
  //   id: 'linkedin',
  //   label: 'LinkedIn',
  //   href: 'https://www.linkedin.com/in/sundar-maity',
  //   ariaLabel: 'Sundar Maity on LinkedIn',
  //   external: true,
  //   icon: Linkedin,
  // },
  {
    id: 'email',
    label: 'Email',
    href: `mailto:${DEFAULT_CONTACT_RECIPIENT}`,
    ariaLabel: `Email Sundar Maity at ${DEFAULT_CONTACT_RECIPIENT}`,
    external: false,
    icon: Mail,
  },
] as const;

export function Footer({ onNavigateSection }: FooterProps) {
  return (
    <footer className="relative z-10 py-12 px-5 sm:px-8 lg:px-16 border-t border-[var(--border-subtle)] bg-[var(--surface-glass-rest)]/50">
      <div className="max-w-[1360px] mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-serif text-[20px] text-[var(--text-primary)]">Sundar Maity</p>
            <p className="mt-1 text-[13px] text-[var(--text-secondary)]">
              B.Tech Computer Science &amp; Engineering — Full-Stack Web &amp; API Engineering
            </p>
          </div>

          <nav
            aria-label="Footer section navigation"
            className="flex flex-wrap items-center gap-6 text-[13px] text-[var(--text-secondary)]"
          >
            <button
              type="button"
              onClick={() => onNavigateSection('work')}
              className="hover:text-[var(--text-primary)] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--text-accent-blue)]"
            >
              Projects
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection('experience')}
              className="hover:text-[var(--text-primary)] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--text-accent-blue)]"
            >
              Experience
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection('skills')}
              className="hover:text-[var(--text-primary)] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--text-accent-blue)]"
            >
              Skills
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection('notes')}
              className="hover:text-[var(--text-primary)] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--text-accent-blue)]"
            >
              Notes
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-[var(--border-card)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <nav
            aria-label="Social media and email profiles"
            className="flex flex-wrap items-center gap-6 text-[13px] font-medium text-[var(--text-secondary)]"
          >
            {SOCIAL_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  aria-label={item.ariaLabel}
                  {...(item.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="editorial-link text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-1 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--text-accent-blue)]"
                >
                  <Icon aria-hidden="true" className="w-4 h-4 text-[var(--text-accent-blue)]" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          <span className="text-[13px] text-[var(--text-secondary)]/80">
            © 2026 Sundar Maity
          </span>
        </div>
      </div>
    </footer>
  );
}

