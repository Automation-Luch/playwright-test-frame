// In tests/feature.spec.ts
import { it, expect } from "../lib/fixtures/login-with-cookies";
import {
  click,
  typeText,
  followToPage,
  shouldExist,
  uploadFiles,
  screenshotMatching,
  waitForRequestInclude,
  clearAndTypeText,
  waitForValue,
  waitForResponseInclude,
  clickIfElementDoesNotDisappears,
} from "../lib/helpers";

it("should be logged in", async ({ loggedInPage }) => {
  await loggedInPage.goto("https://app.pagescreen.io/login", {
    waitUntil: "networkidle",
  });
  await shouldExist('[id="dashboard-onboarding"]', loggedInPage);
});
