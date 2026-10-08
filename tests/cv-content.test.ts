import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { load } from 'cheerio';
import { beforeAll, describe, expect, it } from 'vitest';

const root = process.cwd();

beforeAll(() => {
  execFileSync('pnpm', ['build'], { cwd: root, stdio: 'pipe' });
});

describe.each(['en', 'ru'] as const)('%s CV pages', (locale) => {
  it.each(['compact', 'extended'] as const)('renders the approved %s CV contract', (variant) => {
    const html = readFileSync(join(root, 'dist', 'cv', locale, variant, 'index.html'), 'utf8');
    const $ = load(html);
    const text = $('body').text();

    expect($('html').attr('lang')).toBe(locale);
    expect($('meta[name="robots"]').attr('content')).toBe('noindex, nofollow');
    expect($('[data-cv-photo]').length).toBe(0);
    expect(text).toContain(locale === 'en' ? 'Mikhail Rogozin' : 'Михаил Рогозин');
    expect(text).toContain('Senior Backend Engineer · Python & Go');
    expect(text).toContain('m@rogozin-pro.ru');
    expect($('a[href="mailto:m@rogozin-pro.ru"]').length).toBeGreaterThan(0);
    expect($('a[href="https://www.linkedin.com/in/michael-rogozin/"]').length).toBeGreaterThan(0);
    expect($('[data-cv-page]').length).toBe(variant === 'compact' ? 1 : 2);

    for (const forbidden of ['phone', 'телефон', 'Clover', 'GraphQL', 'Hexagonal Architecture']) {
      expect(text.toLowerCase()).not.toContain(forbidden.toLowerCase());
    }
  });

  it('keeps the compact version focused and adds supporting evidence in the extended version', () => {
    const compact = readFileSync(join(root, 'dist', 'cv', locale, 'compact', 'index.html'), 'utf8');
    const extended = readFileSync(join(root, 'dist', 'cv', locale, 'extended', 'index.html'), 'utf8');

    expect(compact).not.toContain('data-cv-supporting');
    expect(extended).toContain('data-cv-supporting');
  });
});
