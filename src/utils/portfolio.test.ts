import test from 'node:test';
import assert from 'node:assert/strict';
import { PROJECTS } from '../data/portfolioData';
import {
  buildContactEmailContent,
  buildContactMailtoUrl,
  escapeHtml,
  validateContactPayload,
} from './contactEmail';
import {
  calculateScrollProgress,
  computeTilt3D,
  filterProjects,
  formatInquiryReference,
  getActiveSectionId,
  getAdjacentProjects,
  getNextTheme,
  getSpatialPalette,
  isNavbarScrolled,
  resolveInitialTheme,
  validateInquiryForm,
} from './portfolio';

test('filterProjects returns all projects when All Works is selected', () => {
  const result = filterProjects(PROJECTS, 'All Works');
  assert.equal(result.length, PROJECTS.length);
});

test('filterProjects narrows down by discipline category accurately', () => {
  const fullStack = filterProjects(PROJECTS, 'Full-Stack');
  assert.equal(fullStack.length, 3);
  assert.ok(fullStack.every((p) => p.category === 'Full-Stack'));

  const apiBased = filterProjects(PROJECTS, 'API Based');
  assert.equal(apiBased.length, 1);
  assert.equal(apiBased[0]?.id, 'ai-api-toolkit');

  const pythonAiMl = filterProjects(PROJECTS, 'Python (AI/ML)');
  assert.equal(pythonAiMl.length, 2);
  assert.deepEqual(
    pythonAiMl.map((project) => project.id),
    ['student-pass-fail-system', 'smart-medicine-healthcare-assistance']
  );
});

test('filterProjects combines category and keyword query', () => {
  const doctorBooking = filterProjects(PROJECTS, 'Full-Stack', 'doctor');
  assert.equal(doctorBooking.length, 1);
  assert.equal(doctorBooking[0]?.id, 'doctor-booking');

  const noMatch = filterProjects(PROJECTS, 'API Based', 'laravel');
  assert.equal(noMatch.length, 0);
});

test('getAdjacentProjects wraps cleanly at boundaries', () => {
  const firstId = PROJECTS[0].id;
  const lastId = PROJECTS[PROJECTS.length - 1].id;

  const fromFirst = getAdjacentProjects(PROJECTS, firstId);
  assert.equal(fromFirst.previous?.id, lastId);
  assert.equal(fromFirst.next?.id, PROJECTS[1].id);

  const fromLast = getAdjacentProjects(PROJECTS, lastId);
  assert.equal(fromLast.next?.id, firstId);
});

test('validateInquiryForm rejects empty and malformed inputs without fallback substitution', () => {
  const emptyResult = validateInquiryForm({
    name: '',
    email: '',
    inquiryType: '',
    message: '',
  });
  assert.equal(emptyResult.isValid, false);
  assert.ok(emptyResult.errors.name);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.inquiryType);
  assert.ok(emptyResult.errors.message);

  const badEmailResult = validateInquiryForm({
    name: 'Recruiter Name',
    email: 'recruiter@invalid',
    inquiryType: 'Software Engineering Internship',
    message: 'We would love to invite Sundar for our summer systems engineering interview loop.',
  });
  assert.equal(badEmailResult.isValid, false);
  assert.ok(badEmailResult.errors.email);
  assert.equal(badEmailResult.errors.name, undefined);
});

test('validateInquiryForm accepts well-formed inquiry input', () => {
  const validResult = validateInquiryForm({
    name: 'Priya Nair',
    email: 'priya.nair@cloudscale.dev',
    inquiryType: 'Research Collaboration',
    message: 'Reaching out regarding Sundar’s Raft snapshot recovery benchmarks for our upcoming lab project.',
  });
  assert.equal(validResult.isValid, true);
  assert.deepEqual(validResult.errors, {});
});

test('formatInquiryReference produces deterministic catalog reference', () => {
  const ref = formatInquiryReference('Priya Nair', new Date('2026-11-14T10:00:00Z'));
  assert.equal(ref, 'INQ-20261114-PN');
});

test('calculateScrollProgress clamps ratios cleanly between 0 and 1', () => {
  assert.equal(calculateScrollProgress(0, 4000, 900), 0);
  assert.equal(calculateScrollProgress(-100, 4000, 900), 0);
  assert.equal(calculateScrollProgress(1550, 4000, 900), 0.5);
  assert.equal(calculateScrollProgress(3100, 4000, 900), 1);
  assert.equal(calculateScrollProgress(5000, 4000, 900), 1);
  assert.equal(calculateScrollProgress(100, 900, 900), 0);
});

