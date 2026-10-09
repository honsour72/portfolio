import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { load } from 'cheerio';
import { describe, expect, it } from 'vitest';

import { casesByLocale, caseSlugs } from '../src/content/cases';

const root = process.cwd();

describe.each(['en', 'ru'] as const)('%s case studies', (locale) => {
  for (const slug of caseSlugs) {
    it(`renders the complete ${slug} case with a public-safe diagram`, () => {
      const data = casesByLocale[locale][slug];
      const html = readFileSync(join(root, 'dist', locale, 'work', slug, 'index.html'), 'utf8');
      const $ = load(html);
      const text = $('body').text();

      expect($('h1').text()).toContain(data.title);
      expect($('[data-case-detail]').length).toBe(data.details.length);
      expect($('[data-case-section]').length).toBe(data.sections.length);
      expect($('[data-architecture-diagram]').attr('data-variant')).toBe(data.diagram.variant);

      const company = data.details.find((detail) =>
        detail.label.toLowerCase().includes(locale === 'en' ? 'company' : 'компания'),
      );
      expect(company?.href).toBeTruthy();
      expect($(`.case-details a[href="${company?.href}"]`).text()).toBe(company?.value);

      for (const label of data.diagram.labels) {
        expect(text).toContain(label);
      }

      expect(text).toContain(data.adjacent.title);
      expect($(`a[href="${data.adjacent.href}"]`).length).toBe(1);
      expect(text).toContain(data.details.find((detail) => detail.label.toLowerCase().includes(locale === 'en' ? 'contribution' : 'вклад'))?.value ?? '');

      for (const forbidden of ['Clover', 'GraphQL', 'Hexagonal Architecture', 'formal on-call']) {
        expect(html).not.toContain(forbidden);
      }
    });
  }
});
