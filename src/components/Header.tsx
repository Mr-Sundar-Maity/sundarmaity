import { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import type { ThemeMode } from '../utils/portfolio';

interface HeaderProps {
  onNavigateSection: (sectionId: string) => void;
  activeSectionId?: string | null;
  isScrolled?: boolean;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

const NAV_ITEMS = [
  { id: 'work', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'notes', label: 'Notes' },
];

export function Header({
  onNavigateSection,
  activeSectionId = null,
  isScrolled = false,
  theme,
  onToggleTheme,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  const isDark = theme === 'dark';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 px-5 sm:px-8 lg:px-16 pointer-events-none transition-[padding] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isScrolled ? 'pt-2.5 sm:pt-3' : 'pt-4'
      }`}
    >
      <div className="max-w-[1360px] mx-auto pointer-events-auto">
        <div
          data-scrolled={isScrolled ? 'true' : 'false'}
          className={`nav-glass-bar rounded-xl px-5 sm:px-7 flex items-center justify-between gap-8 ${
            isScrolled ? 'h-13 sm:h-14' : 'h-14 sm:h-16'
          }`}
        >
          {/* Diffused refraction & specular glass sweep layers */}
          <span aria-hidden="true" className="nav-glass-aura" />
          <span aria-hidden="true" className="nav-glass-sheen" />

          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('top');
            }}
            className="relative z-10 font-serif text-xl sm:text-2xl font-medium tracking-tight text-[var(--text-primary)] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--text-accent-blue)]"
          >
            Sundar Maity
          </a>

          {/* Zone 2: 4 concise single-line nav links */}
          <nav
            aria-label="Primary navigation"
            className="relative z-10 hidden md:flex items-center gap-8 text-[14px] font-medium text-[var(--text-secondary)]"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSectionId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.id);
                  }}
                  className={`editorial-link py-1 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--text-accent-blue)] ${
                    isActive
                      ? 'editorial-link-active text-[var(--text-primary)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Theme Toggle + Primary CTA */}
          <div className="relative z-10 flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              aria-pressed={isDark}
              title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)]/80 backdrop-blur-md text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-accent-blue)]"
            >
              {isDark ? <Sun className="w-4 h-4 text-[#f5b69e]" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href="#inquire"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('inquire');
              }}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-[13px] font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-lg hover:brightness-105 hover:shadow-[0_8px_24px_-2px_rgba(141,185,240,0.42)] transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-accent-blue)]"
            >
              Contact
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--text-accent-blue)]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="md:hidden mt-2 nav-glass-dropdown rounded-xl p-4 flex flex-col gap-1"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSectionId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.id);
                  }}
                  className={`px-3 py-2.5 rounded-lg text-[15px] font-medium transition-colors ${
                    isActive
                      ? 'bg-[var(--surface-subtle-hover)] text-[var(--text-primary)] font-semibold'
                      : 'text-[var(--text-primary)] hover:bg-[var(--surface-subtle)]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="#inquire"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('inquire');
              }}
              className="mt-2 inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-[14px] font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)]"
            >
              Contact
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
