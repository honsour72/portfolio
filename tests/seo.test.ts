import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { load } from 'cheerio';
import { beforeAll, describe, expect, it } from 'vitest';

const root = process.cwd();

beforeAll(() => {
  execFileSync('pnpm', ['build'], { cwd: root, stdio: 'pipe' });
});

function documentAt(...segments: string[]) {
  return load(readFileSync(join(root, 'dist', ...segments, 'index.html'), 'utf8'));
}

describe('public metadata', () => {
  it.each(['en', 'ru'] as const)('renders canonical, alternates and social metadata for %s', (locale) => {
    const $ = documentAt(locale);
    const other = locale === 'en' ? 'ru' : 'en';

    expect($('link[rel="canonical"]').attr('href')).toBe(`https://m-rogozin.ru/${locale}/`);
    expect($(`link[rel="alternate"][hreflang="${other}"]`).attr('href')).toBe(
      `https://m-rogozin.ru/${other}/`,
    );
    expect($('link[rel="alternate"][hreflang="x-default"]').attr('href')).toBe(
      'https://m-rogozin.ru/en/',
    );
    expect($('meta[property="og:title"]').attr('content')).toBeTruthy();
    expect($('meta[property="og:description"]').attr('content')).toBeTruthy();
    expect($('meta[name="twitter:card"]').attr('content')).toBe('summary_large_image');
  });

  it.each(['en', 'ru'] as const)('publishes public-only Person JSON-LD on the %s homepage', (locale) => {
    const $ = documentAt(locale);
    const data = JSON.parse($('script[type="application/ld+json"]').text());

    expect(data['@type']).toBe('Person');
    expect(data.email).toBe('mailto:m@rogozin-pro.ru');
    expect(data.sameAs).toContain('https://www.linkedin.com/in/michael-rogozin/');
    expect(JSON.stringify(data)).not.toContain('Clover');
  });

  it('emits robots and sitemap files', () => {
    expect(readFileSync(join(root, 'dist', 'robots.txt'), 'utf8')).toContain('Sitemap:');
    expect(readFileSync(join(root, 'dist', 'sitemap-index.xml'), 'utf8')).toContain('sitemap-0.xml');
  });
});
