class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async click(selectorOrLocator) {
    if (typeof selectorOrLocator === "string") {
      await this.page.click(selectorOrLocator);
    } else {
      await selectorOrLocator.click();
    }
  }

  async type(selectorOrLocator, text) {
    if (typeof selectorOrLocator === "string") {
      await this.page.fill(selectorOrLocator, text);
    } else {
      await selectorOrLocator.fill(text);
    }
  }

  async getText(selectorOrLocator) {
    if (typeof selectorOrLocator === "string") {
      return await this.page.textContent(selectorOrLocator);
    } else {
      return await selectorOrLocator.textContent();
    }
  }

  async isVisible(selectorOrLocator) {
    if (typeof selectorOrLocator === "string") {
      return await this.page.isVisible(selectorOrLocator);
    } else {
      return await selectorOrLocator.isVisible();
    }
  }

  async isChecked(selectorOrLocator) {
    if (typeof selectorOrLocator === "string") {
      return await this.page.isChecked(selectorOrLocator);
    } else {
      return await selectorOrLocator.isChecked();
    }
  }

  async check(selectorOrLocator) {
    if (typeof selectorOrLocator === "string") {
      if (!(await this.page.isChecked(selectorOrLocator))) {
        await this.page.check(selectorOrLocator);
      }
    } else {
      if (!(await selectorOrLocator.isChecked())) {
        await selectorOrLocator.check();
      }
    }
  }

  async uncheck(selectorOrLocator) {
    if (typeof selectorOrLocator === "string") {
      if (await this.page.isChecked(selectorOrLocator)) {
        await this.page.uncheck(selectorOrLocator);
      }
    } else {
      if (await selectorOrLocator.isChecked()) {
        await selectorOrLocator.uncheck();
      }
    }
  }

  async waitForNavigation(urlPart) {
    await this.page.waitForURL(`**${urlPart}**`);
  }

  async waitUntilVisible(selectorOrLocator) {
    if (typeof selectorOrLocator === "string") {
      await this.page.waitForSelector(selectorOrLocator, { state: "visible" });
    } else {
      await selectorOrLocator.waitFor({ state: "visible" });
    }
  }

  async getAttribute(selectorOrLocator, attributeName) {
    if (typeof selectorOrLocator === "string") {
      return await this.page.getAttribute(selectorOrLocator, attributeName);
    } else {
      return await selectorOrLocator.getAttribute(attributeName);
    }
  }
}

module.exports = BasePage;