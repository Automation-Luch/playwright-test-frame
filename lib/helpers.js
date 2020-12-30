const config = require("../lib/config");
const fetch = require("node-fetch");
const { expect } = require("../tests/fixtures");
const TIMEOUT = 20000;

module.exports = {
  emailCreate(emailName = "autoTest") {
    return `${emailName}${Math.floor(
      Math.random(999999) * Math.floor(9999999999)
    )}@1secmail.net`;
  },

  clearField: async (selector, page) => {
    try {
      await page.waitForSelector(selector, { timeout: TIMEOUT });
      await page.focus(selector);
      await page.$eval(selector, (selector_) =>
        selector_.setSelectionRange(0, selector_.value.length)
      );
      await page.keyboard.press("Backspace");
    } catch (error) {
      console.error(error);
      throw new Error(`Could not click on selector: ${selector}`);
    }
  },

  // API for receiving emails and messages

  getLinkToConfirmRegistration: async (email, page) => {
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
      const message = await fetch(
        `https://www.1secmail.com/api/v1/?action=readMessage&login=${partsEmail[0]}&domain=${partsEmail[1]}&id=${result[0].id}`
      ).then((res) => res.json());
      return message;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  uploadFiles: async (selector, file, page) => {
    await page.waitForSelector(selector, {
      state: "attached",
      timeout: TIMEOUT,
    });
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
      await page.waitForSelector(selector, { timeout: TIMEOUT });
      await page.click(selector);
    } catch {
      throw new Error(`Could not click on selector: ${selector}`);
    }
  },

  typeText: async (selector, words, page) => {
    try {
      await page.waitForSelector(selector, { timeout: TIMEOUT });
      await page.type(selector, words);
    } catch {
      Error(`Could not type text into field: ${selector}`);
    }
  },

  getText: async (selector, page) => {
    try {
      await page.waitForSelector(selector, {
        state: "attached",
        timeout: TIMEOUT,
      });
      return page.$eval(selector, (e) => e.innerHTML);
    } catch (error) {
      throw new Error(`Cannot find text from selector: ${selector}`);
    }
  },

  clearAndTypeText: async (selector, words, page) => {
    await page.waitForSelector(selector, { timeout: TIMEOUT });
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
    await page.waitForSelector(selector, { timeout: TIMEOUT });
    const result = await page.evaluate(
      (selector) => document.querySelector(selector).getAttribute("value"),
      selector
    );
    if (result !== value)
      throw new Error(`Value: ${value} not found for selector: ${selector}`);
  },

  shouldExist: async (selector, page) => {
    try {
      await page.waitForSelector(selector, { timeout: TIMEOUT });
    } catch (error) {
      throw new Error(`Selector: ${selector} does not exist`);
    }
  },

  getCount: async (selector, page) => {
    const links = await page.$$eval(selector, (selector) => selector.length);
    return links;
  },

  followToPage: async (url, page, wait = "networkidle") => {
    try {
      await page.goto(url, { waitUntil: wait, timeout: TIMEOUT });
    } catch (error) {
      console.error(error);
      throw new Error(`Page is not loaded with wait parameter: ${wait} `);
    }
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
