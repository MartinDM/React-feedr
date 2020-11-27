const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
driver.get('http://localhost:3000/').then(function(){

driver.findElement(webdriver.By.className('MuiSvgIcon-root')).click('webdriver\n').then(function(){
    driver.getTitle().then(function(title) {
      console.log(title)
      if(title === 'Feedr') {
         console.log('Test passed');
      } else {
         console.log('Test failed');
      }
     driver.quit();
    });
  });


driver.findElement(webdriver.By.className("tick")).click().then(function(){
  console.log("Marking Task Complete: ")
  driver.findElement(webdriver.By.className("todo-item")).getAttribute("class").then(function(className){
      if(className.includes("done")){
          console.log("Test Passed!")
      }else{
          console.log("Test Failed!")
      }
  })
});

});
