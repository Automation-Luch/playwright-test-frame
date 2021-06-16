import { test, expect } from '@playwright/test';
import { click, getText, navigate, emailCreate } from '../lib/helpers/helpers';
import { errors } from '../lib/helpers/text-helpers';
import { Login } from '../lib/page-objects/authentication';
import { AltyCMD } from '../lib/page-objects/alty-cmd';

import { FORM, NAVBAR, ERROR } from '../lib/selectors/base';

import { alty_cmd_stage } from '../lib/helpers/credentials';

const email = emailCreate();
let auth;
let dashboard;

test.describe('Alty CMD Authentication', () => {
  // Run tests in this describe block with special timeout and viewport.
  test.use({ timeout: 50000, viewport: { width: 1920, height: 1080 } }); //
  test.beforeEach(async ({ page }) => {
    auth = new Login(page);
    dashboard = new AltyCMD(page);
    await navigate(alty_cmd_stage.URL, page);
  });

  test('Check the ability to registration with option fields', async ({}) => {
    await auth.registration(email, alty_cmd_stage.PASSWORD);
    await auth.confirmation(email, 0);
  });

  test('Check the ability to registration without option fields', async ({}) => {
    await auth.registration(email, alty_cmd_stage.PASSWORD, false);
    await auth.confirmation(email, 0);
  });

  test('Check the ability login and logout ', async ({ page }) => {
    await auth.login(email, alty_cmd_stage.PASSWORD);
    const navbar = await getText(NAVBAR, page);
    expect(navbar).toContain('My Balance:');
  });

  test('Check the ability to restore password', async ({ page }) => {
    await auth.restorePassword(alty_cmd_stage.EMAIL_FOR_RESTORE, alty_cmd_stage.PASSWORD);
    const resetPage = await getText(FORM, page);
    expect(resetPage).toContain('Your password has been reset.');
  });

  test.describe('Alty CMD authentication NEGATIVE tests', () => {
    test('Check the ability login with invalid (non-registered) email ', async ({ page }) => {
      await auth.login('email@mail.com', alty_cmd_stage.PASSWORD);
      const loginError = await getText(ERROR, page);
      expect(loginError).toContain(errors.INVALID_CREDENTIALS);
    });

    test('Check the ability login with valid email and invalid password ', async ({ page }) => {
      await auth.login(alty_cmd_stage.EMAIL_FOR_RESTORE, 'ggpp123SS');
      const loginError = await getText(ERROR, page);
      expect(loginError).toContain(errors.INVALID_CREDENTIALS);
    });

    test('Check the ability registration with invalid email address ', async ({ page }) => {
      await auth.registration('email', alty_cmd_stage.PASSWORD);
      const regError = await getText(ERROR, page);
      expect(regError).toContain(errors.INVALID_EMAIL);
    });
    test.describe('Check that the fields are required', () => {
      test.afterEach(async ({ page }) => {
        const errorText = await getText(ERROR, page);
        expect(errorText).toContain('This field is required.');
      });

      test('Check the ability login with empty form ', async ({}) => {
        await auth.login('', '');
      });

      test('Check the ability login with empty email field  ', async ({}) => {
        await auth.login('', alty_cmd_stage.PASSWORD);
      });

      test('Check the ability login with empty password  ', async ({}) => {
        await auth.login(alty_cmd_stage.EMAIL_FOR_RESTORE, '');
      });

      test('Check the ability to registration without email and password', async ({}) => {
        await auth.registration('', '');
      });

      test('Check the ability to registration without password ', async ({}) => {
        await auth.registration('email@mail.com', '');
      });

      test('Check the ability to registration without email ', async ({}) => {
        await auth.registration('', alty_cmd_stage.PASSWORD);
      });
    });
  });
});
