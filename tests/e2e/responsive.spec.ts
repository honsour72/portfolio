import { expect, test } from '@playwright/test';

const routes = [
  '/',
  '/en/',
  '/ru/',
  '/en/work/workforce-attrition/',
  '/en/work/scailium-observability/',
  '/ru/work/workforce-attrition/',
  '/ru/work/scailium-observability/',
];

for (const width of [320, 360, 375, 390, 414, 600, 768, 820, 980, 1024, 1440]) {
  for (const route of routes) {
    test(`${route} has no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width <= 414 ? 812 : 1000 });
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

for (const width of [320, 375, 414, 600]) {
  test(`certificate viewers keep their contents inside the viewport at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 812 });
    await page.goto('/en/#awards');

    const openers = page.getByRole('button', { name: 'View certificate' });
    for (let index = 0; index < await openers.count(); index += 1) {
      await openers.nth(index).click();
      const dialog = page.locator('.certificate-dialog[open]');
      const bounds = await dialog.evaluate((element) => {
        const panel = element.querySelector<HTMLElement>('.certificate-dialog-panel');
        const bar = element.querySelector<HTMLElement>('.certificate-dialog-bar');
        const image = element.querySelector<HTMLImageElement>('img');
        const download = element.querySelector<HTMLElement>('.button');
        if (!panel || !bar || !image || !download) throw new Error('Incomplete certificate viewer');

        const rect = (target: HTMLElement) => {
          const value = target.getBoundingClientRect();
          return { top: value.top, bottom: value.bottom, left: value.left, right: value.right };
        };

        return {
          viewport: { width: window.innerWidth, height: window.innerHeight },
          panel: rect(panel),
          bar: rect(bar),
          image: rect(image),
          download: rect(download),
          panelScrollHeight: panel.scrollHeight,
          panelClientHeight: panel.clientHeight,
        };
      });

      expect(bounds.panel.left).toBeGreaterThanOrEqual(0);
      expect(bounds.panel.right).toBeLessThanOrEqual(bounds.viewport.width);
      expect(bounds.panel.top).toBeGreaterThanOrEqual(0);
      expect(bounds.panel.bottom).toBeLessThanOrEqual(bounds.viewport.height);
      expect(bounds.image.top).toBeGreaterThanOrEqual(bounds.bar.bottom);
      expect(bounds.image.bottom).toBeLessThanOrEqual(bounds.download.top);
      expect(bounds.download.bottom).toBeLessThanOrEqual(bounds.panel.bottom);
      expect(bounds.panelScrollHeight).toBeLessThanOrEqual(bounds.panelClientHeight + 1);

      await dialog.locator('[data-certificate-close]').click();
    }
  });
}

test('certificate previews keep their portrait orientation on narrow screens', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 812 });
  await page.goto('/en/#awards');

  const previews = page.locator('.certificate-thumbnail img');
  for (let index = 0; index < await previews.count(); index += 1) {
    const bounds = await previews.nth(index).boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.height).toBeGreaterThan(bounds!.width);
  }
});

test('CV menu fits the narrowest supported viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 812 });
  await page.goto('/en/');
  await page.locator('[data-cv-menu] summary').click();
  await expect(page.locator('.cv-menu-panel')).toBeInViewport();
});

for (const width of [320, 600, 768, 820, 980]) {
  test(`decorative case visuals are removed from the stacked layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('.work-visual').first()).toBeHidden();
    await expect(page.locator('.work-visual').last()).toBeHidden();
  });
}

test('decorative case visuals remain in the desktop split layout', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto('/');
  await expect(page.locator('.work-visual').first()).toBeVisible();
  await expect(page.locator('.work-visual').last()).toBeVisible();
});

test('section numbers sit above narrow-screen headings', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 812 });
  await page.goto('/ru/');

  for (const selector of ['#work', '#teaching', '#recommendations']) {
    const heading = page.locator(`${selector} .section-heading`).first();
    const numberBounds = await heading.locator('.section-number').boundingBox();
    const titleBounds = await heading.locator('h2').boundingBox();
    expect(numberBounds).not.toBeNull();
    expect(titleBounds).not.toBeNull();
    expect(numberBounds!.y + numberBounds!.height).toBeLessThanOrEqual(titleBounds!.y);
  }
});

test('hero actions stack on the narrowest supported viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 812 });
  await page.goto('/');

  const actions = page.locator('.hero-actions .button');
  const first = await actions.nth(0).boundingBox();
  const second = await actions.nth(1).boundingBox();
  expect(first).not.toBeNull();
  expect(second).not.toBeNull();
  expect(first!.y + first!.height).toBeLessThanOrEqual(second!.y);
  expect(first!.width).toBeCloseTo(second!.width, 0);
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
