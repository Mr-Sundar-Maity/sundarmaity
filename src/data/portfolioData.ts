export type DisciplineCategory = 'All Works' | 'Full-Stack' | 'API Based' | 'Python (AI/ML)';

export interface ProjectPlate {
  id: string;
  label: string;
  caption: string;
  variant:
    | 'booking-flow'
    | 'booking-schema'
    | 'expense-ledger'
    | 'expense-analytics'
    | 'todo-board'
    | 'todo-workflow'
    | 'api-vision'
    | 'api-voice';
}

export interface ProjectSpecification {
  label: string;
  value: string;
}

export interface ProjectWork {
  id: string;
  slug: string;
  indexNumber: string;
  title: string;
  category: Exclude<DisciplineCategory, 'All Works'>;
  year: string;
  location: string;
  clientOrInstitution: string;
  featured?: boolean;
  featuredLabel?: string;
  excerpt: string;
  context: string;
  materialInquiry: string;
  outcome: string;
  collaborators: string;
  liveUrl?: string;
  specifications: ProjectSpecification[];
  plates: ProjectPlate[];
}

export interface ExhibitionItem {
  id: string;
  year: string;
  title: string;
  institution: string;
  city: string;
  role: string;
  summary: string;
  curatorialNote: string;
}

export interface PracticePillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string;
}

export interface EssayArticle {
  id: string;
  title: string;
  publication: string;
  date: string;
  readTime: string;
  abstract: string;
  bodyParagraphs: string[];
  citation: string;
}

export const DISCIPLINE_CATEGORIES: DisciplineCategory[] = [
  'All Works',
  'Full-Stack',
  'API Based',
  'Python (AI/ML)',
];

export const KEY_PRACTICE_METRICS = [
  { figure: '06', label: 'Core Full-Stack, API & AI/ML Projects' },
  { figure: '04', label: 'Internships & Industry Roles' },
  { figure: '10+', label: 'Languages, Frameworks & Databases' },
  { figure: '2026', label: 'Jr. Developer · Active Practice' },
];

export const CHAT_SUGGESTED_QUESTIONS = [
  "What is Sundar's full-stack and database tech stack?",
  'Tell me about his PHP Laravel projects like Doctor Booking.',
  'What internships, hackathon, and Jr. Developer experience does he have?',
];

