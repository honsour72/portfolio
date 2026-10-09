import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { load } from 'cheerio';
import { describe, expect, it } from 'vitest';

const root = process.cwd();

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
    expect($('link[rel="icon"]').attr('href')).toBe('/favicon.ico');
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

  it('publishes the original site favicon', () => {
    const faviconPath = join(root, 'dist', 'favicon.ico');

    expect(existsSync(faviconPath)).toBe(true);
    expect(createHash('sha256').update(readFileSync(faviconPath)).digest('hex')).toBe(
      'ecbc2730414377749fca66c3d88af69924cdeeb4b3cc55093174d9c78aa0f4c1',
    );
  });
});
