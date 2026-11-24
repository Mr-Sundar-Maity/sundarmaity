import { useMemo, useState } from 'react';
import { ArrowUpRight, LayoutGrid, List, Search, X } from 'lucide-react';
import {
  DISCIPLINE_CATEGORIES,
  type DisciplineCategory,
  type ProjectWork,
} from '../data/portfolioData';
import { filterProjects } from '../utils/portfolio';
import { ExhibitionPlate } from './ExhibitionPlate';
import { Tilt3DCard } from './Tilt3DCard';

interface WorksGalleryProps {
  projects: ProjectWork[];
  onSelectProject: (project: ProjectWork) => void;
}

type ViewMode = 'gallery' | 'index';

export function WorksGallery({ projects, onSelectProject }: WorksGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<DisciplineCategory>('All Works');
  const [viewMode, setViewMode] = useState<ViewMode>('gallery');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(
    () => filterProjects(projects, activeCategory, searchQuery),
    [projects, activeCategory, searchQuery]
  );

  const handleResetFilters = () => {
    setActiveCategory('All Works');
    setSearchQuery('');
  };

  return (
    <section id="work" className="scroll-mt-24 py-16 sm:py-24 px-5 sm:px-8 lg:px-16">
      <div className="max-w-[1360px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[var(--border-subtle)]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)] mb-2">
              Selected Projects
            </p>
            <h2 className="font-serif text-[28px] leading-[36px] sm:text-[40px] sm:leading-[50px] font-medium tracking-[-0.015em] text-[var(--text-primary)]">
              Full-Stack Laravel &amp; API Builds
            </h2>
          </div>

          <p className="text-[15px] leading-[24px] text-[var(--text-secondary)] max-w-md">
            Practical web applications engineered across PHP (Laravel), MySQL, REST APIs, and
            modern client frameworks—built for reliability and everyday usability.
          </p>
        </div>

        {/* Filter Controls, Search & View Toggle */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Filter works by discipline"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[var(--surface-control-bar)] border border-[var(--border-card)] rounded-xl w-fit"
          >
            {DISCIPLINE_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--text-accent-blue)] ${
                    isActive
                      ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-semibold shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-subtle)]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Compact Search Input */}
            <div className="relative flex-1 sm:flex-initial sm:w-56">
              <Search
                aria-hidden="true"
                className="w-4 h-4 text-[var(--text-secondary)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              />
              <label htmlFor="works-search" className="sr-only">
                Search projects by title, stack, or domain
              </label>
              <input
                id="works-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by title or stack"
                className="w-full h-10 pl-9 pr-8 rounded-lg bg-[var(--surface-card)] border border-[var(--border-input)] text-[13px] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/65 focus:outline-none focus:border-[#8db9f0] focus:ring-3 focus:ring-[#8db9f0]/25 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search filter"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* View Switcher */}
            <div
              role="group"
              aria-label="Choose layout view"
              className="inline-flex items-center gap-1 p-1 bg-[var(--surface-control-bar)] border border-[var(--border-card)] rounded-xl"
            >
              <button
                type="button"
                onClick={() => setViewMode('gallery')}
                aria-pressed={viewMode === 'gallery'}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--text-accent-blue)] ${
                  viewMode === 'gallery'
                    ? 'bg-[var(--surface-subtle-hover)] text-[var(--text-primary)] font-semibold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Gallery Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('index')}
                aria-pressed={viewMode === 'index'}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--text-accent-blue)] ${
                  viewMode === 'index'
                    ? 'bg-[var(--surface-subtle-hover)] text-[var(--text-primary)] font-semibold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Catalogue Index</span>
              </button>
            </div>
          </div>
        </div>

        {/* Active Count Readout */}
        <p className="mt-5 text-[13px] text-[var(--text-secondary)] tabular-nums" data-testid="works-count">
          Showing {filteredProjects.length} of {projects.length} projects
          {activeCategory !== 'All Works' ? ` in ${activeCategory}` : ''}
        </p>

        {/* Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="mt-8 seraphic-card rounded-2xl p-12 text-center">
            <p className="font-serif text-[24px] text-[var(--text-primary)]">
              No projects match this filter.
            </p>
            <p className="mt-2 text-[15px] text-[var(--text-secondary)]">
              Adjust your domain tab or clear the stack keyword to view all shipped projects.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-6 inline-flex items-center px-5 py-2.5 rounded-lg bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] text-[13px] font-semibold hover:brightness-105 transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'gallery' ? (
          /* Bento Gallery Grid */
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            {filteredProjects.map((project, idx) => {
              const isDefaultBento = activeCategory === 'All Works' && !searchQuery;
              const isLeadBento = idx === 0 && isDefaultBento;
              const isTopRowPair = (idx === 0 || idx === 1) && isDefaultBento;
              return (
                <article
                  key={project.id}
                  className={
                    isLeadBento
                      ? 'md:col-span-2 lg:col-span-8'
                      : idx === 1 && isDefaultBento
                        ? 'lg:col-span-4'
                        : 'lg:col-span-6'
                  }
                >
                  <Tilt3DCard className="h-full" maxTiltDeg={5.5}>
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      aria-label={`Inspect case study: ${project.title}`}
                      style={{ transformStyle: 'preserve-3d' }}
                      className="group seraphic-card seraphic-card-interactive w-full h-full rounded-2xl p-5 sm:p-7 text-left flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-accent-blue)]"
                    >
                      <div style={{ transformStyle: 'preserve-3d' }}>
                        <div
                          className={`depth-z-1 w-full overflow-hidden rounded-xl border border-[var(--border-card)] shadow-[0_12px_24px_-12px_rgba(21,28,39,0.2)] ${
                            isTopRowPair ? 'h-64 sm:h-80' : 'h-56 sm:h-64'
                          }`}
                        >
                          <ExhibitionPlate
                            variant={project.plates[0].variant}
                            title={`${project.title} — ${project.plates[0].caption}`}
                            className="w-full h-full"
                          />
                        </div>

                        {/* Zero-pill quiet 1-line unboxed metadata */}
                        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-[12px] font-medium text-[var(--text-secondary)]">
                          <div className="flex items-center gap-2">
                            <span className="tabular-nums text-[var(--text-accent-blue)] font-semibold">
                              {project.indexNumber}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="uppercase tracking-[0.06em]">{project.category}</span>
                            <span aria-hidden="true">·</span>
                            <span>{project.location}</span>
                          </div>
                          <span className="tabular-nums">{project.year}</span>
                        </div>

                        <div className="depth-z-2 mt-2.5 flex items-start justify-between gap-4">
                          <h3 className="font-serif text-[24px] sm:text-[28px] leading-[32px] sm:leading-[36px] font-medium text-[var(--text-primary)] group-hover:text-[var(--text-accent-blue-strong)] transition-colors">
                            {project.title}
                          </h3>
                          <span className="mt-1 inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--surface-subtle)] text-[var(--text-primary)] shrink-0 group-hover:bg-[#8db9f0] group-hover:text-[#151c27] transition-colors shadow-xs">
                            <ArrowUpRight className="w-4 h-4" />
                          </span>
                        </div>

                        <p className="mt-3 text-[15px] leading-[24px] text-[var(--text-secondary)]">
                          {project.excerpt}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[var(--border-card)] flex items-center justify-between text-[13px]">
                        <span className="text-[var(--text-secondary)]">{project.clientOrInstitution}</span>
                        {project.featured && (
                          <span className="text-[var(--text-accent-peach)] font-semibold">
                            {project.featuredLabel}
                          </span>
                        )}
                      </div>
                    </button>
                  </Tilt3DCard>
                </article>
              );
            })}
          </div>
        ) : (
          /* Catalogue Index Tabular View */
          <div className="mt-6 seraphic-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] bg-[var(--surface-table-head)] text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-secondary)]">
                    <th className="py-4 px-5">No.</th>
                    <th className="py-4 px-5">System / Project</th>
                    <th className="py-4 px-5">Domain</th>
                    <th className="py-4 px-5">Stack</th>
                    <th className="py-4 px-5">Year</th>
                    <th className="py-4 px-5 text-right">Architecture</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-card)] text-[14px]">
                  {filteredProjects.map((project) => (
                    <tr
                      key={project.id}
                      className="hover:bg-[var(--surface-subtle)]/70 transition-colors"
                    >
                      <td className="py-4 px-5 tabular-nums font-semibold text-[var(--text-accent-blue)]">
                        {project.indexNumber}
                      </td>
                      <td className="py-4 px-5 font-serif text-[18px] text-[var(--text-primary)]">
                        {project.title}
                      </td>
                      <td className="py-4 px-5 text-[var(--text-secondary)]">{project.category}</td>
                      <td className="py-4 px-5 text-[var(--text-secondary)]">{project.location}</td>
                      <td className="py-4 px-5 tabular-nums text-[var(--text-secondary)]">{project.year}</td>
                      <td className="py-4 px-5 text-right">
                        <button
                          type="button"
                          onClick={() => onSelectProject(project)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--surface-subtle)] hover:bg-[#8db9f0] text-[var(--text-primary)] hover:text-[#151c27] text-[13px] font-semibold transition-colors whitespace-nowrap"
                        >
                          <span>Open Study</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
