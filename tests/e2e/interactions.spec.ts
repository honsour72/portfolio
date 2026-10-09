import { expect, test } from '@playwright/test';

test('certificate viewer supports keyboard close and focus restoration', async ({ page }) => {
  await page.goto('/en/#awards');
  const opener = page.getByRole('button', { name: 'View certificate' }).first();
  await opener.click();

  const dialog = page.getByRole('dialog', { name: /certificate/i });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
});

test('certificate viewer closes on the backdrop and preserves a direct PDF download', async ({ page }) => {
  await page.goto('/en/#awards');
  await page.getByRole('button', { name: 'View certificate' }).first().click();
  const dialog = page.getByRole('dialog', { name: /certificate/i });

  await expect(dialog.getByRole('link', { name: 'Download original PDF' })).toHaveAttribute(
    'href',
    '/files/certificates/startup-hackathon-2021.pdf',
  );
  await dialog.click({ position: { x: 5, y: 5 } });
  await expect(dialog).toBeHidden();
});

test('certificate thumbnail opens the viewer while preserving its fallback image link', async ({ page }) => {
  await page.goto('/en/#awards');
  const thumbnail = page.locator('.certificate-thumbnail').first();

  await expect(thumbnail).toHaveAttribute('href', '/images/certificates/startup-hackathon-2021.png');
  await thumbnail.click();
  await expect(page.getByRole('dialog', { name: /startup hackathon 2021 certificate/i })).toBeVisible();
});

test('CV menu exposes locale-matched downloads', async ({ page }) => {
  await page.goto('/ru/');
  await page.locator('[data-cv-menu] summary').click();
  await expect(page.getByRole('link', { name: 'Краткое резюме, 1 страница' }).first()).toHaveAttribute(
    'href',
    '/files/cv/mikhail-rogozin-cv-ru-compact.pdf',
  );
  await expect(page.getByRole('link', { name: 'Расширенное резюме, 2 страницы' }).first()).toHaveAttribute(
    'href',
    '/files/cv/mikhail-rogozin-cv-ru-extended.pdf',
  );
});

test('mobile navigation exposes the main sections', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/en/');
  await page.locator('.mobile-navigation summary').click();
  await expect(page.getByRole('link', { name: 'Experience', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Contact', exact: true })).toBeVisible();
});

test('downloads and locale navigation remain available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/en/');

  await page.locator('[data-cv-menu] summary').click();
  await expect(page.locator('a[href="/files/cv/mikhail-rogozin-cv-en-compact.pdf"]').first()).toBeVisible();
  await expect(page.locator('a[href="/files/certificates/startup-hackathon-2021.pdf"]').first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'RU', exact: true })).toBeVisible();
  await context.close();
});
