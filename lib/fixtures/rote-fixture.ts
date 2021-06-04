import { folio as base } from '@playwright/test';
import { BrowserContext } from 'playwright';

// Extend base fixtures with a new test-level fixture
const fixtures = base.extend<{ mockedContext: BrowserContext }>();

fixtures.mockedContext.init(async ({ context }, runTest) => {
  // Modify existing `context` fixture to add a route
  context.route(/.css/, route => route.abort());
  // Pass fixture to test functions
  runTest(context);
});

export const folio = fixtures.build();
