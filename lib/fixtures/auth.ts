
const dotenv = require("dotenv");
dotenv.config();

export async function doLogin(page) {
  // Interact with UI elements to submit login form
  await page.goto("https://app.pagescreen.io/login", {
    waitUntil: "load",
  });
  await page.fill('[type="email"]', process.env.PAGE_SCREEN_EMAIL);
  await page.fill('[type="password"]', process.env.PAGE_SCREEN_PASSWORD);
  await page.click('[type="submit"]');
}
