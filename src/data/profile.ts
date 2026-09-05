/**
 * Every piece of copy on the site lives here. Components read from this file and
 * hardcode nothing, so updating the site means editing this one module.
 */

export const person = {
  name: 'Rohit Mistry',
  role: 'SDE-2 · Backend Engineer',
  company: 'Blinkit',
  team: 'Fraud Prevention',
  tagline: 'I build systems that catch fraud before it costs anyone anything.',
  intro:
    'Backend engineer working on fraud prevention for quick commerce — hunting fraud patterns, modelling them, and shipping the detection on the hot path of a platform that never slows down.',
  photo: {
    small: 'rohit-mistry-640.jpg',
    large: 'rohit-mistry-1280.jpg',
    alt: 'Portrait of Rohit Mistry',
  },
  resume: 'Rohit_Mistry_Resume.pdf',
} as const;

/**
 * The address is stored in halves and joined at runtime so the complete string
 * never appears as a literal in the shipped bundle or the served HTML. It stops
 * naive address harvesters; it is not a defence against a determined one.
 */
const emailParts = ['rohitsphs.051604', 'gmail.com'];
export const email = emailParts.join('@');

export const links = {
  linkedin: 'https://www.linkedin.com/in/rohit-mistry-0563251a0/',
  github: 'https://github.com/mistryiam',
  instagram: 'https://www.instagram.com/mystech_404/',
} as const;

export const about: readonly string[] = [
  'I am a backend engineer on the Fraud Prevention team at Blinkit. Quick commerce moves fast enough that fraud has to be caught in the same breath as the order — so my work is equal parts detection science and systems engineering: finding every shape fraud takes on the platform, building models that predict it automatically, and surfacing the linkages between accounts that look unrelated until you look at them together.',
  'A lot of that is pattern work at scale. Colluding accounts, repeated abuse of promotions, device and address graphs that quietly overlap — the signal is rarely in one record, it is in how records connect. I build the pipelines and services that turn that graph into decisions, and then I make those services survive production: scalable, fault tolerant, and fast enough to sit inline with real traffic.',
  'Before Blinkit I spent nearly two years at Dream11, writing core backend for the Creator’s Economy through the IPL 2025 launch and owning services through a world-record 16.1M-concurrency event. That is where I learned what high traffic actually means — 60M requests per minute, zero downtime, and no tolerance for a service that only works on a good day.',
  'I studied Physics at IIT Kharagpur, which is mostly a story about liking hard problems. I still solve them for fun: 800+ DSA problems and a competitive programming habit I have not managed to quit.',
];

export type Stat = {
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
  note: string;
};

export const stats: readonly Stat[] = [
  {
    value: 16.1,
    suffix: 'M',
    decimals: 1,
    label: 'Peak concurrency',
    note: 'World record, IPL 2025',
  },
  { value: 60, suffix: 'M', label: 'Requests / minute', note: 'Sustained at peak traffic' },
  { value: 260, suffix: 'M+', label: 'Users served', note: 'Platform scale at Dream11' },
  { value: 0, suffix: '%', label: 'Downtime at peak', note: 'Across load-tested services' },
  { value: 16, suffix: '×', label: 'Pipeline speedup', note: 'Video arrival: 4h → 15min' },
  { value: 800, suffix: '+', label: 'Problems solved', note: 'Codeforces, LeetCode, AtCoder' },
];

export type Role = {
  company: string;
  project?: string;
  title: string;
  period: string;
  location?: string;
  current?: boolean;
  summary: string;
  highlights: readonly string[];
  tags: readonly string[];
};

