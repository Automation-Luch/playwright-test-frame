import { folio as baseFolio } from "@playwright/test";
import { Page, BrowserContext, BrowserContextOptions } from "playwright";
import { Login } from "../page-objects/authentication";


// Extend built-in fixtures and declare types for new fixtures
const builder = baseFolio.extend<
  { loggedInContext: BrowserContext; loggedInPage: Page; AltyAuthObject: any; multiplePageSecond:any },
  { AltyObject: any }
>();
// Set default settings for all pages
builder.contextOptions.override(async ({ contextOptions }, runTest) => {
  const modifiedOptions: BrowserContextOptions = {
    ...contextOptions, // default
    geolocation: { latitude: 59.95, longitude: 30.31667 },
    acceptDownloads: true,
    colorScheme: "dark",
    javaScriptEnabled: true,
    viewport: { width: 1420, height: 740 },
    ignoreHTTPSErrors: true,

    userAgent:
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36",
  };

  // browser.on("disconnected", async () => {
  //   console.log("BROWSER has been disconnected");
  // });
  await runTest(modifiedOptions);
});


// Create fixture with page-object for authentication tests
builder.AltyAuthObject.init(async ({ context }, runTest) => {
  const page = await context.newPage();
  const rozetka = new Login(page);
  // Pass the page-object to other fixtures/tests
  runTest(rozetka);
});




export const folio = builder.build();
export const it = folio.it;
export const expect = folio.expect;
export const describe = folio.describe;
