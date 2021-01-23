const {
  click,
  typeText,
  shouldExist,
  clickIfElementDoesNotDisappears,
  waitForRequestInclude,
} = require("../helpers.js");

class RozetkaPage {
  login = {
    USERNAME_FIELD: '[id="auth_email"]',
    PASSWORD_FIELD: '[id="auth_pass"]',
    LOGIN_BUTTON: 'button[class*="auth-modal__submit"]',
    LOGIN_LINK: 'button[class*="user-link"]',
  };

  SEARCH_BUTTON = '[class*="search-form__submit"]';
  SEARCH_INPUT = "[search-input]";
  KIDS_SECTION = `//sidebar-fat-menu//a[contains(@href,"/kids/")]`;
  KIDS_GAMES_SECTION = `//a[@class="menu__link"][contains(@href,"nastoljnye-igry-i-golovolomki/")]`;
  PERSONAL_SECTION = '[href*="/cabinet/personal-information/"]';

  constructor(page) {
    this.page = page;
  }
  async navigate(URL) {
    await this.page.goto(URL);
  }
  async loginToRozetka(LOGIN, PASSWORD) {
    await click(this.login.LOGIN_LINK, this.page);
    await typeText(this.login.USERNAME_FIELD, LOGIN, this.page);
    await typeText(this.login.PASSWORD_FIELD, PASSWORD, this.page);
    await click(this.login.LOGIN_BUTTON, this.page);
    await clickIfElementDoesNotDisappears(this.login.LOGIN_BUTTON, this.page);
    await shouldExist(this.PERSONAL_SECTION, this.page);
  }

  async openKidsSection() {
    await this.page.hover(this.KIDS_SECTION);
    await click(this.KIDS_GAMES_SECTION, this.page);
    await waitForRequestInclude("nastoljnye-igry-i-golovolomki", this.page);
  }
}
module.exports = { RozetkaPage };
