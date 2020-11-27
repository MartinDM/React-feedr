var assert = require('assert')
const webdriver = require('selenium-webdriver');
const appUrl = "http://localhost:3000/";

describe('Feedr Test', async function() {

  var driver;
  before(function() {
    driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
  });

  it('add a task', function() {
    driver.get(appUrl);
    driver.findElement(webdriver.By.className('js-todo-input')).then(()=>{
      driver.getPageSource().then(source=>{
        assert.equal(source.includes("Build App"), true)
      })
    });
  }) 
  
}); 
