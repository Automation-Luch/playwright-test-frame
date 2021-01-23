import { it, describe, expect } from "../lib/fixtures/base-fixture";
import { rozetka } from "../lib/credentials";
import { followToPage, getText } from "../lib/helpers";
import { PLAYWRIGHT_SITE } from "../lib/text-helpers";

describe("Check that the page-object work through the fixture", () => {
  it("Login in to Rozetka with fixture", async ({ loggedInPages }) => {
    await loggedInPages.navigate(rozetka.URL);
    await loggedInPages.loginToRozetka(rozetka.LOGIN, rozetka.PASSWORD);
  });
  it("Open Kids section", async ({ loggedInPages }) => {
    await loggedInPages.navigate(rozetka.URL);
    await loggedInPages.openKidsSection();
  });

  it("Make sure the other page works", async ({ page }) => {
    await followToPage(PLAYWRIGHT_SITE, page);
    const title = await getText(".navbar__title", page);
    expect(title).toBe("Playwright");
  });
});
