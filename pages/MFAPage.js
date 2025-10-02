const BasePage = require("./BasePage.js");

class MFAPage extends BasePage {
  constructor(page) {
    super(page);

    this.header = page.locator(".css-1066lcq"); 
    this.logo = page.locator("img[alt='logo']");
    this.title = page.locator("h2", { hasText: "Multi-factor authentication" });
    this.mfaDropdown = page.locator("button[role='combobox']");
    this.mfaDropdownOptions = page.locator("div[role='option']");
    this.codeInput = page.locator("input[name='mfaCode']");
    this.codeLabel = page.locator("label span", { hasText: "Enter verification code" });
    this.submitButton = page.locator("button[type='submit']");
    this.resendCodeButton = page.locator("button", { hasText: "Resend Code" });
    this.contactUsLink = page.locator("a[href*='ninja-contact.html']");
    this.footerCopyright = page.locator("small.css-mh47ez");
  }
}

module.exports = { MFAPage };