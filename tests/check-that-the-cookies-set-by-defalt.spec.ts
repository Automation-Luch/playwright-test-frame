import { it, describe } from "../lib/fixtures/base-fixture";
import { followToPage, shouldExist } from "../lib/helpers";
import { PAGESCREEN_SITE } from "../lib/text-helpers";

describe("Check that the cookies are set by default for all it", () => {
  it("should be logged in", async ({ loggedInPage }) => {
    await followToPage(PAGESCREEN_SITE, loggedInPage, "load");
    await shouldExist('[id="dashboard-onboarding"]', loggedInPage);
  });
  it("Check that the My Account page is open", async ({ loggedInPage }) => {
    await followToPage(`${PAGESCREEN_SITE}/account`, loggedInPage, "load");
    await shouldExist('text="Firstname"', loggedInPage);
  });
});
