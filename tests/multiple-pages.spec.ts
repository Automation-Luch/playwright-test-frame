import { it, describe, expect } from "../lib/fixtures/base-fixture";

import { Login } from "../lib/page-objects/login";
import { securer } from "../lib/helpers/credentials";
const inv = securer.investor;
const comp = securer.company;

describe("Tests on multiple web pages", () => {
  it("Check that the 2 pages are open", async ({ context }) => {
    const pageInvestor = await context.newPage();
    const pageCompany = await context.newPage();
    const investor = new Login(pageInvestor);
    const company = new Login(pageCompany);
    await investor.visitAndLogin(inv.URL, inv.EMAIL, inv.PASSWORD);
    await company.visitAndLogin(comp.URL, comp.EMAIL, comp.PASSWORD);
    expect(context.pages().length).toBe(2);
  });

  it("Check that the 2 pages are open from the fixture", async ({
    loggedInPage,
    context,
    page,
  }) => {
    const investor = new Login(loggedInPage);
    const company = new Login(page);
    await investor.visitAndLogin(inv.URL, inv.EMAIL, inv.PASSWORD);
    await company.visitAndLogin(comp.URL, comp.EMAIL, comp.PASSWORD);
    expect(context.pages().length).toBe(2);
  });
});
