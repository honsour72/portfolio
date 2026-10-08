import { expect, test } from '@playwright/test';

for (const slug of ['workforce-attrition', 'scailium-observability']) {
  test(`${slug} language switch preserves the case route`, async ({ page }) => {
    await page.goto(`/en/work/${slug}/`);
    await page.getByRole('link', { name: 'RU', exact: true }).click();
    await expect(page).toHaveURL(`/ru/work/${slug}/`);

    await page.getByRole('link', { name: 'EN', exact: true }).click();
    await expect(page).toHaveURL(`/en/work/${slug}/`);
  });
}
