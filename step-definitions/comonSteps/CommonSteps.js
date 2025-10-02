const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { ResetPasswordPage } = require("../../pages/ResetPasswordPage");
const { LoginPage } = require("../../pages/LoginPage");
const { MFAPage } = require("../../pages/MFAPage");
require("dotenv").config({ quiet: true });

When("I click the send button", async function () {
  await this.resetPasswordPage.sendButton.click();
});

Given('I am on the NinjaOne login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto(process.env.LOGIN_PAGE_URL);
});

Given("I am on the NinjaOne reset password page", async function () {
  this.resetPasswordPage = new ResetPasswordPage(this.page);
  await this.resetPasswordPage.goto(process.env.RESET_PASSWORD_PAGE_URL);
});

When('I click the {string} button', async function (buttonName) {
  if (buttonName === "Sign in") {
    await this.loginPage.signInButton.click();
  } else {
    throw new Error(`Button "${buttonName}" not mapped in step defs`);
  }
});

When('I quickly enter a single character into the {string} field', async function (field) {
  if (field === "email") {
    await this.loginPage.type(this.loginPage.emailInput, "a");
  } else if (field === "password") {
    await this.loginPage.type(this.loginPage.passwordInput, "a");
  } else {
    throw new Error(`Unknown field: ${field}`);
  }
});

Then("I should see the NinjaOne logo", async function () {
  console.log("Checking NinjaOne logo...");
  const logo = this.loginPage?.logo || this.resetPasswordPage?.n1logo;

  if (!logo) {
    throw new Error("No page object (loginPage/resetPasswordPage) initialized!");
  }

  await expect(logo).toBeVisible();
  console.log("NinjaOne logo is visible!");
});