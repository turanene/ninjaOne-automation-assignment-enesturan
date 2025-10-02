const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { ResetPasswordPage } = require("../../pages/ResetPasswordPage");

require("dotenv").config({ quiet: true });

When("I leave the phone number input field blank", async function () {
  await this.resetPasswordPage.lastFourDigitsInput.fill("");
});

When("I enter an invalid short phone number into the phone number input field", async function () {
  await this.resetPasswordPage.lastFourDigitsInput.fill(process.env.INVALID_PHONE_SHORT);
});

When("I enter an invalid non-numeric phone number into the phone number input field", async function () {
  await this.resetPasswordPage.lastFourDigitsInput.fill(process.env.INVALID_PHONE_NONNUMERIC);
});

When("I enter an invalid whitespace phone number into the phone number input field", async function () {
  await this.resetPasswordPage.lastFourDigitsInput.fill(process.env.INVALID_PHONE_WHITESPACE);
});

When("I enter an invalid wrong phone number into the phone number input field", async function () {
  await this.resetPasswordPage.lastFourDigitsInput.fill(process.env.INVALID_PHONE_WRONG_DIGITS);
});

Then("I should not proceed to the verification step", async function () {
  await expect(this.resetPasswordPage.textCodeInput).toBeHidden();
});