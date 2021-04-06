import { folio } from "../lib/fixtures/base-fixture";
const { it, describe, afterAll } = folio;
import { followToPage, shouldExist } from "../lib/helpers/helpers";
import { urls } from "../lib/helpers/text-helpers";

describe("Check that the cookies are set by default for all it", () => {
  afterAll(async function ({ browser }) {
    await browser.close();
  });
  it("should be logged in", async ({ loggedInContext }) => {
    await followToPage(urls.PAGESCREEN_SITE, loggedInContext, "load");
    await shouldExist('[id="dashboard-onboarding"]', loggedInContext);
  });
  it("Check that the My Account page is open", async ({ loggedInContext }) => {
    await followToPage(`${urls.PAGESCREEN_SITE}/account`, loggedInContext, "load");
    await shouldExist('text="Firstname"', loggedInContext);
  });
});
