import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import type { ProjectWork } from '../data/portfolioData';
import { getAdjacentProjects } from '../utils/portfolio';
import { ExhibitionPlate } from './ExhibitionPlate';

interface CaseStudyModalProps {
  project: ProjectWork | null;
  allProjects: ProjectWork[];
  onClose: () => void;
  onSelectProject: (project: ProjectWork) => void;
}

export function CaseStudyModal({
  project,
  allProjects,
  onClose,
  onSelectProject,
}: CaseStudyModalProps) {
  const [activePlateIndex, setActivePlateIndex] = useState(0);

  useEffect(() => {
    setActivePlateIndex(0);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const activePlate = project.plates[activePlateIndex] ?? project.plates[0];
  const { previous, next } = getAdjacentProjects(allProjects, project.id);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0b1018]/55 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="seraphic-card w-full max-w-[1120px] max-h-[92vh] overflow-y-auto rounded-2xl p-6 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Monograph Bar */}
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
              System {project.indexNumber} <span aria-hidden="true">·</span> {project.category}{' '}
              <span aria-hidden="true">·</span> {project.location}{' '}
              <span aria-hidden="true">·</span> <span className="tabular-nums">{project.year}</span>
            </p>
            <h2
              id="case-study-title"
              className="mt-2 font-serif text-[28px] sm:text-[40px] leading-[36px] sm:leading-[48px] font-medium text-[var(--text-primary)]"
            >
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study modal"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--text-accent-blue)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Architectural Plate Viewer */}
        <div className="mt-6">
          <div className="w-full h-60 sm:h-[340px] rounded-xl overflow-hidden border border-[var(--border-card)]">
            <ExhibitionPlate
              variant={activePlate.variant}
              title={`${project.title} — ${activePlate.label}`}
              className="w-full h-full"
            />
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-[13px] text-[var(--text-secondary)]">
              <span className="font-semibold text-[var(--text-primary)]">{activePlate.label}:</span>{' '}
              {activePlate.caption}
            </p>

            <div
              role="tablist"
              aria-label="Select architecture diagram plate"
              className="flex flex-wrap items-center gap-1.5 shrink-0"
            >
              {project.plates.map((plate, index) => {
                const isSelected = index === activePlateIndex;
                return (
                  <button
                    key={plate.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActivePlateIndex(index)}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors whitespace-nowrap ${
                      isSelected
                        ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]'
                        : 'bg-[var(--surface-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {plate.label.split('—')[0].trim()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Specifications Grid */}
        <div className="mt-8 py-6 border-y border-[var(--border-subtle)] grid grid-cols-2 sm:grid-cols-4 gap-6">
          {project.specifications.map((spec) => (
            <div key={spec.label}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-secondary)]">
                {spec.label}
              </p>
              <p className="mt-1 font-serif text-[20px] text-[var(--text-primary)] tabular-nums">
                {spec.value}
              </p>
            </div>
          ))}
        </div>

        {/* Narrative Sections */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-[20px] text-[var(--text-primary)]">
              Problem &amp; Architecture
            </h3>
            <p className="mt-2.5 text-[15px] leading-[25px] text-[var(--text-secondary)]">{project.context}</p>
          </div>
          <div>
            <h3 className="font-serif text-[20px] text-[var(--text-primary)]">
              Engineering &amp; Trade-offs
            </h3>
            <p className="mt-2.5 text-[15px] leading-[25px] text-[var(--text-secondary)]">
              {project.materialInquiry}
            </p>
          </div>
          <div>
            <h3 className="font-serif text-[20px] text-[var(--text-primary)]">
              Benchmarks &amp; Impact
            </h3>
            <p className="mt-2.5 text-[15px] leading-[25px] text-[var(--text-secondary)]">{project.outcome}</p>
            <p className="mt-4 pt-4 border-t border-[var(--border-card)] text-[13px] text-[var(--text-secondary)]">
              <span className="font-semibold text-[var(--text-primary)]">Scope &amp; Team:</span>{' '}
              {project.collaborators}
            </p>
          </div>
        </div>

        {/* Previous / Next Monograph Navigation */}
        <div className="mt-10 pt-6 border-t border-[var(--border-subtle)] flex items-center justify-between gap-4">
          {previous ? (
            <button
              type="button"
              onClick={() => onSelectProject(previous)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--border-subtle)] text-[13px] font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous: {previous.title}</span>
            </button>
          ) : (
            <span />
          )}

          {next && (
            <button
              type="button"
              onClick={() => onSelectProject(next)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--btn-primary-bg)] text-[13px] font-semibold text-[var(--btn-primary-text)] hover:brightness-105 transition-all"
            >
              <span>Next Project: {next.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
