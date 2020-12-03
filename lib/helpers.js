const config = require("../lib/config");
const { BrowserContext } = require("playwright");
const fetch = require("node-fetch");

module.exports = {
  initBrowserAndPage: async ({ browser }) => {
    try {
      const page = await browser.newPage();

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

  // getLinksFromMessage: async (email, wordForSearch) => {
  //   const partsEmail = email.split("@");
  //   const result = await fetch(
  //     `https://www.1secmail.com/api/v1/?action=getMessages&login=${partsEmail[0]}&domain=${partsEmail[1]}`
  //   ).then((res) => res.json());
  //   if (result.length === 0) {
  //     throw new Error(`Emails are not sent`);
  //   }
  //   try {
  //     const link = await fetch(
  //       `https://www.1secmail.com/api/v1/?action=readMessage&login=${partsEmail[0]}&domain=${partsEmail[1]}&id=${result[0].id}`
  //     ).then((res) => res.json());
  //     const re = /(https?:\/\/\S+\w)/g;
  //     const list = link.body.match(re);
  //     for (let link of list) {
  //       if (link.includes(wordForSearch)) {
  //         return link;
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },

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
    this.clearField;
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
    await page.goto(url, { waitUntil: wait });
  },
};
