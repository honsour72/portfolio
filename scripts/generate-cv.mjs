import { createServer } from 'node:http';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createReadStream, existsSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

import { chromium } from '@playwright/test';

const root = process.cwd();
const distDirectory = join(root, 'dist');
const outputDirectory = join(root, 'public', 'files', 'cv');
const stablePdfDate = "D:20261008000000+00'00'";

if (!existsSync(join(distDirectory, 'cv', 'en', 'compact', 'index.html'))) {
  throw new Error('CV routes are missing from dist. Run `pnpm build` before generating PDFs.');
}

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

const server = createServer((request, response) => {
  const requestPath = decodeURIComponent(new URL(request.url ?? '/', 'http://127.0.0.1').pathname);
  const relativePath = requestPath.endsWith('/') ? `${requestPath}index.html` : requestPath;
  const filePath = normalize(join(distDirectory, relativePath));

  if (!filePath.startsWith(distDirectory) || !existsSync(filePath)) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }

  response.writeHead(200, { 'Content-Type': contentTypes[extname(filePath)] ?? 'application/octet-stream' });
  createReadStream(filePath).pipe(response);
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const address = server.address();
if (!address || typeof address === 'string') throw new Error('Unable to start the local CV server.');

await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });

try {
  const page = await browser.newPage();
  for (const locale of ['en', 'ru']) {
    for (const variant of ['compact', 'extended']) {
      await page.goto(`http://127.0.0.1:${address.port}/cv/${locale}/${variant}/`, {
        waitUntil: 'networkidle',
      });
      await page.pdf({
        path: join(outputDirectory, `mikhail-rogozin-cv-${locale}-${variant}.pdf`),
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
        displayHeaderFooter: false,
        tagged: true,
        outline: true,
      });

      const pdfPath = join(outputDirectory, `mikhail-rogozin-cv-${locale}-${variant}.pdf`);
      const pdf = await readFile(pdfPath);
      const normalised = Buffer.from(
        pdf.toString('latin1').replaceAll(/D:\d{14}\+00'00'/g, stablePdfDate),
        'latin1',
      );
      await writeFile(pdfPath, normalised);
    }
  }
} finally {
  await browser.close();
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
}

console.log('Generated four bilingual CV PDFs.');