export const PROJECTS: ProjectWork[] = [
  {
    id: 'doctor-booking',
    slug: 'doctor-booking',
    indexNumber: '01',
    title: 'Doctor Booking Platform',
    category: 'Full-Stack',
    year: '2026',
    location: 'PHP Laravel · MySQL · Full-Stack',
    clientOrInstitution: 'Healthcare Scheduling System',
    featured: true,
    featuredLabel: 'Featured Full-Stack App',
    excerpt:
      'End-to-end appointment scheduling web application built with PHP Laravel featuring doctor availability slots, patient booking queues, and role-based dashboards.',
    context:
      'Designed to replace manual clinic spreadsheets with a clean booking workflow where patients browse specialists by department, pick conflict-free time slots, and receive instant appointment confirmations.',
    materialInquiry:
      'Implemented Laravel MVC controllers, Eloquent ORM relationships (Doctors, Patients, Schedules, Appointments), CSRF-protected forms, and transactional slot locking in MySQL to prevent double bookings.',
    outcome:
      'Delivered separate patient, doctor, and admin dashboards with real-time slot filtering, automated status tracking, and clean Blade + responsive UI views.',
    collaborators: 'Full-Stack Web Engineering · Solo Build',
    specifications: [
      { label: 'Backend', value: 'PHP Laravel' },
      { label: 'Database', value: 'MySQL' },
      { label: 'Auth & Roles', value: '3-Tier RBAC' },
      { label: 'Architecture', value: 'MVC + REST' },
    ],
    plates: [
      {
        id: 'db1',
        label: 'Plate I — Booking & Slot Pipeline',
        caption: 'Patient slot selection, availability validation, and Laravel controller flow.',
        variant: 'booking-flow',
      },
      {
        id: 'db2',
        label: 'Plate II — Relational Schema',
        caption: 'Normalized MySQL entities connecting Doctors, Schedules, and Appointments.',
        variant: 'booking-schema',
      },
    ],
  },
  {
    id: 'expense-tracker',
    slug: 'expense-tracker',
    indexNumber: '02',
    title: 'Expense Tracker',
    category: 'Full-Stack',
    year: '2025',
    location: 'PHP Laravel · MySQL · Full-Stack',
    clientOrInstitution: 'Personal Finance Web Application',
    excerpt:
      'Full-stack budget and expense management system in PHP Laravel with categorized ledger entries, monthly spending breakdowns, and budget threshold alerts.',
    context:
      'Built to make daily income and expense logging fast while giving users immediate clarity on recurring categories, net monthly balance, and spending trends.',
    materialInquiry:
      'Structured Laravel REST endpoints, form-request validation, indexed date/category SQL queries, and clean server-rendered summary views for monthly and category totals.',
    outcome:
      'Supports full CRUD transaction tracking, filterable date ranges, CSV/summary reporting, and per-user isolated financial records.',
    collaborators: 'Full-Stack Laravel Build',
    specifications: [
      { label: 'Framework', value: 'PHP Laravel' },
      { label: 'Storage', value: 'MySQL' },
      { label: 'Operations', value: 'Full CRUD' },
      { label: 'Reporting', value: 'Monthly Totals' },
    ],
    plates: [
      {
        id: 'et1',
        label: 'Plate I — Transaction Ledger',
        caption: 'Categorized income and expense flow with category aggregation.',
        variant: 'expense-ledger',
      },
      {
        id: 'et2',
        label: 'Plate II — Spend Analytics',
        caption: 'Monthly budget vs. actual category distribution across periods.',
        variant: 'expense-analytics',
      },
    ],
  },
  {
    id: 'todo-list',
    slug: 'todo-list',
    indexNumber: '03',
    title: 'To-Do List Workspace',
    category: 'Full-Stack',
    year: '2025',
    location: 'PHP Laravel · MySQL · Full-Stack',
    clientOrInstitution: 'Task Productivity Web App',
    excerpt:
      'Clean full-stack task management application powered by PHP Laravel with authenticated user workspaces, priority tagging, due dates, and completion filtering.',
    context:
      'Created as a crisp, zero-clutter productivity app demonstrating reliable server-side persistence, clean routing, and responsive task state transitions.',
    materialInquiry:
      'Built with Laravel resource routes, policy-based authorization so users only mutate their own tasks, soft deletes, and instant status toggles.',
    outcome:
      'Delivers fast task creation, priority sorting, pending/completed filters, and dependable MySQL persistence across sessions.',
    collaborators: 'Full-Stack Productivity Build',
    specifications: [
      { label: 'Framework', value: 'PHP Laravel' },
      { label: 'Database', value: 'MySQL' },
      { label: 'Security', value: 'Policy Auth' },
      { label: 'Scope', value: 'Full-Stack' },
    ],
    plates: [
      {
        id: 'td1',
        label: 'Plate I — Task Board Layout',
        caption: 'Priority queues and completion state columns for daily focus.',
        variant: 'todo-board',
      },
      {
        id: 'td2',
        label: 'Plate II — Laravel Request Cycle',
        caption: 'Middleware auth check, validation, and Eloquent persistence loop.',
        variant: 'todo-workflow',
      },
    ],
  },
  {
    id: 'ai-api-toolkit',
    slug: 'ai-api-toolkit',
    indexNumber: '04',
    title: 'Image Generation, BG Remover & Voice Assistant',
    category: 'API Based',
    year: '2025',
    location: 'REST APIs · JavaScript / Python · Basics',
    clientOrInstitution: 'Multi-Capability API Integration Suite',
    excerpt:
      'Foundational API-driven toolkit combining text-to-image generation, automated image background removal, and a speech-enabled voice assistant in a unified interface.',
    context:
      'Built to master external REST API orchestration, multipart binary file uploads, asynchronous job handling, and browser audio/speech interfaces.',
    materialInquiry:
      'Integrated image generation endpoints from prompt inputs, background-removal segmentation APIs returning transparent PNGs, and Web Speech / API-backed voice command processing.',
    outcome:
      'Demonstrates clean client-server API integration, graceful error handling for rate limits and invalid payloads, and practical multimedia automation.',
    collaborators: 'API Integration Study',
    specifications: [
      { label: 'Integration', value: 'REST APIs' },
      { label: 'Media', value: 'Image + PNG' },
      { label: 'Audio', value: 'Voice Basics' },
      { label: 'Level', value: 'Foundations' },
    ],
    plates: [
      {
        id: 'ai1',
        label: 'Plate I — Image & BG Pipeline',
        caption: 'Prompt-to-image generation and automated alpha-mask background removal.',
        variant: 'api-vision',
      },
      {
        id: 'ai2',
        label: 'Plate II — Voice Request Loop',
        caption: 'Speech capture, API intent dispatch, and spoken/text response playback.',
        variant: 'api-voice',
      },
    ],
  },
  {
    id: 'student-pass-fail-system',
    slug: 'student-pass-fail-system',
    indexNumber: '05',
    title: 'Student Pass Fail System',
    category: 'Python (AI/ML)',
    year: '2026',
    location: 'Python · Machine Learning · Academic Analytics',
    clientOrInstitution: 'AI-Integrated Academic Performance Platform',
    featured: true,
    featuredLabel: 'AI-Integrated System',
    excerpt:
      'AI-based academic performance prediction platform with role-based dashboards, evaluated ML models, bulk CSV/Excel processing, semester rule aggregation, and downloadable reports.',
    context:
      'Designed to help academic teams identify pass/fail risk earlier by transforming marks and attendance records into consistent predictions, cohort summaries, and actionable student-level insights.',
    materialInquiry:
      'Built a Python machine-learning workflow for structured academic data, model evaluation, bulk spreadsheet ingestion, semester-rule aggregation, and role-aware presentation of prediction results.',
    outcome:
      'Delivers individual and bulk performance analysis, clear pass/fail indicators, downloadable reports, and dashboard views that make academic intervention faster and more evidence-driven.',
    collaborators: 'Python AI/ML Engineering · Academic Analytics Build',
    liveUrl: 'https://studentpassfailsystem.web.app/',
    specifications: [
      { label: 'Core', value: 'Python + ML' },
      { label: 'Input', value: 'CSV / Excel' },
      { label: 'Analysis', value: 'Pass/Fail Risk' },
      { label: 'Output', value: 'Reports' },
    ],
    plates: [
      {
        id: 'spfs1',
        label: 'Plate I — Prediction Pipeline',
        caption: 'Academic records move through validation, feature preparation, and ML inference.',
        variant: 'api-vision',
      },
      {
        id: 'spfs2',
        label: 'Plate II — Cohort Analytics',
        caption: 'Semester aggregation, risk indicators, and downloadable reporting workflow.',
        variant: 'expense-analytics',
      },
    ],
  },
  {
    id: 'smart-medicine-healthcare-assistance',
    slug: 'smart-medicine-healthcare-assistance',
    indexNumber: '06',
    title: 'Smart Medicine & Healthcare Assistance System',
    category: 'Python (AI/ML)',
    year: '2026',
    location: 'Python · AI/ML · OCR · Healthcare',
    clientOrInstitution: 'VeroMed Healthcare & Pharmacy Platform',
    featured: true,
    featuredLabel: 'AI-Integrated Healthcare',
    excerpt:
      'Unified patient and pharmacy assistance platform with medication adherence tracking, AI prescription OCR, interaction verification, and ML-powered medicine demand forecasting.',
    context:
      'Created to connect day-to-day patient medication support with pharmacy operations, reducing manual prescription entry while improving medicine safety, adherence visibility, and stock planning.',
    materialInquiry:
      'Integrated AI prescription OCR, medicine interaction verification, adherence tracking, and a Python ML forecasting workflow that converts pharmacy demand history into inventory guidance.',
    outcome:
      'Provides a single healthcare assistance experience for prescription understanding, medication routines, safety checks, and smarter pharmacy demand decisions.',
    collaborators: 'Python AI/ML Engineering · Healthcare Assistance Build',
    liveUrl: 'https://veromedphm.web.app',
    specifications: [
      { label: 'Core', value: 'Python + AI/ML' },
      { label: 'Vision', value: 'Prescription OCR' },
      { label: 'Safety', value: 'Interaction Check' },
      { label: 'Forecast', value: 'Medicine Demand' },
    ],
    plates: [
      {
        id: 'vm1',
        label: 'Plate I — Prescription Intelligence',
        caption: 'OCR extraction, medicine verification, and interaction checking pipeline.',
        variant: 'api-vision',
      },
      {
        id: 'vm2',
        label: 'Plate II — Care & Demand Loop',
        caption: 'Medication adherence signals connected to pharmacy demand forecasting.',
        variant: 'api-voice',
      },
    ],
  },
];

