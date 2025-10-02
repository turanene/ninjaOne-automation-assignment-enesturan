const { setWorldConstructor } = require('@cucumber/cucumber');

class CustomWorld {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.loginPage = null;
    this.resetPasswordPage = null;
    this.result = null;
  }
}

setWorldConstructor(CustomWorld);