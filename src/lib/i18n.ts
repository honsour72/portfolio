import type { Locale } from './types';

export const locales = ['en', 'ru'] as const satisfies readonly Locale[];
export const defaultLocale: Locale = 'en';

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function alternatePath(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return `/${targetLocale}/`;
  }

  if (isLocale(segments[0])) {
    segments[0] = targetLocale;
  } else {
    segments.unshift(targetLocale);
  }

  return `/${segments.join('/')}/`;
}

export function cvLinksForLocale(locale: Locale): {
  compact: string;
  extended: string;
} {
  return {
    compact: `/files/cv/mikhail-rogozin-cv-${locale}-compact.pdf`,
    extended: `/files/cv/mikhail-rogozin-cv-${locale}-extended.pdf`,
  };
}
