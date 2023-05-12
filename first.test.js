const{Builder, By, Key, until}=require('selenium-webdriver')
const path = require('path')
const ks = require('node-key-sender')


async function exap(){
  let driver = await new Builder().forBrowser('MicrosoftEdge').build()
  driver.manage().window().setRect({ width: 1100, height: 700 });

  try{
    await driver.get('https://demoqa.com/automation-practice-form')

    await driver.findElement(By.id('firstName')).sendKeys('selenium')
    await driver.findElement(By.id('lastName')).sendKeys('selen')
    await driver.findElement(By.id('userEmail')).sendKeys('selen@gmail.com')
    await driver.findElement(By.xpath("//label[@class='custom-control-label' and text()='Male']")).click()
    await driver.findElement(By.id('userNumber')).sendKeys('7900000000')
    
    await driver.findElement(By.css('#dateOfBirthInput')).click()
    await driver.findElement(By.css('.react-datepicker__year-select>[value="2006"]')).click()
    await driver.findElement(By.css('.react-datepicker__month-select>[value="6"]')).click()
    await driver.findElement(By.css('.react-datepicker__day--023')).click()

    
    let element = await driver.findElement(By.id('subjectsInput'));
    await driver.executeScript("arguments[0].scrollIntoView();", element)

    await driver.findElement(By.id('subjectsInput')).sendKeys('Maths')
    await ks.sendKey('pagedown')
    await ks.sendKey('enter')
    

    await driver.findElement(By.xpath("//label[@class='custom-control-label' and text()='Sports']")).click()

    await driver.findElement(By.id('uploadPicture')).sendKeys(path.resolve('./413874770.jpg'))
    
    await driver.findElement(By.id('currentAddress')).sendKeys('город улица дом')

    await driver.findElement(By.id('react-select-3-input')).sendKeys('NCR')
    await ks.sendKey('enter')
    
    await driver.findElement(By.id('react-select-4-input')).sendKeys('Delhi')
    await ks.sendKey('enter')

    await driver.findElement(By.id('submit')).sendKeys(Key.ENTER)
    
    await new Promise(resolve => setTimeout(resolve, 5000))
    
    

    let expectedValues = ['selenium selen', 'selen@gmail.com', 'Male', '7900000000', '23 July,2006', 'Maths', 'Sports', '413874770.jpg', 'город улица дом', 'NCR Delhi']

    let tdElements = await driver.findElements(By.css('tbody > tr > td'))

    for (let i = 0; i < tdElements.length; i += 2) {
      let actualValue = await tdElements[i + 1].getText()
      let expectedValue = expectedValues[i / 2]

      if (actualValue === expectedValue) {
        console.log(`Value ${actualValue} at index ${i + 1} is correct.`)
      } else {
        console.log(`Value ${actualValue} at index ${i + 1} is incorrect. Expected value is ${expectedValue}`)
      }
    }


  } finally{
    await driver.quit()
  }
}

exap()
