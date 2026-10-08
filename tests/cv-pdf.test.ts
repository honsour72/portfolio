import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { describe, expect, it } from 'vitest';

const root = process.cwd();

for (const locale of ['en', 'ru'] as const) {
  for (const variant of ['compact', 'extended'] as const) {
    const filename = `mikhail-rogozin-cv-${locale}-${variant}.pdf`;
    const path = join(root, 'public', 'files', 'cv', filename);

    describe(filename, () => {
      it('exists with the exact page count and selectable identity text', async () => {
        expect(existsSync(path)).toBe(true);
        const pdfBytes = readFileSync(path);
        const pdfSource = pdfBytes.toString('latin1');
        expect(pdfSource).toContain("/CreationDate (D:20261008000000+00'00')");
        expect(pdfSource).toContain("/ModDate (D:20261008000000+00'00')");

        const pdf = await getDocument({ data: new Uint8Array(pdfBytes) }).promise;
        expect(pdf.numPages).toBe(variant === 'compact' ? 1 : 2);

        let text = '';
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          const page = await pdf.getPage(pageNumber);
          const content = await page.getTextContent();
          text += content.items.map((item) => ('str' in item ? item.str : '')).join(' ');
        }

        const normalisedText = text.replace(/\s+/g, ' ');
        expect(normalisedText).toContain(locale === 'en' ? 'Mikhail Rogozin' : 'Михаил Рогозин');
        expect(normalisedText).toContain('m@rogozin-pro.ru');
      });
    });
  }
}
