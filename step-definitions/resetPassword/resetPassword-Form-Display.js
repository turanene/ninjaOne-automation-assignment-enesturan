const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { ResetPasswordPage } = require("../../pages/ResetPasswordPage");
require("dotenv").config({ quiet: true });


When("I open the identity method dropdown", async function () {
  await this.resetPasswordPage.identityMethodDropdown.waitFor({ state: "visible" });
  await this.resetPasswordPage.identityMethodDropdown.click();
});

Then("I should see the email input field", async function () {
  await expect(this.resetPasswordPage.emailInput).toBeVisible();
});

Then("I should see the last 4 digits input field", async function () {
  await expect(this.resetPasswordPage.lastFourDigitsInput).toBeVisible();
});

Then("I should see the send button", async function () {
  await expect(this.resetPasswordPage.sendButton).toBeVisible();
});

Then("I should not see the last four digits phone input field", async function () {
  await expect(this.resetPasswordPage.lastFourDigitsInput).toBeHidden();
});

Then("I should see the last four digits phone input field", async function () {
  await expect(this.resetPasswordPage.lastFourDigitsInput).toBeVisible();
});

Then("the identity method dropdown should display {string}", async function (expected) {
  await expect(this.resetPasswordPage.identitySelected).toHaveText(expected);
});

Then("the identity method dropdown should contain {string}", async function (option) {
  const xpath =
  option === "Email"
    ? "//div[@id='react-select-2-option-0' and text()='Email']"
    : "//div[@id='react-select-2-option-1' and text()='Text']";

const optionLocator = this.page.locator(`xpath=${xpath}`);

await optionLocator.waitFor({ state: "visible", timeout: 5000 });

await expect(optionLocator).toHaveText(option);
});

Then("the identity method dropdown should show {string} selected", async function (expected) {
  await expect(this.resetPasswordPage.identitySelected).toHaveText(expected);
});