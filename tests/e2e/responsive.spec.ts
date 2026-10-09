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

for (const width of [320, 360, 375, 390, 414, 600]) {
  test(`mobile navigation panel spans the viewport safely at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.locator('.mobile-navigation summary').click();

    const bounds = await page.locator('.mobile-navigation nav').evaluate((element) => {
      const panel = element.getBoundingClientRect();
      const header = document.querySelector('.site-header')?.getBoundingClientRect();

      return {
        left: panel.left,
        right: panel.right,
        top: panel.top,
        headerBottom: header?.bottom,
        viewportWidth: document.documentElement.clientWidth,
      };
    });

    expect(bounds.left).toBeCloseTo(16, 0);
    expect(bounds.right).toBeCloseTo(bounds.viewportWidth - 16, 0);
    expect(bounds.top).toBeGreaterThanOrEqual(bounds.headerBottom ?? 0);
  });
}

for (const width of [768, 820, 980]) {
  test(`tablet navigation remains available and contained at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1100 });
    await page.goto('/');

    const menu = page.locator('.mobile-navigation summary');
    await expect(menu).toBeVisible();
    await menu.click();

    const bounds = await page.locator('.mobile-navigation nav').evaluate((element) => {
      const panel = element.getBoundingClientRect();
      return {
        left: panel.left,
        right: panel.right,
        viewportWidth: document.documentElement.clientWidth,
      };
    });

    expect(bounds.left).toBeGreaterThanOrEqual(16);
    expect(bounds.right).toBeLessThanOrEqual(bounds.viewportWidth - 16);
  });
}

test('desktop navigation replaces the menu above the tablet breakpoint', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto('/');

  await expect(page.locator('.mobile-navigation summary')).toBeHidden();
  await expect(page.locator('.primary-nav')).toBeVisible();
});
