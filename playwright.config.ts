// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';
const config: PlaywrightTestConfig = {
  // Put any shared options on the top level.

  use: {
    // Browser options
    headless: false,
    // slowMo: 50,
    timeout: 50000,
    // Context options
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,

    // Artifacts
  },

  projects: [
    {
      name: 'Chromium',
      retries: 0,
      timeout: 50000,
      use: {
        // Configure the browser to use.
        browserName: 'chromium',

        // Any Chromium-specific options.
        viewport: { width: 1920, height: 1080 },
        screenshot: 'only-on-failure',
      },
    },

    // {
    //   name: 'Firefox',
    //   use: { browserName: 'firefox' },
    // },

    // {
    //   name: 'WebKit',
    //   use: { browserName: 'webkit' },
    // },
  ],
  screenshot: 'only-on-failure',
  video: 'retry-with-video',
};
export default config;
