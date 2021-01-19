export async function doLogin(page) {
  // Interact with UI elements to submit login form
  await page.goto("https://app.pagescreen.io/login", {
    waitUntil: "networkidle",
  });
  await page.fill('[type="email"]', "basikauth@1secmail.net");
  await page.fill('[type="password"]', "qwe123");
  await page.click('[type="submit"]');
  await page.waitForTimeout(5000);

  // Page is now logged in
}
