const { Builder, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");

describe("home page", function () {
  describe("#title verify", function () {
    it("the title should be 'Express'", async function () {
      const options = new chrome.Options()
        .headless()
        .addArguments("--headless")
        .addArguments("--no-sandbox")
        .addArguments("--disable-dev-shm-usage");
      const driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
      try {
        await driver.get("http://test-server:3000");
        const title = await driver.getTitle();
        assert.strictEqual(title, "Express", "title should be 'Express'");
      } finally {
        await driver.quit();
      }
    });
  });
});