export const EXHIBITIONS: ExhibitionItem[] = [
  {
    id: 'exp-imagin-wipro',
    year: '2026',
    title: 'Jr. Developer & Imagine TechPark Internship (MongoDB, Python)',
    institution: 'Imagine TechPark (Internship) · Wipro (Jr. Developer)',
    city: 'Full-Time & Internship',
    role: 'Jr. Developer · Data & Backend',
    summary:
      'Joined Wipro as a Junior Developer shipping production features while completing an internship at Imagine TechPark focused on MongoDB and Python.',
    curatorialNote:
      'Combined day-to-day application development at Imagine TechPark with NoSQL document modeling, aggregation queries, and Python scripting workflows at Wipro.',
  },
  {
    id: 'exp-infosys-forever',
    year: '2025–2026',
    title: 'Backend Development Internship & HR Role',
    institution: 'Infosys (WebGuru) · Forever Living Products',
    city: 'Backend & Operations',
    role: 'PHP Laravel Intern · HR',
    summary:
      'Completed backend development internship in PHP Laravel at Infosys (WebGuru), alongside an HR role at Forever Living Products.',
    curatorialNote:
      'Built relational schemas, RESTful routes, and Laravel server logic at WebGuru while strengthening communication and team coordination through HR operations.',
  },
  {
    id: 'exp-imagin-euforia',
    year: '2024',
    title: 'Frontend Internship & Industrial Visit',
    institution: 'Imagin · Euforia Genix',
    city: 'Web Engineering & Industry Visit',
    role: 'React.js & Angular.js Intern',
    summary:
      'Completed a frontend engineering internship at Imagin working with React.js and Angular.js, paired with an industrial visit at Euforia Genix.',
    curatorialNote:
      'Built reusable UI components across both React and Angular ecosystems and observed real-world software delivery practices during the Euforia Genix visit.',
  },
  {
    id: 'exp-redhat-hackathon',
    year: '2024',
    title: 'RED HAT Hackathon — Team Leader',
    institution: 'Red Hat Hackathon',
    city: 'Global Warming Track',
    role: 'Team Leader',
    summary:
      'Led a hackathon team at the 2024 Red Hat Hackathon tackling problem-solving around controlling Global Warming and environmental impact.',
    curatorialNote:
      'Coordinated system architecture, task delegation, and pitch delivery for a technology-driven climate mitigation solution.',
  },
];