export const experience: readonly Role[] = [
  {
    company: 'Blinkit',
    title: 'Software Development Engineer II',
    period: 'Jul 2026 — Present',
    current: true,
    summary:
      'Backend engineering on the Fraud Prevention team, covering every form fraud takes on a quick-commerce platform.',
    highlights: [
      'Detect and prevent fraud across the quick-commerce platform — promotion abuse, account and payment fraud, delivery and refund exploitation.',
      'Build machine-learning models that predict fraudulent behaviour automatically, so detection scales past hand-written rules.',
      'Find linkages across customers — device, address, payment and behavioural overlaps that expose coordinated rings hiding behind unrelated-looking accounts.',
      'Mine behavioural patterns from platform data and turn them into signals the prevention systems can act on in real time.',
      'Design and run the prevention services themselves: scalable, fault tolerant, and fast enough to sit inline with high-traffic order flow.',
    ],
    tags: [
      'Fraud Detection',
      'Machine Learning',
      'Graph Linkage',
      'Distributed Systems',
      'Backend',
    ],
  },
  {
    company: 'Dream11',
    project: 'DreamSports AI',
    title: 'Software Development Engineer I',
    period: 'Oct 2024 — Jun 2026',
    location: 'Mumbai, India',
    summary:
      'Core backend for the Creator’s Economy through the IPL 2025 launch, plus AI systems on the DreamPlay team.',
    highlights: [
      'Core backend engineer for the Creator’s Economy (IPL 2025 launch): designed LLDs and built APIs, GraphQL services, Kafka producers and consumers, Spark jobs and crons across marketplace, payments and user-facing systems — including the Marketplace service (team broadcasts and subscriptions) at 48.5M RPM. The platform hit a world-record 16.1M concurrency, 260M+ users and ₹2000 Cr (~$240M) revenue, 18% of org revenue.',
      'Service owner of the Social-Leaderboard service, which lets users filter and track their rank within their social network live during matches, sustaining 33M RPM; shipped backend optimisations projected to save ~$100K/year.',
      'Built multiple Kafka consumer applications for real-time cross-system sync across Aerospike, MySQL, DynamoDB and microservices — including a two-way sync that kept team selections consistent between new and legacy app versions. Owned database operations (MySQL, Aerospike, Kafka) with cost-optimised scaling and monitoring.',
      'Led load testing across services, finding and fixing the bottlenecks that let us sustain up to 60M RPM with 0% downtime at peak IPL traffic; built automated functional test suites validating correctness across API contracts.',
      'On DreamPlay: built PredictLLM, an LLM-based sports-prediction engine for Rushline; delivered in-app purchases end to end (Apple App Store + Google Play Billing); engineered real-time live match commentary; and built a Vision-Language Model platform using RF-DETR, BoT-SORT and Google Gemini for multimodal video understanding.',
      'Cut video Total-Arrival-Time from 4 hours to 15 minutes — 16× faster — with real-time video ingestion and on-the-fly HLS output.',
    ],
    tags: ['Kafka', 'GraphQL', 'Spark', 'Aerospike', 'Vert.x', 'LLMs', 'VLM', 'Load Testing'],
  },
  {
    company: 'Solutionec Pvt. Ltd.',
    project: 'C.H.C Sinergi 2.0+',
    title: 'Software Development Engineer I',
    period: 'Jun 2024 — Oct 2024',
    location: 'Bangalore, India',
    summary: 'Data ingestion and ETL for compliant international consumer-health data.',
    highlights: [
      'Designed cost-effective data-ingestion pipelines and revamped legacy ETL processes; partnered with business stakeholders on workload forecasting and technology roadmaps.',
      'Built automated ingestion for compliant international consumer-health data with rigorous quality control and audits, improving data accuracy, accessibility and stakeholder satisfaction.',
    ],
    tags: ['ETL', 'Data Pipelines', 'Big Data', 'Compliance'],
  },
  {
    company: 'Solutionec Pvt. Ltd.',
    project: 'QueryBuilder',
    title: 'Software Development Intern',
    period: 'May 2023 — Aug 2023',
    location: 'Bangalore, India',
    summary: 'A dynamic-SQL query tool for business analysts, built from scratch.',
    highlights: [
      'Built a web app letting Business Analysts compose dynamic SQL queries (Flask, SQLAlchemy), with a from-scratch backend using ConnectorX and a Snowflake integration.',
      'Optimised performance by 12×, earning a Spot Award from the COO and a Pre-Placement Offer.',
    ],
    tags: ['Flask', 'SQLAlchemy', 'Snowflake', 'ConnectorX'],
  },
];

export type SkillGroup = { name: string; items: readonly string[] };

export const skills: readonly SkillGroup[] = [
  {
    name: 'Languages',
    items: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'Go', 'Bash'],
  },
  {
    name: 'Backend & Web',
    items: ['Node.js', 'Vert.x', 'RxJava', 'GraphQL', 'REST APIs', 'Microservices', 'React'],
  },
  {
    name: 'Data & Infrastructure',
    items: [
      'Apache Kafka',
      'Apache Spark',
      'PostgreSQL',
      'MongoDB',
      'DynamoDB',
      'Aerospike',
      'Snowflake',
      'Big Data',
      'Docker',
      'AWS',
      'GCP',
    ],
  },
  {
    name: 'AI / ML',
    items: [
      'Machine Learning',
      'Deep Learning',
      'LLMs',
      'Vision-Language Models',
      'Computer Vision',
    ],
  },
  {
    name: 'CS Fundamentals',
    items: [
      'Data Structures & Algorithms',
      'System Design',
      'DBMS',
      'OOP',
      'Competitive Programming',
    ],
  },
];

export const education = {
  degree: 'Integrated M.Sc. in Physics',
  school: 'Indian Institute of Technology (IIT) Kharagpur',
  period: '2019 — 2024',
  detail: 'CGPA 8.54 / 10',
} as const;

export type Achievement = { title: string; detail: string };

export const achievements: readonly Achievement[] = [
  {
    title: 'CodeChef SnackDown 2021',
    detail: 'Ranked 1012 out of 70,000+, reaching the Pre-Elimination Round.',
  },
  {
    title: 'CodeChef January Long 2022',
    detail: 'Ranked 402 out of 10,000+ in Division 3.',
  },
  {
    title: '800+ DSA problems solved',
    detail: 'Across Codeforces, LeetCode and AtCoder.',
  },
  {
    title: 'Quantum Computing research, 2022',
    detail:
      'Selected for Summer Research in Quantum Computing at Universitat Politècnica de Catalunya (UPC-BarcelonaTech).',
  },
];

/** Labels for the three formations the hero field morphs through. */
export const formations = [
  { key: 'neural', title: 'AI & Machine Learning', blurb: 'Models that learn the pattern' },
  { key: 'cluster', title: 'Distributed Systems', blurb: 'Events moving between services' },
  { key: 'scale', title: 'Systems at Scale', blurb: 'Millions of requests a minute' },
] as const;

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'beyond', label: 'Beyond Work' },
  { id: 'contact', label: 'Contact' },
] as const;
