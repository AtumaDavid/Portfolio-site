// ─────────────────────────────────────────────────────────────
//  EDIT YOUR INFO HERE — the whole site reads from this one file.
//
//  IMAGES (optional): drop files into  public/images/  and set the
//  `image` field to e.g. '/images/shecluded.png'. Leave it null and a
//  tasteful placeholder shows instead — add images whenever you like.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Atuma David',
  role: 'Software Engineer',
  location: 'Lagos, Nigeria',
  email: 'atumadavid35@gmail.com',
  phone: '+234 913 443 8062',
  available: true,
  cvPath: '/Atuma-David-CV.pdf',
  // Email sending: leave web3formsKey null to use the visitor's mail app (mailto).
  // For in-page sending without leaving the site, create a free key at web3forms.com
  // and paste it here.
  web3formsKey: null,
  // Optional: paste a Calendly URL to use it instead of the built-in scheduler.
  calendlyUrl: 'https://calendly.com/atumadavid35/30min',
  thesis:
    'I build dependable full-stack systems — from the APIs and databases at the core to the cloud they run on. Currently leading engineering at a fintech building accessible lending for women.',
  links: {
    github: 'https://github.com/AtumaDavid',
    linkedin: 'https://www.linkedin.com/', // ← paste your LinkedIn URL
    medium: 'https://medium.com/', // ← paste your Medium URL
  },
};

// ── WORK: companies you've worked for (the headline of the site) ──
// Each role can list the products you shipped there, with a live link
// and an optional screenshot.
export const work = [
  {
    role: 'Lead Software Engineer',
    company: 'Shecluded',
    site: 'https://shecluded.com/',
    period: '2025 — Present',
    mode: 'Hybrid',
    summary:
      'Leading engineering for a fintech extending accessible credit to women entrepreneurs. End-to-end ownership of the product and the infrastructure behind it.',
    points: [
      'Architected the loan origination, assessment and disbursement system from the ground up.',
      'Cut deployment time ~80% by replacing manual releases with automated pipelines to AWS EC2.',
      'Migrated live customer records MySQL → PostgreSQL (AWS RDS) with an idempotent Python script — zero data loss.',
      'Lead a cross-functional team across design and automation.',
    ],
    stack: [
      'React',
      'TypeScript',
      'Express',
      'PostgreSQL',
      'Prisma',
      'AWS',
      'Nginx',
      'CI/CD',
    ],
    products: [
      {
        name: 'Loan Management Platform',
        tag: 'Full-stack · Fintech',
        link: 'https://users.shecluded.com/login',
        image: null,
        note: 'Origination, credit assessment, document upload and disbursement across separate admin and user portals.',
      },
      {
        name: 'Corporate Website',
        tag: 'Web',
        link: 'https://shecluded.com/',
        image: null,
        note: 'Maintaining and improving the primary web presence — performance, security and UX.',
      },
      {
        name: 'Cloud Infrastructure',
        tag: 'DevOps · Cloud',
        link: null,
        image: null,
        metric: '~80% faster deploys',
        note: 'Automated CI/CD, an Nginx reverse-proxy gateway with auto SSL, and zero-downtime releases on AWS.',
      },
      {
        name: 'Company Internal Dashboard',
        tag: 'Full-stack · Internal Tool',
        link: null,
        image: null,
        // metric: '~80% faster deploys',
        note: 'A dashboard for internal use, built and maintained end to end.',
      },
    ],
  },
  {
    role: 'Web Developer',
    company: 'Big Web Labs',
    // site: 'https://bigweblabs.com/',
    period: '2026 — Present',
    mode: 'Remote',
    summary:
      'Build and maintain client websites across multiple platforms, matching each project to the right tool.',
    points: [
      'Build and ship client websites using Wix, WordPress, Shopify and Google Sites, selecting the right platform for each project.',
      'Design responsive, SEO-friendly layouts with structured content and third-party integrations.',
      'Set up e-commerce storefronts and configure payments, products and shipping on Shopify.',
      'Hand off maintainable sites to clients and provide ongoing updates and support.',
    ],
    stack: [
      'WordPress',
      'Shopify',
      'Wix',
      'Google Sites',
      'HTML',
      'CSS',
      'SEO',
    ],
    products: [
      {
        name: 'ABT Services Corp',
        tag: 'Web Design · Google Sites',
        link: 'https://abtservicescorp.org/',
        image: null,
        note: 'Corporate website built on Google Sites with custom layout, structured content and contact integration.',
      },
    ],
  },
  {
    role: 'Software Engineer',
    company: 'SmartChain Limited',
    site: null,
    period: '2025',
    mode: 'Remote',
    summary:
      'Shipped features across a crowdfunding platform and a healthcare product inside a tight cross-functional team.',
    points: [
      'Designed REST APIs for user management, campaigns and payment processing.',
      'Modelled MongoDB schemas tuned for read patterns at scale.',
      'Owned backend integration to keep the experience fast and reliable.',
    ],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'React Native'],
    products: [
      {
        name: 'Fundrayser',
        tag: 'Full-stack · Crowdfunding',
        link: 'https://fundrayser.org/',
        image: null,
        note: 'A global funding ecosystem where people contribute toward shared goals.',
      },
      {
        name: 'Smart Chain Limited',
        tag: 'Web',
        link: 'https://smartchainlimited.com/',
        image: null,
        note: 'SmartChain Limited is a global leader in strategy execution and technology transformation, accelerating growth through digital innovation, talent alignment, and operational excellence.',
      },
      {
        name: 'HealthXp',
        tag: 'Mobile · Healthcare',
        link: null,
        image: null,
        note: 'A platform improving doctor–patient interactions and access to care.',
      },
    ],
  },
  {
    role: 'Backend Developer',
    company: 'SoftCode',
    site: null,
    period: '2024 — 2025',
    mode: 'Remote',
    summary:
      'Built secure, well-structured services in Nest.js alongside a senior engineer.',
    points: [
      'Developed REST APIs with attention to security and code organisation.',
      'Implemented authentication and role-based access control.',
      'Tuned database access with TypeORM and improved the API documentation.',
    ],
    stack: ['Nest.js', 'TypeScript', 'TypeORM', 'PostgreSQL', 'JWT'],
    products: [
      {
        name: 'Naiya',
        tag: 'Backend · Product',
        link: 'https://naiya.ng/',
        image: null,
        note: 'Backend services powering the Naiya platform.',
      },
    ],
  },
  {
    role: 'Frontend Developer · Contract',
    company: 'Shuttrd',
    site: null,
    period: '2024 · Dubai',
    mode: 'Remote',
    summary:
      'Built a performance-focused Next.js front end with a reusable component and hook library.',
    points: [
      'Introduced code splitting and lazy loading for faster loads.',
      'Abstracted complex logic into custom hooks for reuse.',
      'Delivered a polished, responsive interface with MUI and shadcn/ui.',
    ],
    stack: ['Next.js', 'TypeScript', 'React Query', 'MUI'],
    products: [
      {
        name: 'Web Application',
        tag: 'Frontend',
        link: null,
        image: null,
        note: 'A scalable, maintainable interface aligned with modern design standards.',
      },
    ],
  },
  {
    role: 'Frontend Developer · Team Lead',
    company: 'DinerPro',
    site: null,
    period: '2023 — 2024',
    mode: 'Remote',
    summary: 'Led the front-end team building a food-management product.',
    points: [
      'Built the interface in React and managed app-wide state with Redux.',
      'Ran code reviews and set the quality bar for the team.',
    ],
    stack: ['React', 'Redux', 'JavaScript'],
    products: [
      {
        name: 'Food Management Platform',
        tag: 'Frontend',
        link: null,
        image: null,
        note: 'A food-ordering and management interface built and led end to end.',
      },
    ],
  },
];

