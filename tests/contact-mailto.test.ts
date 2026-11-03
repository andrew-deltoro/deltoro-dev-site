import test from 'node:test';
import assert from 'node:assert/strict';
import { buildContactMailto } from '../src/lib/contact-mailto.ts';

const decode = (url: string) => {
  const parsed = new URL(url);
  return {
    scheme: parsed.protocol,
    to: parsed.pathname,
    subject: parsed.searchParams.get('subject'),
    body: parsed.searchParams.get('body'),
  };
};

test('addresses the configured inbox and uses the business name in the subject', () => {
  const url = buildContactMailto(
    {
      name: 'Test Person',
      email: 'test@example.com',
      company: 'Acme Co',
      service: 'Security Checkup & Hardening Plan',
      budget: 'Not sure yet',
      message: 'Testing the contact form fallback.',
    },
    'hello@deltoro.dev',
  );

  const mail = decode(url);
  assert.equal(mail.scheme, 'mailto:');
  assert.equal(mail.to, 'hello@deltoro.dev');
  assert.equal(mail.subject, 'Project inquiry — Acme Co');
  assert.match(mail.body ?? '', /^Name: Test Person$/m);
  assert.match(mail.body ?? '', /^Email: test@example\.com$/m);
  assert.match(mail.body ?? '', /^Service: Security Checkup & Hardening Plan$/m);
  assert.match(mail.body ?? '', /Testing the contact form fallback\.$/);
});

test('falls back to the person name and omits an empty business line', () => {
  const url = buildContactMailto(
    { name: 'Dana', email: 'dana@example.com', message: 'Hi there' },
    'hello@deltoro.dev',
  );

  const mail = decode(url);
  assert.equal(mail.subject, 'Project inquiry — Dana');
  assert.doesNotMatch(mail.body ?? '', /^Business:/m);
});

test('escapes characters that would otherwise break the URL', () => {
  const url = buildContactMailto(
    { name: 'A & B', email: 'a+b@example.com', company: 'Smith & Sons', message: 'Line one\nLine two #1' },
    'hello@deltoro.dev',
  );

  assert.ok(!/[ ]/.test(url), 'spaces must be percent-encoded');
  const mail = decode(url);
  assert.equal(mail.subject, 'Project inquiry — Smith & Sons');
  assert.match(mail.body ?? '', /Line one\nLine two #1/);
});
