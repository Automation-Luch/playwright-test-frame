import { it, expect, describe, beforeAll, afterAll } from "@playwright/test";
import { LOGIN, PASSWORD } from "../lib/credentials";
import * as mainPage from "../lib/page-objects/mainPage";
import * as loginPage from "../lib/page-objects/loginPage";

import {
  click,
  typeText,
  followToPage,
  shouldExist,
  uploadFiles,
  initBrowserAndPage,
} from "../lib/helpers";
let page;
describe("database", () => {
  beforeAll(async ({ browser }) => {
    const data = await initBrowserAndPage({ browser });
    page = data.page;
  });

  afterAll(async ({ browser }) => {
    await browser.close();
  });

  it("Go to the ROZETKA main page, check search field and title", async () => {
    await followToPage(mainPage.URL, page);
    await shouldExist(mainPage.SEARCH_BUTTON, page);
    const title = await page.title();
    expect(title).toContain("ROZETKA");
  });
  it("FillLoginForm", async () => {
    await followToPage(mainPage.URL, page);
    await click(mainPage.LOGIN_LINK, page);
    await typeText(loginPage.USERNAME_FIELD, LOGIN, page);
    await typeText(loginPage.PASSWORD_FIELD, PASSWORD, page);
    await click(loginPage.LOGIN_BUTTON, page);
  });

  it("Check for upload file", async () => {
    await followToPage("https://dropmefiles.com.ua/", page);
    expect(await page.title()).toContain("файлообменник");
    await uploadFiles('input[type="file"]', "lib/docs/doc.docx", page);
    await shouldExist('[class="removeFile"]', page);
  });

  it("Check Snapshot making", async ({ browserName }) => {
    await page.goto("https://stackoverflow.com");
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchSnapshot(`test-${browserName}.png`, {
      threshold: 0.2,
    });
  });
});
