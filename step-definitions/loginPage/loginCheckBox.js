const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/LoginPage");
const { MFAPage } = require("../../pages/MFAPage");

require("dotenv").config({ quiet: true });

Then('I should see the {string} checkbox', async function (checkboxLabel) {
  if (checkboxLabel === "Keep me signed in") {
    const checkbox = this.loginPage.keepMeSignedInCheckbox;
    await expect(checkbox).toBeVisible();
  } else {
    throw new Error(`Unknown checkbox label: ${checkboxLabel}`);
  }
});

When('I click the {string} checkbox', async function (checkboxLabel) {
  if (checkboxLabel === "Keep me signed in") {
    const checkbox = this.loginPage.keepMeSignedInCheckbox;

    await checkbox.waitFor({ state: 'attached', timeout: 5000 });
    await expect(checkbox).toBeVisible({ timeout: 5000 });
    await expect(checkbox).toBeEnabled({ timeout: 5000 });
    await this.page.waitForTimeout(1000);
    await checkbox.click({ force: true });
  } else {
    throw new Error(`Unknown checkbox label: ${checkboxLabel}`);
  }
});

Then('the checkbox should be selected', async function () {
  await expect(this.loginPage.keepMeSignedInCheckbox).toBeChecked();
});

Then('the checkbox should be unselected', async function () {
  await expect(this.loginPage.keepMeSignedInCheckbox).not.toBeChecked();
});

When('I enter an invalid email', async function () {
  await this.loginPage.emailInput.type(process.env.INVALID_EMAIL1, { delay: 139 });
  await this.page.keyboard.type('m');
  await this.page.keyboard.press('Home');
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789!#$%&*";
  const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));

  console.log(`Inserted random char: ${randomChar}`);
  await this.page.keyboard.type(randomChar);
});

When('I enter an invalid password', async function () {
await this.loginPage.passwordInput.fill('');
await this.loginPage.passwordInput.type(process.env.INVALID_PASSWORD, { delay: 122 });
await this.loginPage.passwordInput.click();
  await this.page.keyboard.press('End');
  await this.page.keyboard.type(' ');
  await this.page.keyboard.press('Delete');

});

When('I check the {string} checkbox', async function (checkboxLabel) {
  if (checkboxLabel === "Keep me signed in") {
    await this.loginPage.keepMeSignedInCheckbox.check();
  } else {
    throw new Error(`Unknown checkbox label: ${checkboxLabel}`);
  }
});

When('I click on the Sign in button', async function () {
  await this.page.waitForTimeout(1000);

  await expect(this.loginPage.signInButton).toBeVisible({ timeout: 5000 });
  await expect(this.loginPage.signInButton).toBeEnabled({ timeout: 5000 });
  await this.loginPage.signInButton.click();
});

Then('the checkbox should remain selected', async function () {
  await expect(this.loginPage.keepMeSignedInCheckbox).toBeChecked();
});