const { click, typeText, followToPage } = require("../helpers/helpers.js");

class Login {
  EMAIL_FIELD = "input[name='email']";

  PASSWORD_FIELD = "input[name='password']";

  CONFIRM_PASSWORD_FIELD = 'input[name="passwordConfirm"]';

  SUBMIT_BUTTON = '//button[@type="submit"]';

  constructor(page) {
    this.page = page;
  }

  visitAndLogin= async(url, email, password) =>{
    await followToPage(url, this.page);
    await typeText(this.EMAIL_FIELD, email, this.page);
    await typeText(this.PASSWORD_FIELD, password, this.page);
    await click(this.SUBMIT_BUTTON, this.page);
  }
}
module.exports = { Login };
