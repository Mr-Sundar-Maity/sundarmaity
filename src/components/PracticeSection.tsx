import type { PracticePillar } from '../data/portfolioData';

interface PracticeSectionProps {
  pillars: PracticePillar[];
}

export function PracticeSection({ pillars }: PracticeSectionProps) {
  return (
    <section id="skills" className="scroll-mt-24 py-16 sm:py-24 px-5 sm:px-8 lg:px-16">
      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Manifesto */}
          <div className="lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)] mb-3">
              Technical Skills &amp; Stack
            </p>
            <h2 className="font-serif text-[28px] leading-[38px] sm:text-[40px] sm:leading-[50px] font-medium tracking-[-0.015em] text-[var(--text-primary)]">
              Full-stack versatility backed by solid databases.
            </h2>
            <p className="mt-5 text-[16px] leading-[28px] text-[var(--text-secondary)]">
              Hands-on experience across frontend frameworks, PHP (Laravel), Python, Node.js, REST
              APIs, and both SQL (MySQL, PostgreSQL) and NoSQL (MongoDB) data modeling.
            </p>

            <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] grid grid-cols-2 gap-6 text-[13px]">
              <div>
                <p className="font-semibold text-[var(--text-primary)]">Core Stack</p>
                <p className="mt-1 text-[var(--text-secondary)]">
                  PHP (Laravel) · React · Angular · Node.js · Python
                </p>
              </div>
              <div>
                <p className="font-semibold text-[var(--text-primary)]">Data &amp; Email</p>
                <p className="mt-1 text-[var(--text-secondary)]">
                  MySQL · PostgreSQL · MongoDB · maitysundar84@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Right Numbered 3D Stepped Pillars */}
          <div className="lg:col-span-7 space-y-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="seraphic-3d-tile rounded-2xl p-6 sm:p-7 grid grid-cols-1 sm:grid-cols-12 gap-4"
              >
                <div className="sm:col-span-2">
                  <span className="font-serif text-[26px] text-[var(--text-accent-blue)] tabular-nums">
                    {pillar.number}.
                  </span>
                </div>
                <div className="sm:col-span-10">
                  <h3 className="font-serif text-[24px] leading-[32px] text-[var(--text-primary)]">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-[13px] font-medium text-[var(--text-accent-peach)]">
                    {pillar.subtitle}
                  </p>
                  <p className="mt-3 text-[15px] leading-[25px] text-[var(--text-secondary)]">
                    {pillar.description}
                  </p>
                  <p className="mt-3 text-[12px] text-[var(--text-secondary)]/90">
                    {pillar.deliverables}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
