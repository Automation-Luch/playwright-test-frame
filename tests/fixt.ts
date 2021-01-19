// In tests/fixtures.ts
import { folio as baseFolio } from "@playwright/test";
import { Page, BrowserContext } from "playwright";
import { doLogin } from "../lib/auth";
// Extend built-in fixtures and declare types for new fixtures
const builder = baseFolio.extend<
  { loggedInContext: BrowserContext; loggedInPage: Page },
  { loggedInState: any }
>();

// Create a fixture which is executed only once per worker
builder.loggedInState.init(
  async ({ browser }, runTest) => {
    // Use the built-in browser fixture
    const page = await browser.newPage();
    await doLogin(page);

    // Extract cookies after successful login
    const cookies = await page.context().cookies();
    const state = { cookies };

    // Pass this state to other fixtures/tests that depend on loggedInState
    runTest(state);

    // Define fixture scope to worker
  },
  { scope: "worker" }
);

// Create fixture for logged in browser context
builder.loggedInContext.init(async ({ context, loggedInState }, runTest) => {
  // Load the state in the context
  const { cookies } = loggedInState;
  await context.addCookies(cookies);
  // Pass the modified context to other fixtures/tests that depend on loggedInContext
  runTest(context);
});

// Create fixture for logged in page
builder.loggedInPage.init(async ({ loggedInContext }, runTest) => {
  const page = await loggedInContext.newPage();

  // Pass the page to other fixtures/tests that depend on loggedInPage
  runTest(page);
});

const folio = builder.build();
export const it = folio.it;
export const expect = folio.expect;
