import { folio } from "../lib/fixtures/base-fixture";
const { it, describe, afterEach,beforeEach,expect } = folio;
import { click, getText,navigate, emailCreate } from "../lib/helpers/helpers";
import { errors } from "../lib/helpers/text-helpers";

import { FORM,NAVBAR,ERROR } from "../lib/selectors/base";

import { alty_cmd_stage } from "../lib/helpers/credentials";

const email = emailCreate();

describe("Alty CMD Authentication", () => {
  
  beforeEach(async ({ AltyObject }) => {
    await navigate( alty_cmd_stage.URL,AltyObject.page)
  });

  it("Check the ability to registration with option fields", async ({ AltyObject }) => {
    await AltyObject.registration(email,alty_cmd_stage.PASSWORD)
    await AltyObject.confirmation(email,0)
  });

  it("Check the ability to registration without option fields", async ({ AltyObject }) => {
    await AltyObject.registration(email,alty_cmd_stage.PASSWORD,false)
    await AltyObject.confirmation(email,0)
  });

  it("Check the ability login and logout ", async ({ AltyObject }) => {
    await AltyObject.login(email,alty_cmd_stage.PASSWORD,)
    const navbar = await getText(NAVBAR,AltyObject.page)
    expect(navbar).toContain("GABY Balaance:");
   
  });

  it("Check the ability to restore password", async ({ AltyObject }) => {
    await AltyObject.restorePassword(alty_cmd_stage.EMAIL_FOR_RESTORE,alty_cmd_stage.PASSWORD)
    const resetPage = await getText(FORM,AltyObject.page)
    expect(resetPage).toContain("Your password has been reset.");
  });

});

describe("Alty CMD authentication NEGATIVE tests", () => {
  beforeEach(async ({ AltyObject }) => {
    await navigate( alty_cmd_stage.URL, AltyObject.page)
  });

  it("Check the ability login with invalid (non-registered) email ", async ({ AltyObject }) => {
    await AltyObject.login('email@mail.com', alty_cmd_stage.PASSWORD,)
    const loginError = await getText(ERROR, AltyObject.page)
    expect(loginError).toContain(errors.INVALID_CREDENTIALS);
  });

  it("Check the ability login with valid email and invalid password ", async ({ AltyObject }) => {
    await AltyObject.login(alty_cmd_stage.EMAIL_FOR_RESTORE,'ggpp123SS')
    const loginError = await getText(ERROR, AltyObject.page)
    expect(loginError).toContain(errors.INVALID_CREDENTIALS);
  });

  it("Check the ability registration with invalid email address ", async ({ AltyObject }) => {
    await AltyObject.registration("email",alty_cmd_stage.PASSWORD)
    const regError = await getText(ERROR, AltyObject.page)
    expect(regError).toContain(errors.INVALID_EMAIL);
  });


    describe("Check that the fields are required", () => {
      afterEach(async ({ AltyObject }) => {
        const errorText = await getText(ERROR, AltyObject.page)
        expect(errorText).toContain("This field is required.");

      });

      it("Check the ability login with empty form ", async ({ AltyObject }) => {
        await AltyObject.login('','')
      });
      
      it("Check the ability login with empty email field  ", async ({ AltyObject }) => {
        await AltyObject.login('',alty_cmd_stage.PASSWORD)
      });

      it("Check the ability login with empty password  ", async ({ AltyObject }) => {
        await AltyObject.login(alty_cmd_stage.EMAIL_FOR_RESTORE,'')
      });

      it("Check the ability to registration without email and password", async ({ AltyObject }) => {
        await AltyObject.registration('','')
      });

      it("Check the ability to registration without password ", async ({ AltyObject }) => {
        await AltyObject.registration('email@mail.com','')
      });

      it("Check the ability to registration without email ", async ({ AltyObject }) => {
        await AltyObject.registration('',alty_cmd_stage.PASSWORD)
      });
  });
});