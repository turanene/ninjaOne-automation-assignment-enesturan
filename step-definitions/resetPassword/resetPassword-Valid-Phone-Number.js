const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { ResetPasswordPage } = require("../../pages/ResetPasswordPage");

require("dotenv").config({ quiet: true });

When("I enter the valid last four digits into the phone number input field", async function () {
  resetPasswordPage = new ResetPasswordPage(this.page);
  await this.page.locator('body').click();
  const lastFour = process.env.VALID_LAST_FOUR;
  await resetPasswordPage.lastFourDigitsInput.fill(lastFour);
});

When("I enter the valid email into the email input field", async function () {
  this.resetPasswordPage = new ResetPasswordPage(this.page);
  const email = process.env.VALID_EMAIL;

  await this.resetPasswordPage.emailInput.fill('');
  await this.resetPasswordPage.emailInput.type(email, { delay: 100 });
  await this.page.locator('body').click();
});

Then("I should be taken to the verification code input step", async function () {
  await expect(this.resetPasswordPage.enterSecurityCodeLabel).toBeVisible();
});