export const site = {
  brand: 'deltoro.dev',
  name: 'Andrew Del Toro',
  role: 'IT & Security Consultant',
  title: 'Andrew Del Toro — IT & Security Consulting',
  description:
    'Security+ certified IT consultant in the Coachella Valley. I harden small-business security, fix fragile infrastructure, automate manual work, and build the tools that hold it together.',
  url: 'https://deltoro.dev',
  email: 'contact@deltoro.dev',
  phone: '',
  location: 'Coachella Valley, California',
  areaServed: 'Palm Springs, Palm Desert, La Quinta, Indio & remote across California',
  timezone: 'America/Los_Angeles',
  linkedin: 'https://www.linkedin.com/in/andrew-deltoro',
  github: 'https://github.com/andrew-deltoro',
  credly: 'https://www.credly.com/badges/ae9ead44-57c2-430f-bdd9-4fff5ae1c5f9',
  credential: 'CompTIA Security+ CE (SY0-701)',
  // Optional integrations. Leave blank to use the built-in fallbacks.
  bookingUrl: '', // e.g. 'https://cal.com/andrew-deltoro/intro-call'
  formEndpoint: '', // e.g. 'https://formspree.io/f/xxxxxxxx'
  availability: 'Available for new projects',
  responseTime: 'one business day',
};

export type Service = {
  id: string;
  name: string;
  kicker: string;
  price: string;
  priceNote: string;
  timeline: string;
  bestFor: string;
  summary: string;
  includes: string[];
  deliverable: string;
  icon: 'shield' | 'mail' | 'archive' | 'network' | 'automation' | 'code' | 'support';
};

export const services: Service[] = [
  {
    id: 'web-tools',
    name: 'Websites',
    kicker: 'A site that works on the phone your customers are actually holding.',
    price: '$200',
    priceNote: 'one-time · three pages · $100/month for the first 30 days after launch',
    timeline: '3–7 days',
    bestFor: 'A business with no site, a broken site, or one nobody has touched in ten years.',
    summary:
      'Three pages — home, menu or services, and contact — built mobile-first, fast, and readable by both Google and AI assistants. One-time fee, handed over complete. You own the domain, the hosting, and the files.',
    includes: [
      'Home, menu or services, and contact pages',
      'Mobile-first layout that loads quickly on a phone',
      'Your hours, address and menu as real text, with structured data',
      'A contact form that reaches your inbox, tested end to end',
      'Handover: domain, hosting, files and a one-page runbook',
      'The first 30 days of fixes and small updates',
    ],
    deliverable: 'A deployed site you own, with everything handed over.',
    icon: 'code',
  },
];

export const hourly = {
  standard: '$95/hr',
  urgent: '$150/hr',
  note: 'One-hour minimum. On-site work across the Coachella Valley; travel beyond the valley quoted separately. Hourly is available for small jobs where a fixed fee would be silly.',
};

export const addons = [
  { name: 'Booking or ordering integration', price: '+$50', note: 'Online scheduling or ordering wired into the site and tested end to end.' },
];

export const process = [
  {
    n: '01',
    title: 'A free 20-minute call',
    body: 'You describe what is broken, what you have already tried, and what it is costing you. I tell you whether I am the right person and what I would look at first. No deck, no pitch.',
  },
  {
    n: '02',
    title: 'A look under the hood',
    body: 'With your permission, I review accounts, endpoints, backups, email, and network configuration. Read-only where possible, with an NDA if you want one. You get findings even if we never work together.',
  },
  {
    n: '03',
    title: 'A written plan and a fixed quote',
    body: 'Prioritized findings, the work required, what it costs, and what I am not covering. You approve the scope in writing before anything changes. No hourly surprises.',
  },
  {
    n: '04',
    title: 'Implement, document, hand off',
    body: 'I do the work, test it, write it down, and train the person who will own it. Accounts and documentation stay in your name. If your team wants to take it from there, I make that easy.',
  },
];

export const principles = [
  {
    title: 'Boring is the goal',
    body: 'Good IT is not exciting. Systems that patch themselves, backups that restore, and accounts that get revoked are worth more than a clever stack nobody can maintain.',
  },
  {
    title: 'You own everything',
    body: 'Accounts, domains, repos, and documentation are in your name from day one. I do not hold your business hostage with credentials only I understand.',
  },
  {
    title: 'Fixed scope, honest limits',
    body: 'I quote a fixed fee after scoping, and I tell you what I am not qualified to do. For legal, compliance certification, or specialized engineering work, I will point you to someone better.',
  },
  {
    title: 'Explain it like a human',
    body: 'No fear-selling and no jargon walls. You should be able to explain the risk to your own team after I leave.',
  },
];

export const faqs = [
  {
    q: 'Do you work with our existing IT team or MSP?',
    a: 'Yes — that is often the best version of this. I will work hand in hand with your IT team to implement these suggestions, or hand them a prioritized plan they can execute themselves. I am not trying to replace your MSP; I am trying to make sure someone is checking the things that get missed.',
  },
  {
    q: 'We do not have an IT team. Can you still help?',
    a: 'No IT team? No worries. Think of me as your IT team to perform the improvements you are looking for. I handle the work, document what changed, and leave you with something you can hand to the next person. If you want ongoing coverage afterward, the care plan exists for exactly that.',
  },
  {
    q: 'How does pricing actually work?',
    a: 'Most work is a fixed fee quoted after a free scoping call. You approve the scope and price in writing before I start. If I find something materially different once I am inside, I stop and re-quote rather than quietly running up hours. Small jobs can be hourly at $95/hr.',
  },
  {
    q: 'How quickly can you start?',
    a: 'Usually within one to two weeks for project work. Active security incidents get priority — email me with "URGENT" in the subject and I will see it first. I would rather tell you I cannot take something than take it and be slow.',
  },
  {
    q: 'What size business do you work with?',
    a: 'The sweet spot is 1–50 people: professional services, clinics, real estate, restaurants, contractors, and small nonprofits. If you are larger, I can still run a focused audit, but you probably need a full-time team for day-to-day operations.',
  },
  {
    q: 'Are you local?',
    a: 'I am based in the Coachella Valley and work on-site from Palm Springs to Indio. Most work is remote, which is fine for account, email, and cloud configuration. Network and hardware work usually needs someone in the room. I take projects beyond the valley case by case.',
  },
  {
    q: 'Will this make us "compliant"?',
    a: 'I help you close technical gaps and prepare evidence for frameworks like HIPAA, PCI DSS, or SOC 2. I do not issue certifications, provide legal advice, or guarantee an audit outcome. Anyone who promises that is selling you something.',
  },
  {
    q: 'What happens to our data?',
    a: 'I work from your accounts with the least access needed, keep working files on an encrypted disk, and delete engagement data after handover unless you ask me to retain it. I am happy to sign your NDA and follow your data-handling policy.',
  },
  {
    q: 'Can you build us a website too?',
    a: 'Yes. I build fast, accessible marketing sites and small internal tools, and I have shipped enough of them to know where the traps are. It is the same discipline as the security work: fewer moving parts, documented, and owned by you.',
  },
  {
    q: 'What if we need something you do not do?',
    a: 'I will tell you and, where I can, point you to someone who does. I would rather lose the job than pretend to be a specialist I am not.',
  },
];

export const stats = [
  { value: '12', label: 'projects built this year' },
  { value: 'Security+', label: 'CompTIA SY0-701 certified' },
  { value: 'On-site', label: 'Palm Springs to Indio' },
  { value: '1 day', label: 'typical response time' },
];
