const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { ResetPasswordPage } = require("../../pages/ResetPasswordPage");

require("dotenv").config({ quiet: true });

Then("I should see recovery email sent message", async function () {
    await expect(this.resetPasswordPage.recoveryEmailSentMessage).toBeVisible();
    await expect(this.resetPasswordPage.recoveryEmailSentMessage).toHaveText(
      "Password recovery email sent"
    );
  });