export const PRACTICE_PILLARS: PracticePillar[] = [
  {
    number: '01',
    title: 'Full-Stack Web & Frontend Frameworks',
    subtitle: 'React · Angular · Node.js · Full-Stack',
    description:
      'Building interactive client interfaces and cohesive full-stack applications across React.js, Angular.js, and Node.js with clean component architecture.',
    deliverables: 'React · Angular · Node.js · Full-Stack Architecture · Responsive UI',
  },
  {
    number: '02',
    title: 'Backend Engineering & APIs',
    subtitle: 'PHP (Laravel) · Python · REST & Third-Party APIs',
    description:
      'Developing structured server-side applications, MVC services, authentication flows, and external API integrations for media, automation, and web workflows.',
    deliverables: 'PHP (Laravel) · Python · RESTful API Design · Third-Party API Integration',
  },
  {
    number: '03',
    title: 'Relational & NoSQL Databases',
    subtitle: 'MySQL · PostgreSQL · MongoDB',
    description:
      'Designing normalized SQL schemas, relational joins, and flexible NoSQL document collections tailored to transactional booking, finance, and data applications.',
    deliverables: 'MySQL · PostgreSQL · MongoDB · Schema Modeling & Query Optimization',
  },
];

export const ESSAYS: EssayArticle[] = [
  {
    id: 'essay-laravel-booking',
    title: 'Preventing Double Bookings in PHP Laravel with MySQL Transactions',
    publication: 'Backend Engineering Notes',
    date: 'March 2026',
    readTime: '5 min read',
    abstract:
      'How database row locking and clean Eloquent validation prevent overlapping patient appointments in the Doctor Booking platform.',
    bodyParagraphs: [
      'When two patients attempt to reserve the same doctor time slot simultaneously, naive check-then-insert controller logic can accidentally create duplicate appointments.',
      'In the Doctor Booking full-stack application, wrapping slot verification and appointment creation inside DB::transaction with pessimistic row locking ensures only one request succeeds cleanly.',
      'Combining server-side form requests with clear conflict feedback keeps the scheduling workflow reliable under concurrent requests.',
    ],
    citation: 'Maity, S. (2026). Concurrency-Safe Appointment Scheduling in PHP Laravel.',
  },
  {
    id: 'essay-sql-nosql',
    title: 'Choosing Between MySQL, PostgreSQL, and MongoDB for Full-Stack Apps',
    publication: 'Database Design Notes',
    date: 'January 2026',
    readTime: '6 min read',
    abstract:
      'Practical trade-offs between relational integrity in Laravel/SQL projects and schema flexibility in MongoDB & Python pipelines.',
    bodyParagraphs: [
      'Ledgers like the Expense Tracker and Doctor Booking systems naturally benefit from strict foreign keys, ACID transactions, and structured schemas in MySQL or PostgreSQL.',
      'Meanwhile, during Python and MongoDB work at Wipro, document-oriented storage excelled for nested, evolving payloads where rapid iteration matters.',
      'Understanding both relational and NoSQL modeling helps select the cleanest persistence layer for each product requirement.',
    ],
    citation: 'Maity, S. (2026). Relational vs. Document Modeling Across Full-Stack Workloads.',
  },
  {
    id: 'essay-api-orchestration',
    title: 'Designing Resilient Clients for Image, Background Removal & Voice APIs',
    publication: 'API Integration Notes',
    date: 'November 2025',
    readTime: '4 min read',
    abstract:
      'Lessons from wiring generative image creation, alpha-mask background removal, and voice assistant endpoints behind clean state management.',
    bodyParagraphs: [
      'External media APIs introduce binary payloads, variable processing latency, and strict quota limits compared to standard JSON CRUD endpoints.',
      'Structuring explicit loading, preview, and error recovery states ensures users receive clear feedback whether generating an image, removing a background, or issuing a voice query.',
      'Validating inputs early and isolating API credentials on the backend keeps integrations both secure and maintainable.',
    ],
    citation: 'Maity, S. (2025). Practical Patterns for Multi-Modal REST API Integration.',
  },
];
