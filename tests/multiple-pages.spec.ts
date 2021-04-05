import { folio } from "../lib/fixtures/base-fixture";
const { it, describe, expect, afterAll } = folio;
import { securer } from "../lib/helpers/credentials";
const inv = securer.investor;
const comp = securer.company;

describe("Tests on multiple web pages", () => {
  afterAll(async function ({ browser }) {
    await browser.close();
  });

  it("Check that the 2 pages are open", async ({ multiplePageFirst,multiplePageSecond,context }) => {
    await multiplePageFirst.visitAndLogin(inv.URL, inv.EMAIL, inv.PASSWORD);
    await multiplePageSecond.visitAndLogin(comp.URL, comp.EMAIL, comp.PASSWORD);
    expect(context.pages().length).toBe(2);
  });
});
