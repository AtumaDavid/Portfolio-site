// ─────────────────────────────────────────────────────────────
//  EDIT YOUR INFO HERE — the whole site reads from this one file.
//
//  IMAGES (optional): drop your photo into  public/images/  and set
//  `profile.photo` to e.g. '/images/me.jpg'. Leave it null and a
//  monogram card shows instead.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Atuma David',
  role: 'Software Engineer',
  location: 'Lagos, Nigeria',
  email: 'atumadavid35@gmail.com',
  phone: '+234 913 443 8062',
  available: true,
  timeZone: 'Africa/Lagos',
  // Your photo: drop it in public/images/ and set e.g. '/images/me.jpg'.
  // While null, the hero shows a monogram card instead.
  photo: null,
  cvPath: '/Atuma-David-CV.pdf',
  // Email sending: leave web3formsKey null to use the visitor's mail app (mailto).
  // For in-page sending without leaving the site, create a free key at web3forms.com
  // and paste it here.
  web3formsKey: 'f01fa0cd-d455-4094-bed5-25b957d81e76',
  // Optional: paste a Calendly URL to use it instead of the built-in scheduler.
  calendlyUrl: 'https://calendly.com/atumadavid35/30min',
  thesis:
    'I build dependable full-stack systems — from the APIs and databases at the core to the cloud they run on. Currently leading engineering at a fintech building accessible lending for women.',
  links: {
    github: 'https://github.com/AtumaDavid',
    linkedin: null, // ← paste your LinkedIn URL (hidden while null)
    medium: null, // ← paste your Medium URL (hidden while null)
  },
  // Short human story for the About section. Keep it true.
  story: [
    'I studied Biochemistry at FUTA, then found my way into software. Since then I have built for fintech, healthcare, crowdfunding and food startups, mostly remotely, for teams from Lagos to Dubai.',
    'Today I lead engineering at Shecluded, where we are making credit easier to reach for women entrepreneurs. I care about software that is calm to use and calm to run.',
  ],
  // Little personality stickers. Only real things!
  stickers: [
    { emoji: '📍', text: 'Lagos, Nigeria' },
    { emoji: '🧪', text: 'Biochem grad turned engineer' },
    { emoji: '🌍', text: 'Happy working remote' },
    { emoji: '🧭', text: 'Leads teams, still writes code' },
  ],
};

// ── SERVICES: "What I do" cards on the home page ──
// `icon` picks the mini illustration: 'web' | 'api' | 'plan' | 'cloud'
export const services = [
  {
    icon: 'web',
    title: 'Web apps & websites',
    body: 'Fast, accessible interfaces in React and Next.js. Or a quick Shopify, Wix, Carrd or Google Sites build when that is the better fit for you.',
  },
  {
    icon: 'api',
    title: 'APIs & backends',
    body: 'Secure, well-organised services in Node, Nest.js and Express on PostgreSQL or MongoDB. Auth, roles and payments included.',
  },
  {
    icon: 'plan',
    title: 'Product & project management',
    body: 'I can run the project as well as build it: shaping scope and roadmaps, running Agile sprints and keeping everyone in the loop.',
  },
  {
    icon: 'cloud',
    title: 'Cloud & DevOps',
    body: 'AWS, Docker, Nginx and CI/CD pipelines, so releasing is boring in the best way. At Shecluded this cut deploy time by ~80%.',
  },
];

// ── PROCESS: "How I work" steps (the rocket road). `emoji` shows once reached ──
export const steps = [
  {
    emoji: '👂',
    title: 'Listen',
    body: 'We talk through the problem, the people using it and what "done" looks like.',
  },
  {
    emoji: '✏️',
    title: 'Plan',
    body: 'I map the data, the APIs and the screens, and we agree on scope before any code.',
  },
  {
    emoji: '🛠️',
    title: 'Build',
    body: 'Small, reviewable releases you can click through as we go. No big-bang surprises.',
  },
  {
    emoji: '📦',
    title: 'Ship & support',
    body: 'Automated deploys and a clean handover, with support after launch if you need it.',
  },
];

// ── TESTIMONIALS: real quotes only. The section stays hidden while empty. ──
// { quote: '...', name: 'Jane Doe', role: 'CTO, Company', photo: '/images/jane.jpg' }
export const testimonials = [];

// ── WORK: companies you've worked for (the headline of the site) ──
// Each role can list the products you shipped there, with a live link
// and an optional screenshot. When only some of it can be shown publicly,
// set `shippedLabel` (text on the card) and `moreShipped` (a note in the details).
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
    period: '2026',
    mode: 'Contract | Remote',
    shippedLabel: 'Various projects shipped',
    moreShipped: "Plus various other client projects I've shipped that aren't available to show publicly.",
    summary:
      'Build and maintain client websites across multiple platforms, matching each project to the right tool.',
    points: [
      'Build and ship client websites using Shopify, Google Sites, Wix and Carrd, selecting the right platform for each project.',
      'Design responsive, SEO-friendly layouts with structured content and third-party integrations.',
      'Set up e-commerce storefronts and configure payments, products and shipping on Shopify.',
      'Hand off maintainable sites to clients and provide ongoing updates and support.',
    ],
    stack: [
      'Shopify',
      'Google Sites',
      'Wix',
      'Carrd',
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

// Toolbox drawers on the About section. `emoji` labels each drawer tab.
export const stack = [
  {
    group: 'Languages',
    emoji: '🔤',
    items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL', 'Solidity'],
  },
  {
    group: 'Frontend',
    emoji: '🎨',
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
    emoji: '⚙️',
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
    emoji: '🗄️',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'AWS RDS', 'Neon'],
  },
  {
    group: 'Cloud & DevOps',
    emoji: '☁️',
    items: ['AWS EC2 / S3', 'Docker', 'Nginx', 'CI/CD', 'PM2', 'Certbot'],
  },
  {
    group: 'CMS & No-Code',
    emoji: '🧩',
    items: [
      'WordPress',
      'Shopify',
      'Wix',
      'Google Sites',
      'Carrd',
      'HTML',
      'CSS',
      'SEO',
    ],
  },
  {
    group: 'Product & Delivery',
    emoji: '🧭',
    items: ['Product management', 'Project management', 'Agile / Scrum', 'Lean', 'Team leadership'],
  },
  {
    group: 'Tooling',
    emoji: '🔧',
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
