export async function doLogin(page) {
  // Interact with UI elements to submit login form
  await page.goto("https://app.pagescreen.io/login", {
    waitUntil: "load",
  });
  await page.fill('[type="email"]', process.env.PAGE_SCREEN_EMAIL); // "basikauth@1secmail.net"
  await page.fill('[type="password"]', process.env.PAGE_SCREEN_PASSWORD); //"qwe123"
  await page.click('[type="submit"]');
}
