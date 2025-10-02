const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

let stripAnsi;

Before(async function () {
  this.browser = await chromium.launch({ headless: true });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();

  this.page.setDefaultTimeout(30000);
  this.page.setDefaultNavigationTimeout(30000);

  if (!stripAnsi) {
    stripAnsi = (await import('strip-ansi')).default;
  }
});

After(async function (scenario) {
  this.result = scenario.result;

  await this.page.close();
  await this.context.close();
  await this.browser.close();

  const resultsDir = path.resolve('playwright-report/raw');
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }
  fs.writeFileSync(
    path.join(resultsDir, `result-${Date.now()}.json`),
    JSON.stringify({ status: this.result?.status || 'UNKNOWN' }, null, 2)
  );

  if (scenario.result && scenario.result.message) {
    scenario.result.message = stripAnsi(scenario.result.message);
  }
});