import { useEffect, useState } from 'react';
import { BookOpen, X } from 'lucide-react';
import type { EssayArticle } from '../data/portfolioData';
import { Tilt3DCard } from './Tilt3DCard';

interface WritingSectionProps {
  essays: EssayArticle[];
}

export function WritingSection({ essays }: WritingSectionProps) {
  const [activeEssay, setActiveEssay] = useState<EssayArticle | null>(null);

  useEffect(() => {
    if (!activeEssay) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveEssay(null);
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeEssay]);

  return (
    <section id="notes" className="scroll-mt-24 py-16 sm:py-24 px-5 sm:px-8 lg:px-16">
      <div className="max-w-[1360px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[var(--border-subtle)]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)] mb-2">
              Architecture &amp; Implementation
            </p>
            <h2 className="font-serif text-[28px] leading-[36px] sm:text-[40px] sm:leading-[50px] font-medium tracking-[-0.015em] text-[var(--text-primary)]">
              Technical Notes
            </h2>
          </div>
          <p className="text-[14px] text-[var(--text-secondary)]">
            Practical notes on Laravel transactions, SQL vs. MongoDB design, and media API integration.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {essays.map((essay) => (
            <article key={essay.id}>
              <Tilt3DCard className="h-full" maxTiltDeg={5.5}>
                <button
                  type="button"
                  onClick={() => setActiveEssay(essay)}
                  aria-label={`Read essay: ${essay.title}`}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="group seraphic-card seraphic-card-interactive w-full h-full rounded-2xl p-6 sm:p-7 text-left flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-accent-blue)]"
                >
                  <div className="depth-z-1">
                    <p className="text-[12px] text-[var(--text-secondary)]">
                      <span>{essay.date}</span>
                      <span aria-hidden="true" className="mx-1.5 text-[var(--text-accent-peach)]">·</span>
                      <span>{essay.readTime}</span>
                    </p>
                    <h3 className="mt-3 font-serif text-[22px] sm:text-[24px] leading-[32px] text-[var(--text-primary)] group-hover:text-[var(--text-accent-blue-strong)] transition-colors">
                      {essay.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[24px] text-[var(--text-secondary)]">
                      {essay.abstract}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--border-card)] flex items-center justify-between text-[13px]">
                    <span className="text-[var(--text-secondary)] truncate pr-2">{essay.publication}</span>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--text-accent-blue)] shrink-0">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read</span>
                    </span>
                  </div>
                </button>
              </Tilt3DCard>
            </article>
          ))}
        </div>
      </div>

      {/* Essay Reader Modal */}
      {activeEssay && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="essay-reader-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0b1018]/55 backdrop-blur-sm"
          onClick={() => setActiveEssay(null)}
        >
          <div
            className="seraphic-card w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl p-6 sm:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
              <div>
                <p className="text-[12px] text-[var(--text-secondary)]">
                  {activeEssay.publication} <span aria-hidden="true">·</span> {activeEssay.date}{' '}
                  <span aria-hidden="true">·</span> {activeEssay.readTime}
                </p>
                <h3
                  id="essay-reader-title"
                  className="mt-2 font-serif text-[28px] sm:text-[32px] leading-[36px] sm:leading-[40px] text-[var(--text-primary)]"
                >
                  {activeEssay.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveEssay(null)}
                aria-label="Close essay reader"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 space-y-5 text-[16px] leading-[28px] text-[var(--text-primary)]">
              {activeEssay.bodyParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 pt-5 border-t border-[var(--border-subtle)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-secondary)]">
                Citation
              </p>
              <p className="mt-1 text-[13px] text-[var(--text-secondary)]">{activeEssay.citation}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
