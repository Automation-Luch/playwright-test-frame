// In tests/feature.spec.ts
import { it, expect } from "./fixt";

it("should be logged in", async ({ loggedInPage }) => {
  await loggedInPage.goto("https://app.pagescreen.io/login", {
    waitUntil: "networkidle",
  });
  await loggedInPage.waitForTimeout(10000);
});
