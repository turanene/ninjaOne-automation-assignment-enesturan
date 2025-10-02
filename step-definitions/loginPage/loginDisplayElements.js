const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/LoginPage");
const { MFAPage } = require("../../pages/MFAPage");

require("dotenv").config({ quiet: true });

Then('I should see the {string} input field', async function (fieldName) {
  if (fieldName.toLowerCase() === "email") {
    await expect(this.loginPage.emailInput).toBeVisible();
  } else if (fieldName.toLowerCase() === "password") {
    await expect(this.loginPage.passwordInput).toBeVisible();
  } else {
    throw new Error(`Unknown input field: ${fieldName}`);
  }
});

Then('I should see the {string} button', async function (buttonLabel) {
  if (buttonLabel === "Sign in") {
    await expect(this.loginPage.signInButton).toBeVisible();
  } else {
    throw new Error(`Unknown button: ${buttonLabel}`);
  }
});

Then('I should see the {string} link', async function (linkLabel) {
  switch (linkLabel) {
    case "Forgot your password?":
      await expect(this.loginPage.forgotPasswordLink).toBeVisible();
      break;
    case "Do not have an account?":
      await expect(this.loginPage.createAccountLink).toBeVisible();
      break;
    case "Contact us":
      await expect(this.loginPage.contactUsLink).toBeVisible();
      break;
    default:
      throw new Error(`Unknown link label: ${linkLabel}`);
  }
});