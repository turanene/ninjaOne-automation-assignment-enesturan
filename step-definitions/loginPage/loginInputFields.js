const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/LoginPage");
const { MFAPage } = require("../../pages/MFAPage");

require("dotenv").config({ quiet: true });

Then('the {string} input field should be visible and empty', async function (field) {
  let locator;
  if (field === "email") {
    locator = this.loginPage.emailInput;
  } else if (field === "password") {
    locator = this.loginPage.passwordInput;
  } else {
    throw new Error(`Unknown input field: ${field}`);
  }

  await expect(locator).toBeVisible();
  await expect(locator).toHaveValue("");
});

When('I click into the {string} input field', async function (field) {
  if (field === "email") {
    await this.loginPage.emailInput.click();
  } else if (field === "password") {
    await this.loginPage.passwordInput.click();
  } else {
    throw new Error(`Unknown field: ${field}`);
  }
});

When('I type a valid email address', async function () {
  await this.loginPage.type(this.loginPage.emailInput, process.env.VALID_EMAIL);
});

When('I type a valid password', async function () {
  await this.loginPage.type(this.loginPage.passwordInput, process.env.VALID_PASSWORD);
});

Then('the typed email should be visible in the {string} input field', async function (field) {
  if (field === "email") {
    await expect(this.loginPage.emailInput).toHaveValue(process.env.VALID_EMAIL);
  } else {
    throw new Error(`Unexpected field: ${field}`);
  }
});

Then('the typed password should be hidden and not displayed as plain text', async function () {
  const typeAttr = await this.loginPage.passwordInput.getAttribute('type');
  expect(typeAttr).toBe('password');
});

When('I enter a very long string into the {string} and {string} fields', async function (field1, field2) {
  const longString = 'a'.repeat(500); // intentionally long
  if (field1 === "email") {
    await this.loginPage.type(this.loginPage.emailInput, longString);
  }
  if (field2 === "password") {
    await this.loginPage.type(this.loginPage.passwordInput, longString);
  }
});

Then('the input should be trimmed or rejected beyond the allowed length', async function () {
  const emailValue = await this.loginPage.emailInput.inputValue();
  const passwordValue = await this.loginPage.passwordInput.inputValue();
  // Email: typical limit ~254 chars
  expect(emailValue.length).toBeLessThanOrEqual(254);
  // Password: assume limit ~128 chars
  expect(passwordValue.length).toBeLessThanOrEqual(128);
});