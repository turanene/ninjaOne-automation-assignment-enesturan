const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/LoginPage");
const { MFAPage } = require("../../pages/MFAPage");

require("dotenv").config({ quiet: true });

When('I enter the valid email in uppercase', async function () {
  const upperEmail = process.env.VALID_EMAIL.toUpperCase();
  await this.loginPage.emailInput.fill('');
  await this.loginPage.emailInput.type(upperEmail, { delay: 100 });
});

When('I enter the valid email in lowercase', async function () {
  const lowerEmail = process.env.VALID_EMAIL.toLowerCase();
  await this.loginPage.emailInput.fill('');
  await this.loginPage.emailInput.type(lowerEmail, { delay: 100 });
});

When('I enter the valid password', async function () {
  const password = process.env.VALID_PASSWORD;
  await this.loginPage.passwordInput.fill('');
  await this.loginPage.passwordInput.type(password, { delay: 100 });
});

When('I enter the valid password in uppercase', async function () {
  const upperPassword = process.env.VALID_PASSWORD.toUpperCase();
  await this.loginPage.passwordInput.fill('');
  await this.loginPage.passwordInput.type(upperPassword, { delay: 100 });
});

When('I enter the valid password in lowercase', async function () {
  const lowerPassword = process.env.VALID_PASSWORD.toLowerCase();
  await this.loginPage.passwordInput.fill('');
  await this.loginPage.passwordInput.type(lowerPassword, { delay: 100 });
});

Then('I should see the {string} page displayed', async function (pageName) {
  if (pageName === "Multi-factor authentication") {
    await expect(this.page.getByText(/Multi-factor/i)).toBeVisible();
  } else {
    throw new Error(`Unknown page: ${pageName}`);
  }
});

Then('I should be redirected to a URL containing {string}', async function (urlPart) {
  await this.page.waitForURL(`**${urlPart}**`, { timeout: 10000 });
  const currentUrl = this.page.url();
  expect(currentUrl).toContain(urlPart);
});