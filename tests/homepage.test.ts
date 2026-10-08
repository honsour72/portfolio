import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { load } from 'cheerio';
import { describe, expect, it } from 'vitest';

const root = process.cwd();

function homepage(locale: 'en' | 'ru') {
  const html = readFileSync(join(root, 'dist', locale, 'index.html'), 'utf8');
  return { html, $: load(html) };
}

describe.each([
  {
    locale: 'en' as const,
    name: 'Mikhail Rogozin',
    role: 'Senior Backend Engineer · Python & Go',
    footer: 'Built with AI assistance. The content and final decisions are mine.',
  },
  {
    locale: 'ru' as const,
    name: 'Михаил Рогозин',
    role: 'Senior Backend Engineer · Python & Go',
    footer: 'Сайт создан с помощью ИИ. За содержание и финальные решения отвечаю я.',
  },
])('$locale homepage', ({ locale, name, role, footer }) => {
  it('renders the approved identity, evidence and section landmarks', () => {
    const { $ } = homepage(locale);
    const text = $('body').text();

    expect($('h1').text()).toContain(name);
    expect(text).toContain(role);
    expect($('[data-evidence]').length).toBe(4);

    for (const id of [
      'work',
      'experience',
      'technical',
      'teaching',
      'writing',
      'awards',
      'recommendations',
      'education',
      'about',
      'contact',
    ]) {
      expect($(`#${id}`).length, `missing #${id}`).toBe(1);
    }
  });

  it('links to both cases and the locale-matched CV downloads', () => {
    const { $ } = homepage(locale);
    const hrefs = $('a')
      .map((_, element) => $(element).attr('href'))
      .get();

    expect(hrefs).toContain(`/${locale}/work/workforce-attrition/`);
    expect(hrefs).toContain(`/${locale}/work/scailium-observability/`);
    expect(hrefs).toContain(`/files/cv/mikhail-rogozin-cv-${locale}-compact.pdf`);
    expect(hrefs).toContain(`/files/cv/mikhail-rogozin-cv-${locale}-extended.pdf`);
  });

  it('renders monogram recommendations and confirmed external links', () => {
    const { $ } = homepage(locale);
    const text = $('body').text();
    const hrefs = $('a')
      .map((_, element) => $(element).attr('href'))
      .get();

    expect($('[data-recommendation-monogram="EK"]').length).toBe(1);
    expect($('[data-recommendation-monogram="AS"]').length).toBe(1);
    expect(hrefs).toContain('https://www.linkedin.com/in/michael-rogozin/');
    expect(hrefs).toContain('https://t.me/honsour72');
    expect(hrefs).toContain('https://profi.ru/profile/RogozinMU/');
    expect(text).toContain(footer);
  });

  it('does not render discarded slogans or unsupported claims', () => {
    const { html } = homepage(locale);

    for (const forbidden of [
      'Real systems. Measurable impact.',
      'ownership beyond code',
      'GraphQL',
      'Hexagonal Architecture',
      'formal on-call',
      'Clover',
    ]) {
      expect(html).not.toContain(forbidden);
    }
  });
});
