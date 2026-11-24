import { useCallback, useEffect, useState } from 'react';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ExhibitionsSection } from './components/ExhibitionsSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InquirySection } from './components/InquirySection';
import { PracticeSection } from './components/PracticeSection';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { SpatialBackdrop3D } from './components/SpatialBackdrop3D';
import { WorksGallery } from './components/WorksGallery';
import { WritingSection } from './components/WritingSection';
import {
  ESSAYS,
  EXHIBITIONS,
  PRACTICE_PILLARS,
  PROJECTS,
  type ProjectWork,
} from './data/portfolioData';
import {
  calculateScrollProgress,
  getActiveSectionId,
  getNextTheme,
  isNavbarScrolled,
  resolveInitialTheme,
  type SectionOffset,
  type ThemeMode,
} from './utils/portfolio';

const TRACKED_SECTION_IDS: readonly string[] = [
  'work',
  'experience',
  'skills',
  'notes',
  'inquire',
];

const THEME_STORAGE_KEY = 'seraphic-theme';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const stored =
      typeof window !== 'undefined' ? window.localStorage.getItem(THEME_STORAGE_KEY) : null;
    const prefersDark =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    return resolveInitialTheme(stored, prefersDark);
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectWork | null>(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('project');
    if (!slug) return null;
    return PROJECTS.find((item) => item.slug === slug) ?? null;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const handleToggleTheme = useCallback(() => {
    setTheme((current) => getNextTheme(current));
  }, []);

  useEffect(() => {
    let frameId = 0;

    const updateScrollMetrics = () => {
      frameId = 0;
      const doc = document.documentElement;
      const scrollY = window.scrollY;
      const nextProgress = calculateScrollProgress(scrollY, doc.scrollHeight, doc.clientHeight);
      setScrollProgress(nextProgress);
      setIsScrolled(isNavbarScrolled(scrollY));

      const offsets: SectionOffset[] = [];
      for (const id of TRACKED_SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          offsets.push({ id, top: el.offsetTop });
        }
      }

      setActiveSectionId(getActiveSectionId(offsets, scrollY, 160));
    };

    const scheduleUpdate = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(updateScrollMetrics);
      }
    };

    updateScrollMetrics();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(scheduleUpdate) : null;
    resizeObserver?.observe(document.body);

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      resizeObserver?.disconnect();
    };
  }, []);

  const handleSelectProject = useCallback((project: ProjectWork | null) => {
    setSelectedProject(project);
    const url = new URL(window.location.href);
    if (project) {
      url.searchParams.set('project', project.slug);
    } else {
      url.searchParams.delete('project');
    }
    window.history.replaceState({}, '', url.toString());
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const slug = params.get('project');
      setSelectedProject(slug ? PROJECTS.find((p) => p.slug === slug) ?? null : null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const featuredProject = PROJECTS.find((p) => p.featured) ?? PROJECTS[0];

  return (
    <div className="relative min-h-screen flex flex-col">
      <SpatialBackdrop3D theme={theme} scrollProgress={scrollProgress} />
      <ScrollProgressBar progress={scrollProgress} />
      <Header
        onNavigateSection={scrollToSection}
        activeSectionId={activeSectionId}
        isScrolled={isScrolled}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className="relative z-10 flex-1">
        <Hero
          featuredProject={featuredProject}
          onSelectProject={(project) => handleSelectProject(project)}
          onExploreWorks={() => scrollToSection('work')}
          onReadWriting={() => scrollToSection('notes')}
        />

        <WorksGallery
          projects={PROJECTS}
          onSelectProject={(project) => handleSelectProject(project)}
        />

        <ExhibitionsSection exhibitions={EXHIBITIONS} />

        <PracticeSection pillars={PRACTICE_PILLARS} />

        <WritingSection essays={ESSAYS} />

        <InquirySection />
      </main>

      <Footer onNavigateSection={scrollToSection} />

      <CaseStudyModal
        project={selectedProject}
        allProjects={PROJECTS}
        onClose={() => handleSelectProject(null)}
        onSelectProject={(project) => handleSelectProject(project)}
      />
    </div>
  );
}
