const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/LoginPage");
const { MFAPage } = require("../../pages/MFAPage");
const {FreeTrialDemoPage} = require("../../pages/FreeTrialDemoPage");
require("dotenv").config({ quiet: true });

When("I click on the {string} link", async function (linkText) {
  if (!this.loginPage) {
    this.loginPage = new LoginPage(this.page);
  }

  switch (linkText) {
    case "Forgot your password?":
  await Promise.all([
    this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    this.loginPage.forgotPasswordLink.click(),
  ]);
  break;

    case "Do not have an account?":
      const [newPage2] = await Promise.all([
        this.page.context().waitForEvent("page"),
        this.loginPage.createAccountLink.click(),
      ]);
      await newPage2.waitForLoadState();
      this.newPage = newPage2;
      break;

    case "Contact us":
      const [newPage] = await Promise.all([
        this.page.context().waitForEvent("page"),
        this.loginPage.contactUsLink.click(),
      ]);
      await newPage.waitForLoadState();
      break;

    default:
      throw new Error(`Unknown link text: ${linkText}`);
  }

  await this.page.waitForLoadState('load'); 

});

Then("I should be redirected to the Reset Password page", async function () {
  await this.page.waitForURL(process.env.RESET_PASSWORD_PAGE_URL);
  expect(this.page.url()).toBe(process.env.RESET_PASSWORD_PAGE_URL);
});

Then("I should be redirected to the registration page", async function () {
  await this.page.waitForURL(process.env.REGISTRATION_PAGE_URL);
  expect(this.page.url()).toBe(process.env.REGISTRATION_PAGE_URL);
});

Then("a new browser tab should open", async function () {
  const expectedUrl = process.env.CONTACT_US_URL;

  console.log("➡ Waiting for new tab...");
  const [newPage] = await Promise.all([
    this.page.context().waitForEvent('page'),
    this.loginPage.contactUsLink.click(), 
  ]);

  console.log("➡ New tab opened, waiting for load...");
  await newPage.waitForLoadState('load');

  const currentUrl = newPage.url();
  console.log(`Current URL: ${currentUrl}`);
  console.log(`Expected URL: ${expectedUrl}`);

  expect(currentUrl).toBe(expectedUrl); // known bug
  this.newPage = newPage;

});

Then("the page should display the following support contact information:", async function (dataTable) {
  if (!this.newPage) {
    throw new Error("newPage is not set. Did the previous step run?");
  }

  const bodyText = await this.newPage.textContent("body");

  for (const row of dataTable.hashes()) {
    const { "Contact Type": type, "Email / Handle": contact } = row;
    expect(bodyText).toContain(type);
    expect(bodyText).toContain(contact);
  }
});

Then('due to a known bug, I am incorrectly redirected elsewhere', async function () {
  if (!this.newPage) {
    throw new Error("newPage is not set.");
  }

  const expectedUrl = process.env.REGISTRATION_PAGE_URL;
  const currentUrl = this.newPage.url();

  console.log(`Current URL: ${currentUrl}`);
  console.log(`Expected URL (Register Page): ${expectedUrl}`);

  await expect(currentUrl).not.toBe(expectedUrl);

  console.log("Redirect bug confirmed: landed on incorrect page.");
});