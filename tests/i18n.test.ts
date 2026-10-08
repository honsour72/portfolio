import { describe, expect, it } from 'vitest';

import {
  alternatePath,
  cvLinksForLocale,
  defaultLocale,
  isLocale,
  locales,
} from '../src/lib/i18n';
import { caseRoutes, caseSlugs } from '../src/content/cases';

describe('locale routing', () => {
  it('supports exactly English and Russian with English as the default', () => {
    expect(locales).toEqual(['en', 'ru']);
    expect(defaultLocale).toBe('en');
    expect(isLocale('en')).toBe(true);
    expect(isLocale('ru')).toBe(true);
    expect(isLocale('de')).toBe(false);
  });

  it('maps home and case routes to the equivalent locale', () => {
    expect(alternatePath('/en/', 'ru')).toBe('/ru/');
    expect(alternatePath('/ru/work/workforce-attrition/', 'en')).toBe(
      '/en/work/workforce-attrition/',
    );
    expect(alternatePath('/en/work/scailium-observability/', 'ru')).toBe(
      '/ru/work/scailium-observability/',
    );
  });

  it('returns locale-matched compact and extended CV downloads', () => {
    expect(cvLinksForLocale('en')).toEqual({
      compact: '/files/cv/mikhail-rogozin-cv-en-compact.pdf',
      extended: '/files/cv/mikhail-rogozin-cv-en-extended.pdf',
    });
    expect(cvLinksForLocale('ru')).toEqual({
      compact: '/files/cv/mikhail-rogozin-cv-ru-compact.pdf',
      extended: '/files/cv/mikhail-rogozin-cv-ru-extended.pdf',
    });
  });

  it('enumerates both cases in both languages', () => {
    expect(caseSlugs).toEqual(['workforce-attrition', 'scailium-observability']);
    expect(caseRoutes).toEqual([
      '/en/work/workforce-attrition/',
      '/en/work/scailium-observability/',
      '/ru/work/workforce-attrition/',
      '/ru/work/scailium-observability/',
    ]);
  });
});
