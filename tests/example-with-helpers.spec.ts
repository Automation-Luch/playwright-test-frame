import { folio } from "../lib/fixtures/base-fixture";
const { it, describe, afterAll } = folio;

import * as text from "../lib/text-helpers";

import * as uploadPage from "../lib/page-objects/uploadPage";
import {
  BASE_WORD,
  SEARCH_INPUT,
  GOOGLE_URL,
} from "../lib/page-objects/googlePage";

import {
  typeText,
  followToPage,
  shouldExist,
  uploadFiles,
  screenshotMatching,
  clearAndTypeText,
  waitForValue,
  waitForResponseInclude,
} from "../lib/helpers";

describe("Check helpers", () => {
  afterAll(async function ({ browser }) {
    await browser.close();
  });

  it("The 'Clear and type' function check", async ({ page }) => {
    await followToPage(GOOGLE_URL, page);
    await typeText(SEARCH_INPUT, "chicken", page);
    await clearAndTypeText(SEARCH_INPUT, BASE_WORD, page);
    await page.keyboard.press("Enter");
    await waitForValue(SEARCH_INPUT, BASE_WORD, page);
    await waitForResponseInclude(BASE_WORD, page);
  });

  it("Check for upload file", async ({ page }) => {
    await followToPage(text.DROPFILES_SITE, page, "load");
    await uploadFiles(
      uploadPage.UPLOAD_FILE_FIELD,
      uploadPage.FILE_LOCATION,
      page
    );
    await shouldExist(uploadPage.REMOVE_BUTTON, page);
  });

  it("Check Snapshot making", async ({ browserName, page }) => {
    await followToPage(text.EXAMPLE_SITE, page);
    await screenshotMatching(browserName, page);
  });
});
