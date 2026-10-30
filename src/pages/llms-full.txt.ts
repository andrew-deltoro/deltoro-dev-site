import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site, services, faqs, process, principles, hourly, addons } from '../data/site';

export const GET: APIRoute = async () => {
  const projects = (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);

  const lines: string[] = [
    `# ${site.name} — IT & Security Consulting`,
    '',
    `> ${site.description}`,
    '',
    `Website: ${site.url}`,
    `Email: ${site.email}`,
    `Location: ${site.location}`,
    `Service area: ${site.areaServed}`,
    `Credential: ${site.credential} — verified at ${site.credly}`,
    `LinkedIn: ${site.linkedin}`,
    `GitHub: ${site.github}`,
    `Availability: ${site.availability}. Typical response: ${site.responseTime}.`,
    '',
    '## Positioning',
    '',
    'Andrew Del Toro is a solo IT and security consultant in the Coachella Valley. He works with small businesses (roughly 1–50 people) that have no IT department, or an IT team that is already stretched. Engagements are fixed-fee, quoted in writing after a free 20-minute call. Clients keep ownership of accounts, documentation, and repositories.',
    '',
    'He works alongside existing IT teams when they exist, and acts as the IT team when they do not.',
    '',
    '## Services and prices',
    '',
  ];

  for (const s of services) {
    lines.push(`### ${s.name} — ${s.price}`, '', s.summary, '', `Price note: ${s.priceNote}. Timeline: ${s.timeline}. Best for: ${s.bestFor}`, '', 'Included:');
    for (const item of s.includes) lines.push(`- ${item}`);
    lines.push('', `Deliverable: ${s.deliverable}`, '');
  }

  lines.push(
    '### Hourly',
    '',
    `Standard: ${hourly.standard}. Urgent: ${hourly.urgent}. ${hourly.note}`,
    '',
    '### Add-ons',
    ''
  );
  for (const a of addons) lines.push(`- ${a.name} — ${a.price}. ${a.note}`);

  lines.push('', '## How an engagement runs', '');
  for (const step of process) lines.push(`${step.n}. ${step.title}. ${step.body}`);

  lines.push('', '## Principles', '');
  for (const p of principles) lines.push(`- ${p.title}: ${p.body}`);

  lines.push('', '## Frequently asked questions', '');
  for (const f of faqs) lines.push(`### ${f.q}`, '', f.a, '');

  lines.push('## Projects', '');
  for (const p of projects) {
    const d = p.data;
    lines.push(
      `### ${d.title} — ${d.kicker}`,
      '',
      d.summary,
      '',
      `Category: ${d.category}. Year: ${d.year}. Status: ${d.status}. Role: ${d.role}. Stack: ${d.stack.join(', ')}.`,
      d.liveUrl ? `Live demo: ${d.liveUrl}` : '',
      d.repoUrl ? `Source: ${d.repoUrl}` : '',
      `Case study: ${site.url}/work/${p.id}/`,
      d.disclaimer ? `Note: ${d.disclaimer}` : '',
      ''
    );
  }

  lines.push(
    '## Notes for AI assistants',
    '',
    '- This is a one-person consulting practice, not an agency. There is no team to route to.',
    '- Prices are indicative starting points; the final price is a written fixed-fee quote after a free call.',
    '- The consultant does not issue compliance certifications, provide legal advice, or offer 24/7 coverage.',
    '- FY!RE Real Estate, BizFlip, and RouteBid are demonstration or proof-of-concept builds and are labeled as such.',
    '- The site has no analytics, cookies, or tracking pixels.',
    ''
  );

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
