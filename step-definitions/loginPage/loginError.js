const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/LoginPage");
const { MFAPage } = require("../../pages/MFAPage");

require("dotenv").config({ quiet: true });


When('I enter {string} into the {string} field', async function (value, field) {
  if (field === "email") {
    await this.loginPage.emailInput.fill('');
    await this.loginPage.emailInput.type(value, { delay: 100 });
  } else if (field === "password") {
    await this.loginPage.passwordInput.fill('');
    await this.loginPage.passwordInput.type(value, { delay: 100 });
  } else {
    throw new Error(`Unknown field: ${field}`);
  }
});

Then('I should see an error message {string}', async function (expectedMessage) {
  if (expectedMessage.includes("Error during login")) {
    await expect(this.loginPage.errorDuringLoginMessage).toBeVisible();
    await expect(this.loginPage.errorDuringLoginMessage).toContainText(expectedMessage);
  } else if (expectedMessage.includes("Human verification failed")) {
    await expect(this.loginPage.humanVerificationFailedMessage).toBeVisible();
    await expect(this.loginPage.humanVerificationFailedMessage).toContainText(expectedMessage);
  } else if (expectedMessage.includes("Invalid username/password")) {
    await expect(this.loginPage.invalidUserNameAndPasswordError).toBeVisible();
    await expect(thisloginPage.invalidUserNameAndPasswordError).toContainText(expectedMessage);
  } else {
    throw new Error(`Unknown error message: ${expectedMessage}`);
  }
});

Then('the error message should disappear automatically after a few seconds', {timeout: 20000}, async function () {
  console.log("➡ Waiting for error toast to disappear...");

  await expect(this.loginPage.errorDuringLoginMessage).toBeHidden({ timeout: 15000 });
  console.log("Error toast disappeared");
});

Then('I should see not the {string} page displayed', async function (pageName) {
  if (pageName === "Multi-factor authentication") {
    const mfaText = this.page.getByText(/Multi-factor/i);
    const visible = await mfaText.isVisible().catch(() => false);
    expect(visible).toBeFalsy();
  }
});

Then('I should not be redirected to a URL containing {string}', async function (urlPart) {
  const currentUrl = this.page.url();
  expect(currentUrl).not.toContain(urlPart);
});