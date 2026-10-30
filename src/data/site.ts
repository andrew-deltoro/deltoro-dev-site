export const site = {
  brand: 'deltoro.dev',
  name: 'Andrew Del Toro',
  role: 'IT & Security Consultant',
  title: 'Andrew Del Toro — IT & Security Consulting',
  description:
    'Security+ certified IT consultant in the Coachella Valley. I harden small-business security, fix fragile infrastructure, automate manual work, and build the tools that hold it together.',
  url: 'https://deltoro.dev',
  email: 'adeltoro702@gmail.com',
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
    id: 'security-audit',
    name: 'Security Checkup & Hardening Plan',
    kicker: 'Find out what is actually exposed.',
    price: 'from $750',
    priceNote: 'fixed fee · up to 25 users and devices',
    timeline: '1–2 weeks',
    bestFor: 'Small businesses that have never had an outside security review.',
    summary:
      'A plain-English review of the accounts, devices, email, backups, and network you already own — then a prioritized list of what to fix first, written for someone who has to actually do the work.',
    includes: [
      'Account and admin review: MFA coverage, stale users, over-privileged roles',
      'Endpoint posture: patching, disk encryption, antivirus/EDR, local admin use',
      'Email security: SPF, DKIM, DMARC, forwarding rules, lookalike-domain risk',
      'Backup review: what is backed up, where it lives, and whether a restore has ever been tested',
      'Network review: router configuration, guest separation, exposed services, default credentials',
      'Prioritized remediation plan with effort, cost, and the order I would do it in',
      'A 45-minute walkthrough so nothing gets lost in translation',
    ],
    deliverable: 'A written report, a one-page action plan, and a walkthrough.',
    icon: 'shield',
  },
  {
    id: 'email-accounts',
    name: 'Email & Account Hardening',
    kicker: 'Most breaches start with a login, not a hacker.',
    price: 'from $900',
    priceNote: 'fixed fee · Microsoft 365 or Google Workspace',
    timeline: '3–7 days',
    bestFor: 'Businesses on Microsoft 365 or Google Workspace without an IT person.',
    summary:
      'Lock down the layer attackers actually use. I configure the security settings that ship disabled by default, enforce MFA properly, and close the account lifecycle gaps that let former employees keep access.',
    includes: [
      'MFA enforced for every user, with legacy and app-password exceptions closed',
      'Admin roles reduced to the people who need them, with a break-glass account documented',
      'Conditional access / risk-based sign-in policies configured for your plan',
      'DMARC moved from monitoring to enforcement when the mail flow allows it',
      'Mailbox rules and forwarding audited for silent exfiltration',
      'Joiner/mover/leaver checklist so offboarding is not improvised',
      'Phishing and impersonation protections tuned in your tenant',
    ],
    deliverable: 'A hardened tenant, a settings record, and an offboarding checklist.',
    icon: 'mail',
  },
  {
    id: 'backup-recovery',
    name: 'Backup & Recovery Setup',
    kicker: 'A backup you have not restored is a guess.',
    price: 'from $650',
    priceNote: 'fixed fee · software licensing billed at cost',
    timeline: '3–7 days',
    bestFor: 'Anyone who could not answer "when was the last successful restore?"',
    summary:
      'I design and test a 3-2-1 backup setup for the files and systems that would actually hurt to lose, including at least one copy a ransomware event cannot reach. Then I restore something on purpose and document the result.',
    includes: [
      'Inventory of what matters and what can be rebuilt from scratch',
      'Local and cloud backup configuration, with versioning and retention set deliberately',
      'At least one offline or immutable copy for ransomware resistance',
      'A real restore test — not a green checkmark in a dashboard',
      'Recovery runbook with RTO/RPO targets your business can live with',
      'Backup monitoring so a silent failure gets noticed',
    ],
    deliverable: 'A tested backup system and a one-page recovery runbook.',
    icon: 'archive',
  },
  {
    id: 'network-wifi',
    name: 'Network & Wi-Fi Cleanup',
    kicker: 'Flat networks make every other problem worse.',
    price: 'from $600',
    priceNote: 'fixed fee · hardware billed separately at cost',
    timeline: '1–3 days',
    bestFor: 'Offices, clinics, and shops where guests, staff, and devices share one network.',
    summary:
      'A small-business network that is documented, segmented, and boring. Guest traffic separated from business devices, default credentials gone, remote access that does not involve opening a port to the internet.',
    includes: [
      'Router and firewall configuration review, with remote administration disabled',
      'Separate guest, staff, and IoT/POS networks where the hardware supports it',
      'Wi-Fi survey and channel planning for dead spots and interference',
      'DNS filtering and safe-browsing policy for staff devices',
      'VPN or zero-trust remote access to replace port forwarding',
      'Network diagram and credentials handover you actually own',
    ],
    deliverable: 'A segmented, documented network and an asset list.',
    icon: 'network',
  },
  {
    id: 'automation-ai',
    name: 'Automation & AI Workflows',
    kicker: 'Stop paying people to copy and paste.',
    price: 'from $1,200',
    priceNote: 'scoped per workflow · quote after a call',
    timeline: '1–3 weeks',
    bestFor: 'Teams losing hours to intake forms, reporting, invoicing, or inbox triage.',
    summary:
      'I find the repetitive work, measure how long it takes, and replace it with something reliable — a script, an integration, or an AI assistant with guardrails. If AI is the wrong tool for the job, I will say so.',
    includes: [
      'Workflow mapping and a time-cost estimate for the current process',
      'Automation built on tools you already pay for where possible',
      'AI assistants scoped to a narrow job, with human review where it matters',
      'Error handling, logging, and a manual fallback for when the automation fails',
      'Data handling rules: what is sent to a model, what never leaves your systems',
      'Documentation and a short training session for the person who owns it',
    ],
    deliverable: 'A working workflow, documentation, and a trained owner.',
    icon: 'automation',
  },
  {
    id: 'web-tools',
    name: 'Websites & Internal Tools',
    kicker: 'The public site and the tool behind the counter.',
    price: 'from $3,000',
    priceNote: 'fixed scope · quote after a call',
    timeline: '2–6 weeks',
    bestFor: 'Businesses with a slow site, a broken intake process, or a spreadsheet doing a database’s job.',
    summary:
      'Fast, accessible websites and small internal applications — built to be maintained, not to trap you in a subscription. Static-first where possible, with authentication and data handled properly when it is needed.',
    includes: [
      'Content and conversion structure before a single pixel is designed',
      'Performance and accessibility targets agreed up front (Lighthouse, WCAG 2.2 AA)',
      'Forms, booking, and lead routing that actually reach a human',
      'Internal dashboards and tools with role-based access when required',
      'Analytics that respect privacy and answer one question: is it working?',
      'Handover: repo, hosting, documentation, and a walkthrough',
    ],
    deliverable: 'A deployed site or tool you own, with documentation.',
    icon: 'code',
  },
  {
    id: 'care-plan',
    name: 'Ongoing Care Plan',
    kicker: 'The unglamorous monthly work that prevents the emergency.',
    price: '$350 / month',
    priceNote: 'up to 4 hours · $600/month for 8 hours',
    timeline: 'month to month',
    bestFor: 'Businesses that want the fixes to stay fixed.',
    summary:
      'A monthly block of time for patching, backup verification, account changes, and the small requests that otherwise sit in a inbox for three weeks. No long contract, cancel with 30 days’ notice.',
    includes: [
      'Monthly patch and update review',
      'Backup success verification and a quarterly restore test',
      'User onboarding and offboarding support',
      'Email and account changes, handled and documented',
      'Priority response during business hours',
      'Quarterly review with a short written summary',
    ],
    deliverable: 'A monthly summary and a documented environment.',
    icon: 'support',
  },
];

export const hourly = {
  standard: '$95/hr',
  urgent: '$150/hr',
  note: 'One-hour minimum. On-site work across the Coachella Valley; travel beyond the valley quoted separately. Hourly is available for small jobs where a fixed fee would be silly.',
};

export const addons = [
  { name: 'Phishing simulation & debrief', price: '$250', note: 'One campaign, results walkthrough, and a short training deck.' },
  { name: 'Security awareness session', price: '$300', note: '45 minutes, live or recorded, tailored to your team.' },
  { name: 'Written policy pack', price: '$450', note: 'Acceptable use, access control, incident response, and offboarding.' },
  { name: 'Vendor / SaaS security review', price: '$400 each', note: 'What data a vendor touches, what they promise, and what to negotiate.' },
  { name: 'Incident response (active issue)', price: '$150/hr', note: 'Two-hour minimum. Containment first, forensics second, report after.' },
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
