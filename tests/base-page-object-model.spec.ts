import { it, describe } from "../lib/fixtures/base-fixture";
import { rozetka } from "../lib/helpers/credentials";

import { RozetkaPage } from "../lib/page-objects/rozetkaPage";

import { followToPage } from "../lib/helpers/helpers";

describe("Tests on the Rozetka", () => {
  it("Try to open kids product section", async ({ page }) => {
    const roz = new RozetkaPage(page);
    await followToPage(rozetka.URL, page);
    await roz.openKidsSection();
  });

  it("Fill Rozetka login form", async ({ page }) => {
    const roz = new RozetkaPage(page);
    await followToPage(rozetka.URL, page);
    await roz.loginToRozetka(rozetka.LOGIN, rozetka.PASSWORD);
  });
});
