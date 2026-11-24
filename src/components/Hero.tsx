import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { KEY_PRACTICE_METRICS, type ProjectWork } from '../data/portfolioData';
import { ExhibitionPlate } from './ExhibitionPlate';
import { Tilt3DCard } from './Tilt3DCard';

interface HeroProps {
  featuredProject: ProjectWork;
  onSelectProject: (project: ProjectWork) => void;
  onExploreWorks: () => void;
  onReadWriting: () => void;
}

export function Hero({
  featuredProject,
  onSelectProject,
  onExploreWorks,
  onReadWriting,
}: HeroProps) {
  return (
    <section id="top" className="pt-28 sm:pt-36 pb-12 sm:pb-20 px-5 sm:px-8 lg:px-16">
      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Typographic Column */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.06em] sm:tracking-[0.08em] text-[var(--text-secondary)] mb-4 sm:mb-5">
                Computer Science &amp; Engineering{' '}
                <span aria-hidden="true" className="mx-1 sm:mx-1.5 text-[var(--text-accent-peach)]">·</span>{' '}
                Full-Stack{' '}
                <span aria-hidden="true" className="mx-1 sm:mx-1.5 text-[var(--text-accent-peach)]">·</span>{' '}
                Backend &amp; APIs
              </p>

              <h1 className="font-serif text-[36px] leading-[44px] sm:text-[56px] sm:leading-[68px] font-semibold tracking-[-0.02em] text-[var(--text-primary)] max-w-xl">
                Building dependable full-stack &amp; API-driven Web Applications.
              </h1>

              <p className="mt-5 sm:mt-6 text-[16px] sm:text-[18px] leading-[27px] sm:leading-[30px] text-[var(--text-secondary)] max-w-[56ch]">
                Sundar Maity is a CSE student and Junior Developer at Imagin experienced in PHP
                (Laravel), React, Angular, Python, Node.js, MySQL, PostgreSQL, and MongoDB—turning
                real-world workflows into clean web applications.
              </p>
            </div>

            <div className="mt-7 sm:mt-10 flex flex-wrap items-center gap-5 sm:gap-6">
              <button
                type="button"
                onClick={onExploreWorks}
                className="seraphic-3d-btn inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] text-[14px] font-semibold hover:brightness-105 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-accent-blue)]"
              >
                <span>Explore Selected Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onReadWriting}
                className="editorial-link font-serif italic text-[18px] text-[var(--text-primary)] py-1 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--text-accent-blue)]"
              >
                Read Technical Notes
              </button>
            </div>
          </div>

          {/* Right Matching-Height 3D Architecture Plate */}
          <div className="lg:col-span-6 flex">
            <Tilt3DCard className="w-full" maxTiltDeg={6}>
              <button
                type="button"
                onClick={() => onSelectProject(featuredProject)}
                aria-label={`Open featured project: ${featuredProject.title}`}
                style={{ transformStyle: 'preserve-3d' }}
                className="group seraphic-card seraphic-card-interactive w-full h-full rounded-2xl p-4 sm:p-5 text-left flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--text-accent-blue)]"
              >
                <div className="depth-z-1 relative w-full h-72 sm:h-96 lg:h-full lg:min-h-[380px] rounded-xl overflow-hidden border border-[var(--border-card)] shadow-[0_14px_28px_-10px_rgba(21,28,39,0.22)]">
                  <ExhibitionPlate
                    variant={featuredProject.plates[0].variant}
                    title={`${featuredProject.title} — ${featuredProject.plates[0].caption}`}
                    className="w-full h-full"
                  />

                  <div className="depth-z-2 absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0d121b]/84 via-[#0d121b]/44 to-transparent px-5 pt-12 pb-4 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#f5b69e]">
                        {featuredProject.featuredLabel ?? 'Featured System'}
                      </p>
                      <p className="font-serif text-[20px] sm:text-[24px] leading-snug text-white mt-0.5">
                        {featuredProject.title}
                      </p>
                    </div>
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/95 text-[#151c27] shrink-0 group-hover:bg-[#8db9f0] transition-colors shadow-md">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[13px] text-[var(--text-secondary)] px-1">
                  <span>
                    {featuredProject.category} <span aria-hidden="true">·</span> {featuredProject.location}
                  </span>
                  <span className="tabular-nums font-medium text-[var(--text-accent-blue)]">
                    {featuredProject.year} — Inspect Architecture
                  </span>
                </div>
              </button>
            </Tilt3DCard>
          </div>
        </div>

        {/* Full-Width Key Practice 3D Stepped Strip Below Split */}
        <div className="mt-10 sm:mt-14 pt-8 border-t border-[var(--border-subtle)] grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {KEY_PRACTICE_METRICS.map((metric) => (
            <div key={metric.label} className="seraphic-3d-tile rounded-xl px-5 py-4 flex flex-col gap-1">
              <span className="font-serif text-[28px] sm:text-[34px] font-medium tracking-tight text-[var(--text-primary)] tabular-nums">
                {metric.figure}
              </span>
              <span className="text-[13px] text-[var(--text-secondary)]">{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
