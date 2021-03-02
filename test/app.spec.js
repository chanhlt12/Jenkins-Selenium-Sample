const { Builder, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");

describe("localhost:3000", function () {
  describe("#title verify", function () {
    it("the title should be 'Express'", async function () {
      const options = new chrome.Options().headless();
      const driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
      try {
        await driver.get("http://localhost:3000");
        const title = await driver.getTitle();
        assert.strictEqual(title, "Express", "title should be 'Express'");
      } finally {
        await driver.quit();
      }
    });
  });
});
