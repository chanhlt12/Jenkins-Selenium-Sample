const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
var chai = require("chai");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var driver;
var dom;
var $;
describe("home page", function () {
  before(async function () {
    const options = new chrome.Options()
      .headless()
      .addArguments("--headless")
      .addArguments("--no-sandbox")
      .addArguments("--disable-dev-shm-usage");
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
    await driver.get("http://test-server:3000");
    const source = await driver.getPageSource();
    dom = new JSDOM(source);
    $ = require("jquery")(dom.window);
  });
  after(async function () {
    await driver.quit();
  });
  describe("#h1 text verify", function () {
    it("the h1 element text should be 'Express'", async function () {
      const { document } = dom.window;
      const h1Text = document.getElementsByTagName("h1")[0].textContent;
      chai.expect(h1Text).equal("Express", "h1 text should be 'Express'");
    });
  });

  describe("#verify table header", function () {
    it("the header should have 3 columns with correct names", async function () {
      chai
        .expect($("thead tr th").length)
        .equal(3, "table should have 3 columns");
      chai
        .expect($("thead tr th:nth-child(1)").text())
        .equal("#", "1st column header should be '#'");
      chai
        .expect($("thead tr th:nth-child(2)").text())
        .equal("Name", "2nd column header should be 'Name'");
      chai
        .expect($("thead tr th:nth-child(3)").text())
        .equal("Age", "3rd column header should be 'Age'");
    });
  });
});
