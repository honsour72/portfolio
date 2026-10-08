import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
  '/en/',
  '/ru/',
  '/en/work/workforce-attrition/',
  '/en/work/scailium-observability/',
  '/ru/work/workforce-attrition/',
  '/ru/work/scailium-observability/',
];

for (const route of routes) {
  test(`${route} has no WCAG A/AA axe violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test('homepage uses one h1, ordered headings and semantic landmarks', async ({ page }) => {
  await page.goto('/en/');
  expect(await page.locator('h1').count()).toBe(1);
  await expect(page.locator('header')).toHaveCount(1);
  await expect(page.locator('main')).toHaveCount(1);
  await expect(page.locator('footer')).toHaveCount(1);

  const levels = await page.locator('h1, h2, h3').evaluateAll((headings) =>
    headings.map((heading) => Number(heading.tagName.slice(1))),
  );
  for (let index = 1; index < levels.length; index += 1) {
    expect(levels[index] - levels[index - 1]).toBeLessThanOrEqual(1);
  }
});

test('keyboard focus is visible and mobile navigation opens without a pointer', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/en/');
  await page.keyboard.press('Tab');

  const focused = page.locator(':focus');
  await expect(focused).toHaveClass(/skip-link/);
  expect(await focused.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe('none');

  const menu = page.locator('.mobile-navigation summary');
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('link', { name: 'Experience', exact: true })).toBeVisible();
});

test('reduced-motion preference removes smooth scrolling and long transitions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/en/');
  const styles = await page.locator('html').evaluate((element) => {
    const computed = getComputedStyle(element);
    return { scrollBehavior: computed.scrollBehavior, transitionDuration: computed.transitionDuration };
  });

  expect(styles.scrollBehavior).toBe('auto');
  expect(Number.parseFloat(styles.transitionDuration)).toBeLessThanOrEqual(0.00001);
});
