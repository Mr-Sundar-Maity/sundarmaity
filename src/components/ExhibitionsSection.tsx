import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { ExhibitionItem } from '../data/portfolioData';

interface ExhibitionsSectionProps {
  exhibitions: ExhibitionItem[];
}

export function ExhibitionsSection({ exhibitions }: ExhibitionsSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(exhibitions[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <section id="experience" className="scroll-mt-24 py-16 sm:py-24 px-5 sm:px-8 lg:px-16">
      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)] mb-2">
              Internships, Roles &amp; Hackathons
            </p>
            <h2 className="font-serif text-[28px] leading-[36px] sm:text-[40px] sm:leading-[50px] font-medium tracking-[-0.015em] text-[var(--text-primary)]">
              Experience &amp; Milestones
            </h2>
            <p className="mt-4 text-[15px] leading-[24px] text-[var(--text-secondary)]">
              Industry internships at Imagine TechPark, Infosys (WebGuru), and Wipro, Junior Developer role at
              Imagine TechPark, HR operations at Forever Living Products, and Red Hat Hackathon leadership.
            </p>
          </div>

          <div className="lg:col-span-8 seraphic-card rounded-2xl divide-y divide-[var(--border-card)]">
            {exhibitions.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div key={item.id} className="p-6 sm:p-7">
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => toggleItem(item.id)}
                    className="w-full text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--text-accent-blue)]"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                      <span className="tabular-nums text-[14px] font-semibold text-[var(--text-accent-blue)] shrink-0">
                        {item.year}
                      </span>
                      <div>
                        <h3 className="font-serif text-[22px] leading-[30px] text-[var(--text-primary)]">
                          {item.title}
                        </h3>
                        <p className="text-[13px] text-[var(--text-secondary)] mt-0.5">
                          {item.institution} <span aria-hidden="true">·</span> {item.city}{' '}
                          <span aria-hidden="true">·</span> {item.role}
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--text-secondary)] shrink-0">
                      <span>{isExpanded ? 'Hide details' : 'Engineering note'}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="mt-4 sm:pl-14 pt-4 border-t border-[var(--border-card)]">
                      <p className="text-[15px] leading-[24px] text-[var(--text-primary)] font-medium">
                        {item.summary}
                      </p>
                      <p className="mt-2 text-[14px] leading-[22px] text-[var(--text-secondary)]">
                        {item.curatorialNote}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
