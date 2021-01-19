const { SearchPage } = require("../lib/page-objects/Search");
import { it, expect } from "@playwright/test";
const searchPage = new SearchPage();

import { followToPage } from "../lib/helpers";
// In the test

it("search", async ({ page }) => {
  const searchPage = new SearchPage(page);
  await searchPage.navigate();
  await searchPage.search("search query");
});
