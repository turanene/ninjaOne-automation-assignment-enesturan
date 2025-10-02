const BasePage = require("./BasePage.js");

class FreeTrialDemoPage extends BasePage {
constructor(page){
    super(page);
    this.freeTrialDemoButton = page.locator('//a[@href="/freetrialform/"]');
    this.requestMyFreeTrialNowSubmitButton = page.locator('//div[@id="field_submit"]');
    }
}

module.exports = {FreeTrialDemoPage}