test('getActiveSectionId resolves the deepest section crossed by trigger line', () => {
  const sections = [
    { id: 'work', top: 820 },
    { id: 'experience', top: 1900 },
    { id: 'skills', top: 2700 },
    { id: 'notes', top: 3400 },
  ];

  assert.equal(getActiveSectionId(sections, 0, 140), null);
  assert.equal(getActiveSectionId(sections, 700, 140), 'work');
  assert.equal(getActiveSectionId(sections, 1800, 140), 'experience');
  assert.equal(getActiveSectionId(sections, 3300, 140), 'notes');
});

test('resolveInitialTheme honors stored preference or falls back to system preference', () => {
  assert.equal(resolveInitialTheme('dark', false), 'dark');
  assert.equal(resolveInitialTheme('light', true), 'light');
  assert.equal(resolveInitialTheme(null, true), 'dark');
  assert.equal(resolveInitialTheme('invalid', false), 'light');
});

test('getNextTheme toggles cleanly between light and dark', () => {
  assert.equal(getNextTheme('light'), 'dark');
  assert.equal(getNextTheme('dark'), 'light');
});

test('contactEmail helpers escape HTML, validate payload, and build mailto & email content', () => {
  assert.equal(escapeHtml('<script>"alert"</script>'), '&lt;script&gt;&quot;alert&quot;&lt;/script&gt;');

  const invalid = validateContactPayload({
    name: 'A',
    email: 'not-an-email',
    inquiryType: 'Internship Opportunity',
    message: 'Too short',
  });
  assert.equal(invalid.isValid, false);

  const valid = validateContactPayload({
    name: '  Priya Nair  ',
    email: 'priya@company.com',
    inquiryType: 'Software Engineering Role',
    message: 'We would like to discuss a Junior Full-Stack Laravel role.',
  });
  assert.equal(valid.isValid, true);

  const mailto = buildContactMailtoUrl(valid.sanitized, 'maitysundar84@gmail.com');
  assert.ok(mailto.startsWith('mailto:maitysundar84@gmail.com?'));
  assert.ok(mailto.includes('Priya%20Nair'));

  const content = buildContactEmailContent(valid.sanitized, 'INQ-20261114-PN');
  assert.equal(content.subject, '[Portfolio Inquiry] Software Engineering Role — Priya Nair (INQ-20261114-PN)');
  assert.ok(content.text.includes('priya@company.com'));
  assert.ok(content.html.includes('INQ-20261114-PN'));
});

test('isNavbarScrolled evaluates scroll threshold cleanly', () => {
  assert.equal(isNavbarScrolled(0), false);
  assert.equal(isNavbarScrolled(24), false);
  assert.equal(isNavbarScrolled(25), true);
  assert.equal(isNavbarScrolled(400, 100), true);
  assert.equal(isNavbarScrolled(Number.NaN), false);
});

test('computeTilt3D calculates clamped 3D angles and specular glow coordinates', () => {
  const rect = { left: 100, top: 200, width: 400, height: 200 };

  const center = computeTilt3D(300, 300, rect, 8);
  assert.deepEqual(center, { rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });

  const topRight = computeTilt3D(500, 200, rect, 8);
  assert.deepEqual(topRight, { rotateX: 8, rotateY: 8, glowX: 100, glowY: 0 });

  const clampedOutside = computeTilt3D(-50, 999, rect, 6);
  assert.deepEqual(clampedOutside, { rotateX: -6, rotateY: -6, glowX: 0, glowY: 100 });

  const degenerate = computeTilt3D(10, 10, { left: 0, top: 0, width: 0, height: 0 });
  assert.deepEqual(degenerate, { rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
});

test('getSpatialPalette maintains Primary Powder Blue, Secondary Lavender White, and Highlight Sunset Peach', () => {
  const light = getSpatialPalette('light');
  assert.equal(light.primaryPowderBlue, '#8db9f0');
  assert.equal(light.secondaryLavenderWhite, '#e9e8f8');
  assert.equal(light.highlightSunsetPeach, '#f5b69e');
  assert.equal(light.fogColor, '#e9e8f8');

  const dark = getSpatialPalette('dark');
  assert.equal(dark.primaryPowderBlue, '#8db9f0');
  assert.equal(dark.secondaryLavenderWhite, '#e9e8f8');
  assert.equal(dark.highlightSunsetPeach, '#f5b69e');
});


