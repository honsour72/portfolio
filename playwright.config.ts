import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  retries: 0,
  reporter: 'line',
  use: {
    baseURL: 'http://127.0.0.1:4321',
    browserName: 'chromium',
    channel: 'chrome',
    headless: true,
    viewport: { width: 1440, height: 1000 },
  },
  webServer: {
    command: 'pnpm dev --host 127.0.0.1 --ignore-lock',
    url: 'http://127.0.0.1:4321/en/',
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
