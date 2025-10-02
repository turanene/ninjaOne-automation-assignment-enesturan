const BasePage = require("./BasePage");

class ResetPasswordPage extends BasePage {
  constructor(page) {
    super(page);
    this.n1logo = page.locator("img[alt='logo']");
    this.identityMethodDropdown = page.locator("//div[contains(@class,'css-yk16xz-control') or contains(@class,'css-1pahdxg-control')]");    this.identitySelected = page.locator(".css-1uccc91-singleValue");
    this.emailInput = page.locator("input[name='email']");
    this.lastFourDigitsInput = page.locator("//input[@name='phone']");
    this.sendButton = page.locator("button[type='submit']");
    this.textCodeInput = page.locator('input[name="verificationCode"]');
    this.recoveryEmailSentMessage = page.locator("p.css-bk160n.e1nhwllb0");
    this.enterSecurityCodeLabel = page.getByText("Enter Security Code");
    }
}

module.exports = { ResetPasswordPage };