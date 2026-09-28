import { defineConfig, devices } from '@playwright/test';

const outputDir = './test-results/';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,

  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
    ['json', { outputFile: 'test-results/test-results.json' }]
  ],

  outputDir: outputDir,
  timeout: 60000,

  expect: {
    timeout: 10000,
  },

  use: {
    baseURL: 'http://qainterview.pythonanywhere.com',
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'on',
    headless: true,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'safari',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
});
