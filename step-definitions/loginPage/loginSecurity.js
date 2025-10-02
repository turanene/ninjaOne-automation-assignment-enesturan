const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/LoginPage");
const { MFAPage } = require("../../pages/MFAPage");

require("dotenv").config({ quiet: true });


When('I enter an SQL injection payload into the {string} field', async function (fieldName) {
  const payload = `' OR '1'='1`;

  if (fieldName.toLowerCase() === "email") {
    await this.loginPage.emailInput.fill(payload);
  } else if (fieldName.toLowerCase() === "password") {
    await this.loginPage.passwordInput.fill(payload);
  } else {
    throw new Error(`Unknown field name: ${fieldName}`);
  }
});

Then('I should NOT see the "Multi-factor authentication" page displayed', async function () {
  const visible = await mfaPage.title.isVisible().catch(() => false);
  if (visible) throw new Error("Unexpectedly displayed MFA page after SQL injection attempt.");
});

Then('I should NOT be redirected to a URL containing "/getStarted"', async function () {
  const url = this.page.url();
  if (url.includes("/getStarted")) {
    throw new Error(`Unexpectedly redirected to dashboard: ${url}`);
  }
  await this.page.waitForTimeout(500);
  if (this.page.url().includes("/getStarted")) {
    throw new Error(`Unexpectedly redirected to dashboard after waiting: ${this.page.url()}`);
  }
});

Then("I should see a login error message indicating login failed", async function () {
  const locators = [
    loginPage.humanVerificationFailedMessage,
    loginPage.invalidUserNameAndPasswordError,
    loginPage.errorDuringLoginMessage,
  ];

  const checks = await Promise.all(locators.map(async (loc) => {
    try { return await loc.isVisible(); } catch (e) { return false; }
  }));

  if (checks.some(Boolean)) {
    return;
  }

  const anyAlert = this.page.locator("div.alert-danger, div[role='alert']").first();
  if (await anyAlert.isVisible().catch(() => false)) return;

  throw new Error("No expected login error message was displayed after SQL injection attempt.");
});