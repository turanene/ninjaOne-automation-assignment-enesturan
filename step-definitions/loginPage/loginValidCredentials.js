const { When, Then, defineStep } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/LoginPage");
const { MFAPage } = require("../../pages/MFAPage");
const { getOtpCode } = require("../../support/totpGenerator");
const { authenticator } = require('otplib');

require("dotenv").config({ quiet: true });

When('I enter a valid email into the {string} field', async function (fieldName) {
  if (!this.loginPage) {
    this.loginPage = new LoginPage(this.page);
  }

  if (fieldName.toLowerCase() === "email") {
    await this.loginPage.emailInput.fill('');
    await this.loginPage.emailInput.type(process.env.VALID_EMAIL, { delay: 100 });
    } else {
    throw new Error(`Unsupported field: ${fieldName}`);
  }
});

When('I enter a valid password into the {string} field', async function (fieldName) {
  if (fieldName.toLowerCase() === "password") {
    await this.loginPage.passwordInput.fill('');
    await this.loginPage.passwordInput.type(process.env.VALID_PASSWORD, { delay: 123 });
    } else {
    throw new Error(`Unsupported field: ${fieldName}`);
  }
});

When('I should see the MFA page displayed', async function () {
  this.mfaPage = new MFAPage(this.page);
  await expect(this.mfaPage.title).toBeVisible({ timeout: 10000 });
});

defineStep('I enter the valid MFA', async function () {
  console.log("Starting MFA step...");
  const secret = process.env.MFA_SECRET;

  let remaining = authenticator.timeRemaining();
  console.log(`Time remaining for current OTP: ${remaining}s`);

  if (remaining < 5) {
    console.log("Less than 5s left, waiting for next OTP window...");
    await new Promise(r => setTimeout(r, remaining * 1000));
    remaining = authenticator.timeRemaining();
    console.log(`New cycle started, time remaining: ${remaining}s`);
  }

  const otp = getOtpCode(secret);
  console.log(`Generated OTP: ${otp}`);

  console.log("Typing OTP into MFA input...");
  await this.mfaPage.codeInput.type(otp, { delay: 100 });

  console.log("Clicking Submit...");
  await this.mfaPage.submitButton.click();

  console.log("MFA step completed!");
});

Then('I should be logged into the dashboard page', async function () {
  console.log("Waiting for dashboard URL to appear...");

  await this.page.waitForURL("**/getStarted**", { timeout: 10000 });

  const currentUrl = this.page.url();
  console.log(`Current URL after wait: ${currentUrl}`);

  await expect(this.page).toHaveURL(/.*getStarted.*/);

  console.log("Dashboard page successfully loaded!");
});