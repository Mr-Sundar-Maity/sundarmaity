import type { DisciplineCategory, ProjectWork } from '../data/portfolioData';

export interface InquiryFormInput {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
}

export interface InquiryValidationErrors {
  name?: string;
  email?: string;
  inquiryType?: string;
  message?: string;
}

export interface InquiryValidationResult {
  isValid: boolean;
  errors: InquiryValidationErrors;
}

export const INQUIRY_TYPES = [
  'Software Engineering Role',
  'Internship Opportunity',
  'Research Collaboration',
  'Project Inquiry',
] as const;

export function filterProjects(
  projects: ProjectWork[],
  activeCategory: DisciplineCategory,
  searchQuery = ''
): ProjectWork[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesCategory =
      activeCategory === 'All Works' || project.category === activeCategory;

    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;

    const searchableText = [
      project.title,
      project.category,
      project.location,
      project.year,
      project.excerpt,
      project.clientOrInstitution,
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export function getAdjacentProjects(
  projects: ProjectWork[],
  currentProjectId: string
): { previous: ProjectWork | null; next: ProjectWork | null } {
  const index = projects.findIndex((item) => item.id === currentProjectId);
  if (index === -1 || projects.length <= 1) {
    return { previous: null, next: null };
  }

  const previousIndex = (index - 1 + projects.length) % projects.length;
  const nextIndex = (index + 1) % projects.length;

  return {
    previous: projects[previousIndex] ?? null,
    next: projects[nextIndex] ?? null,
  };
}

export function validateInquiryForm(input: InquiryFormInput): InquiryValidationResult {
  const errors: InquiryValidationErrors = {};
  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedType = input.inquiryType.trim();
  const trimmedMessage = input.message.trim();

  if (trimmedName.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!trimmedEmail) {
    errors.email = 'Please enter a valid email address.';
  } else if (!emailPattern.test(trimmedEmail)) {
    errors.email = 'Email format appears incomplete (e.g. name@company.com).';
  }

  if (!trimmedType) {
    errors.inquiryType = 'Please select an inquiry focus.';
  }

  if (trimmedMessage.length < 15) {
    errors.message = 'Please share a brief note or role outline (at least 15 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatInquiryReference(name: string, timestamp = new Date()): string {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('') || 'SM';
  const year = timestamp.getFullYear();
  const month = String(timestamp.getMonth() + 1).padStart(2, '0');
  const day = String(timestamp.getDate()).padStart(2, '0');
  return `INQ-${year}${month}${day}-${initials}`;
}

export function calculateScrollProgress(
  scrollY: number,
  scrollHeight: number,
  clientHeight: number
): number {
  const maxScrollable = scrollHeight - clientHeight;
  if (maxScrollable <= 0) {
    return 0;
  }
  const ratio = scrollY / maxScrollable;
  return Math.min(1, Math.max(0, ratio));
}

export interface SectionOffset {
  id: string;
  top: number;
}

export function getActiveSectionId(
  sections: SectionOffset[],
  scrollY: number,
  headerOffset = 140
): string | null {
  if (sections.length === 0) return null;

  const sorted = [...sections].sort((a, b) => a.top - b.top);
  const triggerLine = scrollY + headerOffset;

  let active: string | null = null;
  for (const section of sorted) {
    if (triggerLine >= section.top) {
      active = section.id;
    } else {
      break;
    }
  }
  return active;
}

export type ThemeMode = 'light' | 'dark';

export function resolveInitialTheme(
  storedTheme: string | null | undefined,
  prefersDark: boolean
): ThemeMode {
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }
  return prefersDark ? 'dark' : 'light';
}

export function getNextTheme(current: ThemeMode): ThemeMode {
  return current === 'light' ? 'dark' : 'light';
}

export function isNavbarScrolled(scrollY: number, threshold = 24): boolean {
  if (!Number.isFinite(scrollY)) return false;
  return scrollY > threshold;
}

export interface Tilt3DRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface Tilt3DState {
  rotateX: number;
  rotateY: number;
  glowX: number;
  glowY: number;
}

export function computeTilt3D(
  clientX: number,
  clientY: number,
  rect: Tilt3DRect,
  maxTiltDeg = 7
): Tilt3DState {
  if (rect.width <= 0 || rect.height <= 0 || !Number.isFinite(clientX) || !Number.isFinite(clientY)) {
    return { rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 };
  }

  const ratioX = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  const ratioY = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));

  const rotateY = Number(((ratioX - 0.5) * 2 * maxTiltDeg).toFixed(2));
  const rotateX = Number(((0.5 - ratioY) * 2 * maxTiltDeg).toFixed(2));
  const glowX = Number((ratioX * 100).toFixed(1));
  const glowY = Number((ratioY * 100).toFixed(1));

  return { rotateX, rotateY, glowX, glowY };
}

export interface SpatialPalette {
  primaryPowderBlue: string;
  secondaryLavenderWhite: string;
  highlightSunsetPeach: string;
  fogColor: string;
  keyLightColor: string;
  hemiSkyColor: string;
  hemiGroundColor: string;
}

export function getSpatialPalette(theme: ThemeMode): SpatialPalette {
  if (theme === 'dark') {
    return {
      primaryPowderBlue: '#8db9f0',
      secondaryLavenderWhite: '#e9e8f8',
      highlightSunsetPeach: '#f5b69e',
      fogColor: '#0e1420',
      keyLightColor: '#fff3ec',
      hemiSkyColor: '#8db9f0',
      hemiGroundColor: '#1a2234',
    };
  }

  return {
    primaryPowderBlue: '#8db9f0',
    secondaryLavenderWhite: '#e9e8f8',
    highlightSunsetPeach: '#f5b69e',
    fogColor: '#e9e8f8',
    keyLightColor: '#fff6f0',
    hemiSkyColor: '#8db9f0',
    hemiGroundColor: '#e9e8f8',
  };
}

