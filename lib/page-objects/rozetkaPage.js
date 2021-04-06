const {
  click,
  typeText,
  shouldExist,
  clickIfElementDoesNotDisappears,
  waitForRequestInclude,
} = require("../helpers/helpers.js");

class RozetkaPage {
  login = {
    USERNAME_FIELD: '[id="auth_email"]',
    PASSWORD_FIELD: '[id="auth_pass"]',
    LOGIN_BUTTON: 'button[class*="auth-modal__submit"]',
    LOGIN_LINK: '//rz-user',
  };

cart = {
  CART_BUTTON:'//rz-cart',
  CART_SECTION: '[class="cart-dummy__illustration"]'
};

  SEARCH_BUTTON = '[class*="search-form__submit"]';
  SEARCH_INPUT = "[search-input]";
  KIDS_SECTION = `//sidebar-fat-menu//a[contains(@href,"/kids/")]`;
  KIDS_GAMES_SECTION = `//*[contains(@href,"nastoljnye-igry-i-golovolomki/")]`;
  PERSONAL_SECTION = '[href*="/cabinet/personal-information/"]';


  constructor(page) {
    this.page = page;
  }
  navigate = async (URL) => {
    await this.page.goto(URL);
  }
  loginToRozetka = async (LOGIN, PASSWORD)=> {
    await click(this.login.LOGIN_LINK, this.page);
    await typeText(this.login.USERNAME_FIELD, LOGIN, this.page);
    await typeText(this.login.PASSWORD_FIELD, PASSWORD, this.page);
    await click(this.login.LOGIN_BUTTON, this.page);
    await clickIfElementDoesNotDisappears(this.login.LOGIN_BUTTON, this.page);
    if (await this.page.waitForSelector('//re-captcha') !== null){
      throw new Error(`OMG, Captcha after submitting login form`);
    }
  }

  openKidsSection = async () => {
    await this.page.hover(this.KIDS_SECTION);
    await click(this.KIDS_SECTION, this.page);
    await click(this.KIDS_GAMES_SECTION, this.page);
    await waitForRequestInclude("nastoljnye-igry-i-golovolomki", this.page);
  }
  
}
module.exports = { RozetkaPage };
