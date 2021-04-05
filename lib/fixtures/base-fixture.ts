import { folio as baseFolio } from "@playwright/test";
import { Page, BrowserContext, BrowserContextOptions } from "playwright";
import { doLogin } from "./auth";
import { RozetkaPage } from "../page-objects/rozetkaPage";
import { Login } from "../page-objects/login";


// Extend built-in fixtures and declare types for new fixtures
const builder = baseFolio.extend<
  { loggedInContext: BrowserContext; loggedInPage: Page; rozetkaObject: any; multiplePageFirst:any; multiplePageSecond:any },
  { loggedInState: any },
  { pageObjectInState: any }
>();
// Set default settings for all pages
builder.contextOptions.override(async ({ contextOptions }, runTest) => {
  const modifiedOptions: BrowserContextOptions = {
    ...contextOptions, // default
    geolocation: { latitude: 59.95, longitude: 30.31667 },
    acceptDownloads: true,
    colorScheme: "dark",
    javaScriptEnabled: true,
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,

    userAgent:
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36",
  };

  // browser.on("disconnected", async () => {
  //   console.log("BROWSER has been disconnected");
  // });
  await runTest(modifiedOptions);
});

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

// Create fixture with page-object
builder.rozetkaObject.init(async ({ context }, runTest) => {
  const page = await context.newPage();
  const rozetka = new RozetkaPage(page);
  // Pass the page-object to other fixtures/tests
  runTest(rozetka);
});


//Twice Page-object import  for multiple pages
builder.multiplePageFirst.init(async ({ context }, runTest) => {
  const page = await context.newPage();
  const login = new Login(page);
  runTest(login);
});

builder.multiplePageSecond.init(async ({ context }, runTest) => {
  const page = await context.newPage();
  const login = new Login(page);
  runTest(login);
});


export const folio = builder.build();
export const it = folio.it;
export const expect = folio.expect;
export const describe = folio.describe;
