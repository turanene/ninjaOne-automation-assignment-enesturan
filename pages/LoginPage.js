const BasePage = require("./BasePage.js");

class LoginPage extends BasePage {
  constructor(page) {
    super(page); // inherit BasePage methods
    this.logo = page.getByRole('link', { name: 'logo' });
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.keepMeSignedInCheckbox = page.locator('input[name="staySignedIn"]'); // for .check()
    this.keepMeSignedInLabel = page.getByLabel('Keep me signed in'); // for .click()
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot your password?' });
    this.createAccountLink = page.getByRole('link', { name: 'Do not have an account?' });
    this.footerCopyright = page.locator("small.css-mh47ez");
    this.recaptchaBadge = page.locator(".grecaptcha-badge");
    this.contactUsLink = page.getByRole('link', { name: 'Contact us' });
    this.humanVerificationFailedMessage = page.locator("//div[contains(@class, 'alert') and contains(text(), 'Human verification failed')]");
    this.invalidUserNameAndPasswordError = page.locator("//div[contains(@class, 'alert') and contains(text(), 'Invalid username/password')]");
    // this.errorDuringLoginMessage = page.locator("//h6[@data-testid='styled-text-div']/span[contains(text(), 'Error during login')]"); 
    this.errorDuringLoginMessage = page.getByText('Error during login', { exact: true });
  }

  async login(email, password) {
    await this.type(this.emailInput, email);
    await this.type(this.passwordInput, password);
    await this.signInButton.click();
  }
  
}

module.exports = { LoginPage };