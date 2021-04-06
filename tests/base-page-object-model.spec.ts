import { folio } from "../lib/fixtures/base-fixture";
const { it, describe, afterAll,beforeEach } = folio;
import { rozetka } from "../lib/helpers/credentials";
import { click, shouldExist } from "../lib/helpers/helpers";


describe("Tests on the Rozetka", () => {
  beforeEach(async ({ rozetkaObject }) => {
    await rozetkaObject.navigate(rozetka.URL)
  });

  afterAll(async ({ browser }) => {
    await browser.close();
  });

  // it("Fill Rozetka login form", async ({ rozetkaObject }) => {
  //   await rozetkaObject.loginToRozetka(rozetka.LOGIN, rozetka.PASSWORD);
  // });

  it("Try to open kids product section", async ({ rozetkaObject }) => {
    await rozetkaObject.openKidsSection();
  });

  it('Checking the shopping cart section',async ({ rozetkaObject }) => {
    await click(rozetkaObject.cart.CART_BUTTON, rozetkaObject.page);
    await shouldExist(rozetkaObject.cart.CART_SECTION,rozetkaObject.page)

  });


});
