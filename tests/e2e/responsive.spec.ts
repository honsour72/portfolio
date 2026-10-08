import { expect, test } from '@playwright/test';

const routes = [
  '/en/',
  '/en/work/workforce-attrition/',
  '/en/work/scailium-observability/',
];

for (const width of [375, 768, 1440]) {
  for (const route of routes) {
    test(`${route} has no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width === 375 ? 812 : 1000 });
      await page.goto(route);
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }));
      expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
      await expect(page.locator('h1')).toBeVisible();
    });
  }
}

test('mobile certificate viewer and CV menu fit the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/en/');
  await page.locator('[data-cv-menu] summary').click();
  await expect(page.locator('.cv-menu-panel')).toBeInViewport();

  await page.getByRole('button', { name: 'View certificate' }).first().click();
  await expect(page.getByRole('dialog', { name: /certificate/i })).toBeInViewport();
});
