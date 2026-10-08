import { expect, test } from '@playwright/test';

const internalRoutes = [
  '/',
  '/en/',
  '/ru/',
  '/en/work/workforce-attrition/',
  '/en/work/scailium-observability/',
  '/ru/work/workforce-attrition/',
  '/ru/work/scailium-observability/',
  '/files/cv/mikhail-rogozin-cv-en-compact.pdf',
  '/files/cv/mikhail-rogozin-cv-en-extended.pdf',
  '/files/cv/mikhail-rogozin-cv-ru-compact.pdf',
  '/files/cv/mikhail-rogozin-cv-ru-extended.pdf',
  '/files/certificates/startup-hackathon-2021.pdf',
  '/files/certificates/leaders-of-digital-transformation-2023.pdf',
];

for (const route of internalRoutes) {
  test(`${route} returns a successful local response`, async ({ request }) => {
    const response = await request.get(route, { maxRedirects: 2 });
    expect(response.ok()).toBe(true);
  });
}

test('homepage includes the confirmed public destinations', async ({ page }) => {
  await page.goto('/en/');
  const hrefs = await page.locator('a').evaluateAll((links) =>
    links.map((link) => link.getAttribute('href')).filter(Boolean),
  );

  for (const expected of [
    'mailto:m@rogozin-pro.ru',
    'https://www.linkedin.com/in/michael-rogozin/',
    'https://t.me/honsour72',
    'https://t.me/it_helper_s',
    'https://habr.com/ru/users/honsour72/',
    'https://www.youtube.com/@ITHelpers170',
    'https://profi.ru/profile/RogozinMU/',
    'https://www.linkedin.com/in/evgeni-koifman-8a76141/',
    'https://www.linkedin.com/in/aviv-shemesh/',
  ]) {
    expect(hrefs).toContain(expected);
  }
});
