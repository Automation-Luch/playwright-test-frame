import { it, expect, describe, afterAll, afterEach } from "./fixtures";

// import { beforeAll, afterAll } from "@playwright/test";
import { LOGIN, PASSWORD } from "../lib/credentials";
import * as mainPage from "../lib/page-objects/mainPage";
import * as loginPage from "../lib/page-objects/loginPage";
import * as uploadPage from "../lib/page-objects/uploadPage";
import {
  BASE_WORD,
  SEARCH_INPUT,
  GOOGLE_URL,
} from "../lib/page-objects/googlePage";

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
} from "../lib/helpers";

describe("Tests on the Rozetka", () => {
  afterAll(async ({ browser }) => {});
  afterEach(async function ({ testInfo }) {});

  it("Try to open kids product section", async ({ page }) => {
    await followToPage(mainPage.URL, page, "load");
    await page.hover(mainPage.KIDS_SECTION);
    await page.hover(mainPage.KIDS_GAMES_SECTION);
    await click(mainPage.KIDS_GAMES_SECTION, page);
    await waitForRequestInclude("nastoljnye-igry-i-golovolomki", page);
  });

  it("Fill Rozetka login form", async ({ page }) => {
    await followToPage(mainPage.URL, page, "load");
    await click(mainPage.LOGIN_LINK, page);
    await typeText(loginPage.USERNAME_FIELD, LOGIN, page);
    await typeText(loginPage.PASSWORD_FIELD, PASSWORD, page);
    await click(loginPage.LOGIN_BUTTON, page);
    await shouldExist(loginPage.PERSONAL_SECTION, page);
  });
});

describe("Check helpers", () => {
  afterAll(async ({ browser }) => {
    await browser.close();
  });
  afterEach(async function ({ testInfo }) {});

  it("The 'Clear and type' function check", async ({ page }) => {
    await followToPage(GOOGLE_URL, page);
    await typeText(SEARCH_INPUT, "chicken", page);
    await clearAndTypeText(SEARCH_INPUT, BASE_WORD, page);
    await page.keyboard.press("Enter");
    await waitForValue(SEARCH_INPUT, BASE_WORD, page);
    await waitForResponseInclude(BASE_WORD, page);
  });

  it("Check for upload file", async ({ page }) => {
    await followToPage("https://dropmefiles.com.ua/", page, "load");
    await uploadFiles(
      uploadPage.UPLOAD_FILE_FIELD,
      uploadPage.FILE_LOCATION,
      page
    );
    await shouldExist(uploadPage.REMOVE_BUTTON, page);
  });

  it("Check Snapshot making", async ({ browserName, page }) => {
    await followToPage("https://example.com/", page);
    await screenshotMatching(browserName, page);
  });
});
