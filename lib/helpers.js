const config = require("../lib/config");
const fetch = require("node-fetch");
const { expect } = require("../tests/fixtures");

module.exports = {
  initBrowserAndPage: async ({ browser, page }) => {
    try {
      page = await browser.newPage();

      await page.setViewportSize({
        width: config.viewportWidth,
        height: config.viewportHeight,
      });
      return { page: page };
    } catch (error) {
      console.log(error);
    }
  },
  emailCreate(emailName = "autoTest") {
    return `${emailName}${Math.floor(
      Math.random(999999) * Math.floor(9999999999)
    )}@1secmail.net`;
  },

  clearField: async (selector, page) => {
    await page.waitForSelector(selector);
    await page.focus(selector);
    await page.$eval(selector, (selector_) =>
      selector_.setSelectionRange(0, selector_.value.length)
    );
    await page.keyboard.press("Backspace");
  },

  getLinkToConfirmRegistration: async (email, typeLink = "reg", page) => {
    const partsEmail = email.split("@");
    let result;
    for (const i of [1, 2, 3, 4, 5]) {
      await page.waitForTimeout(1000);
      result = await fetch(
        `https://www.1secmail.com/api/v1/?action=getMessages&login=${partsEmail[0]}&domain=${partsEmail[1]}`
      ).then((res) => res.json());
      if (result !== null) {
        break;
      } else if (i === 5 && result === null) {
        throw new Error(`Emails are not sent`);
      }
    }
    try {
      const link = await fetch(
        `https://www.1secmail.com/api/v1/?action=readMessage&login=${partsEmail[0]}&domain=${partsEmail[1]}&id=${result[0].id}`
      ).then((res) => res.json());
      return link;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  uploadFiles: async (selector, file, page) => {
    await page.waitForSelector(selector, { state: "attached" });
    const inputsFile = await page.$$(selector);
    for (const element of inputsFile) {
      await element.setInputFiles(file);
      await element.evaluate((upload) =>
        upload.dispatchEvent(new Event("change", { bubbles: true }))
      );
    }
  },

  click: async (selector, page) => {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch {
      throw new Error(`Could not click on selector: ${selector}`);
    }
  },

  typeText: async (selector, words, page) => {
    try {
      await page.waitForSelector(selector);
      await page.type(selector, words);
    } catch {
      throw new Error(`Could not type text into field: ${selector}`);
    }
  },

  getText: async (selector, page) => {
    try {
      await page.waitForSelector(selector, { state: "attached" });
      return page.$eval(selector, (e) => e.innerHTML);
    } catch (error) {
      throw new Error(`Cannot find text from selector: ${selector}`);
    }
  },

  clearAndTypeText: async (selector, words, page) => {
    await page.waitForSelector(selector);
    await page.focus(selector);
    await page.$eval(selector, (selector_) =>
      selector_.setSelectionRange(0, selector_.value.length)
    );
    await page.keyboard.press("Backspace");
    try {
      await page.type(selector, words);
    } catch {
      throw new Error(`Could not type text into field: ${selector}`);
    }
  },

  waitForValue: async (selector, value, page) => {
    await page.waitForSelector(selector);
    const result = await page.evaluate(
      (selector) => document.querySelector(selector).getAttribute("value"),
      selector
    );
    if (result !== value)
      throw new Error(`Value: ${value} not found for selector: ${selector}`);
  },

  shouldExist: async (selector, page) => {
    try {
      await page.waitForSelector(selector);
    } catch (error) {
      throw new Error(`Selector: ${selector} does not exist`);
    }
  },

  getCount: async (selector, page) => {
    const links = await page.$$eval(selector, (selector) => selector.length);
    return links;
  },

  followToPage: async (url, page, wait = "networkidle") => {
    // try {
    await page.goto(url, { waitUntil: wait });
    // } catch (error) {
    //   console.error(error);
    //   throw new Error(`Page is not loaded with wait parameter: ${wait} `);
    // }
  },

  waitForResponseInclude: async (responseText, page) => {
    try {
      await page.waitForResponse((response) =>
        response.url().includes(`${responseText}`)
      );
    } catch {
      throw new Error(`Response url does NOT include: ${responseText} `);
    }
  },

  waitForRequestInclude: async (requestText, page) => {
    try {
      await page.waitForRequest((request) => {
        return request.url().includes(requestText);
      });
    } catch {
      throw new Error(`Request url does NOT include: ${responseText} `);
    }
  },

  screenshotMatching: async (browserName, page) => {
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchSnapshot(`test-${browserName}.png`, {
      threshold: 0.5,
    });
  },
};
