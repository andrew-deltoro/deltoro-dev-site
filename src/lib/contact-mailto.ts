export type ContactFields = {
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
};

/**
 * Builds the mailto: URL used by the contact form's no-backend fallback.
 * Kept pure so it can be tested without a browser (and without opening
 * the desktop mail handler).
 */
export function buildContactMailto(fields: ContactFields, to: string): string {
  const subject = `Project inquiry — ${fields.company || fields.name}`;
  const body = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    fields.company ? `Business: ${fields.company}` : '',
    `Service: ${fields.service ?? ''}`,
    `Budget: ${fields.budget ?? ''}`,
    '',
    fields.message,
  ]
    .filter(Boolean)
    .join('\n');

  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
