import { folio as baseFolio } from "@playwright/test";
import { BrowserContextOptions } from "playwright";

const builder = baseFolio.extend();

builder.contextOptions.override(
  async ({ contextOptions, browser }, runTest) => {
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
  }
);

export const folio = builder.build();
