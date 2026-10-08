import { describe, expect, it } from 'vitest';

import { casesByLocale, evidence } from '../src/content/cases';
import { cvByLocale } from '../src/content/cv';
import { externalLinks, portfolioByLocale } from '../src/content/portfolio';

describe('portfolio content contracts', () => {
  it('uses the confirmed identity and contact links', () => {
    expect(portfolioByLocale.en.hero.name).toBe('Mikhail Rogozin');
    expect(portfolioByLocale.ru.hero.name).toBe('Михаил Рогозин');
    expect(portfolioByLocale.en.hero.role).toBe('Senior Backend Engineer · Python & Go');
    expect(externalLinks).toEqual({
      email: 'mailto:m@rogozin-pro.ru',
      linkedin: 'https://www.linkedin.com/in/michael-rogozin/',
      telegram: 'https://t.me/honsour72',
      telegramChannel: 'https://t.me/it_helper_s',
      habr: 'https://habr.com/ru/users/honsour72/',
      github: 'https://github.com/honsour72',
      youtube: 'https://www.youtube.com/@ITHelpers170',
      profi: 'https://profi.ru/profile/RogozinMU/',
      evgeniKoifman: 'https://www.linkedin.com/in/evgeni-koifman-8a76141/',
      avivShemesh: 'https://www.linkedin.com/in/aviv-shemesh/',
    });
  });

  it('keeps stable evidence values independent from translation', () => {
    expect(evidence).toEqual({
      experienceYears: 6,
      articleCount: 3,
      combinedArticleViews: 325_000,
      featuredArticleViews: 275_000,
      scailiumEngineers: 500,
      scailiumCompanies: 20,
      scailiumRating: 8.7,
      scailiumInvestigationMinutes: 60,
      scailiumAutomatedScenarios: 300,
      scailiumCoveragePercent: 69,
      profiRating: 4.67,
      profiReviewCount: 27,
      itmoStudents: 80,
    });
  });

  it('contains only the two approved public case studies', () => {
    expect(Object.keys(casesByLocale.en)).toEqual([
      'workforce-attrition',
      'scailium-observability',
    ]);
    expect(Object.keys(casesByLocale.ru)).toEqual([
      'workforce-attrition',
      'scailium-observability',
    ]);
  });

  it('excludes forbidden public claims and internal names', () => {
    const publicContent = JSON.stringify({ portfolioByLocale, casesByLocale, cvByLocale });
    const forbiddenTerms = [
      'intern workforce',
      'Clover',
      'GraphQL',
      'Hexagonal Architecture',
      'PostgreSQL replication',
      'PostgreSQL partitioning',
      'formal on-call',
      'Real systems. Measurable impact.',
    ];

    for (const term of forbiddenTerms) {
      expect(publicContent).not.toContain(term);
    }
  });

  it('keeps CV identity and language aligned', () => {
    expect(cvByLocale.en.locale).toBe('en');
    expect(cvByLocale.en.name).toBe('Mikhail Rogozin');
    expect(cvByLocale.ru.locale).toBe('ru');
    expect(cvByLocale.ru.name).toBe('Михаил Рогозин');
    expect(cvByLocale.en.email).toBe('m@rogozin-pro.ru');
    expect(cvByLocale.ru.email).toBe('m@rogozin-pro.ru');
  });
});
