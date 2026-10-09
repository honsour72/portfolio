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
    workTitle: 'Featured engineering case studies',
    footer: 'Codex built this site and drove me mad while we filled it with content.',
  },
  {
    locale: 'ru' as const,
    name: 'Михаил Рогозин',
    role: 'Senior Backend Engineer · Python & Go',
    workTitle: 'Ключевые инженерные кейсы',
    footer: 'Этот сайт создал Codex — и заставил меня перепроверить каждую строчку.',
  },
])('$locale homepage', ({ locale, name, role, workTitle, footer }) => {
  it('renders the approved identity, evidence and section landmarks', () => {
    const { $ } = homepage(locale);
    const text = $('body').text();

    expect($('h1').text()).toContain(name);
    expect(text).toContain(role);
    expect($('#work-title').text()).toBe(workTitle);
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
    for (const organisationUrl of [
      'https://www.avito.ru/company',
      'https://www.linkedin.com/company/alar-studios',
      'https://www.group-ib.com/',
      'https://lumoss.ru/',
      'https://code-class.ru/',
      'https://fitp.itmo.ru/',
    ]) {
      expect(hrefs).toContain(organisationUrl);
    }
    expect(text).toContain(footer);
  });

  it('keeps the language order stable and renders the portrait without a caption', () => {
    const { $ } = homepage(locale);
    const languageItems = $('.locale-switch')
      .children()
      .map((_, element) => $(element).text().trim())
      .get();

    expect(languageItems).toEqual(['EN', '/', 'RU']);
    expect($('.hero-portrait figcaption')).toHaveLength(0);
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