// ── PERSONAL PROJECTS: independent builds, separate from client work ──
// Add as many as you like — copy a block and edit it.
export const projects = [
  {
    id: 'acquisitions-api',
    title: 'Acquisitions API',
    kind: 'Backend · API',
    year: '2025',
    image: null, // e.g. '/images/acquisitions.png'
    blurb:
      'A production-grade REST API for managing business acquisitions, with enterprise patterns and a fully automated pipeline.',
    detail:
      'Handles acquisition workflows end to end. JWT auth with bcrypt hashing and role-based access; data access through Drizzle ORM against serverless PostgreSQL with automated migrations. Security via Helmet, CORS and Zod validation. Structured logging with Winston and Morgan, tests with Jest and Supertest, containerised with Docker and deployed through GitHub Actions.',
    stack: [
      'Node.js',
      'Express',
      'TypeScript',
      'PostgreSQL',
      'Drizzle',
      'Docker',
      'GitHub Actions',
      'Jest',
    ],
    link: 'https://github.com/AtumaDavid', // ← exact repo URL
    linkLabel: 'View on GitHub',
  },
  {
    id: 'kumasi-visa',
    title: 'Kumasi Visa',
    kind: 'Frontend · Freelance',
    year: '2022',
    image: null,
    blurb:
      'A responsive web app guiding users through how to apply for different visa types.',
    detail:
      'Built a clean, user-friendly interface so visitors could navigate visa requirements and application steps with ease. Delivered with a project manager and designer.',
    stack: ['Bootstrap Studio', 'HTML', 'CSS', 'JavaScript'],
    link: null,
  },
  {
    id: 'quiz-system',
    title: 'Quiz System',
    kind: 'Frontend · Early build',
    year: '2022',
    image: null,
    blurb: 'An interactive quiz application with a secure login layer.',
    detail:
      'Built a quiz engine in vanilla JavaScript and a secure login system in PHP with XAMPP, keeping user data confidential while learning production patterns alongside a senior developer.',
    stack: ['JavaScript', 'PHP', 'XAMPP'],
    link: null,
  },
];

export const stack = [
  {
    group: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL', 'Solidity'],
  },
  {
    group: 'Frontend',
    items: [
      'React',
      'Next.js',
      'React Native',
      'Redux',
      'React Query',
      'Tailwind',
    ],
  },
  {
    group: 'Backend',
    items: [
      'Node.js',
      'Express',
      'Nest.js',
      'REST',
      'Prisma',
      'Drizzle',
      'TypeORM',
    ],
  },
  {
    group: 'Data',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'AWS RDS', 'Neon'],
  },
  {
    group: 'Cloud & DevOps',
    items: ['AWS EC2 / S3', 'Docker', 'Nginx', 'CI/CD', 'PM2', 'Certbot'],
  },
  {
    group: 'CMS & No-Code',
    items: [
      'WordPress',
      'Shopify',
      'Wix',
      'Google Sites',
      'HTML',
      'CSS',
      'SEO',
    ],
  },
  {
    group: 'Tooling',
    items: ['Git', 'Postman', 'Jest', 'Playwright', 'Firebase'],
  },
];

export const certifications = [
  'ITIL® v4 Foundation',
  'Advanced React',
  'AWS Cloud Technical Essentials',
  'Microsoft 365 Ecosystem',
  'Agile Software Development',
  'Lean Software Development',
  'Scrum Fundamentals (SCF)',
];

export const education = {
  degree: 'B.Tech, Biochemistry',
  school: 'Federal University of Technology, Akure',
  period: '2014 — 2023',
};
