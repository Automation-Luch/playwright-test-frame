import { folio } from "../lib/fixtures/base-fixture";
const { it, describe, expect, afterAll } = folio;
import { followToPage, shouldExist } from "../lib/helpers/helpers";
import { PAGESCREEN_SITE } from "../lib/helpers/text-helpers";

describe("Check that the cookies are set by default for all it", () => {
  afterAll(async function ({ browser }) {
    await browser.close();
  });
  it("should be logged in", async ({ loggedInPage }) => {
    await followToPage(PAGESCREEN_SITE, loggedInPage, "load");
    await shouldExist('[id="dashboard-onboarding"]', loggedInPage);
  });
  it("Check that the My Account page is open", async ({ loggedInPage }) => {
    await followToPage(`${PAGESCREEN_SITE}/account`, loggedInPage, "load");
    await shouldExist('text="Firstname"', loggedInPage);
  });
});
