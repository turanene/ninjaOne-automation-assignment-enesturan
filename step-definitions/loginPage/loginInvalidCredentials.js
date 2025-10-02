const { Given, When, Then, defineStep } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/LoginPage");
const { MFAPage } = require("../../pages/MFAPage");

require("dotenv").config({ quiet: true });

When('I enter missing domain into the {string} field', async function (field) {
  if (field === "email") {
    await this.loginPage.emailInput.fill('');
    await this.loginPage.emailInput.type(process.env.INVALID_EMAIL_NO_DOMAIN, { delay: 90 });
    }
});

When('I leave the {string} field empty', async function (field) {
  if (field === "email") {
    await this.loginPage.type(this.loginPage.emailInput, "");
  } else if (field === "password") {
    await this.loginPage.type(this.loginPage.passwordInput, "");
  } else {
    throw new Error(`Unknown field: ${field}`);
  }
});

When('I enter a valid email address with leading or trailing whitespace', async function () {
  const emailWithWhitespace = process.env.VALID_EMAIL_WHITESPACE;

  await this.page.keyboard.type(' ', { delay: 100 });
  await this.loginPage.emailInput.type(emailWithWhitespace, { delay: 132 });
  await this.page.keyboard.type(' ', { delay: 200 });
  await this.page.keyboard.press('Backspace');
  await this.page.locator('body').click();
});

When('I enter a valid password', async function () {
  const password = process.env.VALID_PASSWORD;

  await this.loginPage.passwordInput.fill('');
  await this.loginPage.passwordInput.type(password, { delay: 100 });
await this.page.locator('body').click();
});

Then('I should see the {string} message', async function (expectedMessage) {
  try {
    if (expectedMessage.includes("Invalid username/password")) {
      console.log("Checking invalid username/password error...");
      await expect(this.loginPage.invalidUserNameAndPasswordError).toBeVisible({ timeout: 5000 });
      await expect(this.loginPage.invalidUserNameAndPasswordError).toContainText(expectedMessage);
      console.log("Invalid username/password check passed");
    } else if (expectedMessage.includes("Human verification failed")) {
      console.log("Checking human verification failed error...");
      await expect(this.loginPage.humanVerificationFailedMessage).toBeVisible({ timeout: 5000 });
      await expect(this.loginPage.humanVerificationFailedMessage).toContainText(expectedMessage);
      console.log("Human verification failed check passed");
    } else if (expectedMessage.includes("Error during login")) {
      console.log("Error during login failed error...");
      await expect(this.loginPage.errorDuringLoginMessage).toBeVisible({ timeout: 5000 });
      await expect(this.loginPage.errorDuringLoginMessage).toContainText(expectedMessage);
      console.log("Error during login check passed");
    }else{
      throw new Error(`Unknown error message: ${expectedMessage}`);
    }
  } catch (err) {
    console.error("STEP FAILED HERE:", err.message);
    throw err;
  }
  console.log(`Expected -> ${expectedMessage}`);
});

Then('I should not see the MFA page displayed', async function () {
if (!this.mfaPage) {
  this.mfaPage = new MFAPage(this.page);
}
await expect(this.mfaPage.mfaDropdown).not.toBeVisible();
});

defineStep('I should not be logged into the dashboard page', async function () {
  await expect(this.page).not.toHaveURL(new RegExp(process.env.DASHBOARD_PAGE_URL));
});

Then('I wait for the reCAPTCHA to load', { timeout: 15000 }, async function () {
  console.log("⏳ Checking reCAPTCHA badge visibility...");

  const isVisible = await this.loginPage.recaptchaBadge.isVisible().catch(() => false);
  console.log(`🔍 reCAPTCHA badge visible? ${isVisible}`);

  await expect(this.loginPage.recaptchaBadge).not.toBeVisible({ timeout: 15000 });

  console.log("reCAPTCHA is hidden (completed load)");
});