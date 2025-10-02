const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { ResetPasswordPage } = require("../../pages/ResetPasswordPage");
require("dotenv").config({ quiet: true });

When("I select {string} from the identity method dropdown", async function (method) {
  const xpath =
    method === "Email"
      ? "//div[@id='react-select-2-option-0' and text()='Email']"
      : "//div[@id='react-select-2-option-1' and text()='Text']";
  const optionLocator = this.page.locator(`xpath=${xpath}`);
  await optionLocator.click({ force: true });
});

When("I enter an invalid email into the email input field", async function () {
  await this.resetPasswordPage.emailInput.fill(process.env.INVALID_EMAIL1);
});

When("I enter an invalid no-domain email into the email input field", async function () {
  await this.resetPasswordPage.emailInput.fill(process.env.INVALID_EMAIL_NO_DOMAIN);
});

When("I enter an invalid whitespace email into the email input field", async function () {
  await this.resetPasswordPage.emailInput.fill(process.env.INVALID_EMAIL_WHITESPACE);
});

When("I leave the email input field blank", async function () {
  await this.resetPasswordPage.emailInput.fill("");
});

When("I enter a valid email with leading whitespace into the email input field", async function () {
  await this.resetPasswordPage.emailInput.fill(" " + process.env.VALID_EMAIL);
});

When("I enter a valid email with middle whitespace into the email input field", async function () {
  await this.resetPasswordPage.emailInput.fill("n1enestu ran@gmail.com");
});

When("I enter a valid email with whitespace before at into the email input field", async function () {
  await this.resetPasswordPage.emailInput.fill("n1enesturan @gmail.com");
});

When("I enter an invalid no-domain email2 into the email input field", async function () {
  await this.resetPasswordPage.emailInput.fill("n1enesturan@");
});

When("I enter an invalid email ending with dot into the email input field", async function () {
  await this.resetPasswordPage.emailInput.fill("n1enesturan@.");
});

When("I enter an invalid email without at into the email input field", async function () {
  await this.resetPasswordPage.emailInput.fill("n1enesturangmail.com");
});