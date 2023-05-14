const { By, Key, until } = require('selenium-webdriver');
const path = require('path')
const ks = require('node-key-sender')



class RegistrationPage {
  constructor(driver) {
    this.driver = driver;
    this.firstNameInput = By.id('firstName');
    this.lastNameInput = By.id('lastName');
    this.emailInput = By.id('userEmail');
    this.genderRadioBtn = By.xpath("//label[@class='custom-control-label' and text()='Male']");
    this.mobileNumberInput = By.id('userNumber');
    this.dateOfBirthInput = By.css('#dateOfBirthInput');
    this.subjectsInput = By.id('subjectsInput');
    this.hobbiesCheckBox = By.xpath("//label[@class='custom-control-label' and text()='Sports']");
    this.uploadPictureInput = By.id('uploadPicture');
    this.currentAddressInput = By.id('currentAddress');
    this.stateDropdown = By.id('react-select-3-input');
    this.cityDropdown = By.id('react-select-4-input');
    this.submitBtn = By.id('submit');
  }

  async enterFirstName(firstName) {
    await this.driver.findElement(this.firstNameInput).sendKeys(firstName);
  }

  async enterLastName(lastName) {
    await this.driver.findElement(this.lastNameInput).sendKeys(lastName);
  }

  async enterEmail(email) {
    await this.driver.findElement(this.emailInput).sendKeys(email);
  }

  async selectGender() {
    await this.driver.findElement(this.genderRadioBtn).click();
  }

  async enterMobileNumber(mobileNumber) {
    await this.driver.findElement(this.mobileNumberInput).sendKeys(mobileNumber);
  }

  async selectDateOfBirth(year, month, day) {
    await this.driver.wait(until.elementLocated(this.dateOfBirthInput), 10000);
        

    await this.driver.findElement(this.dateOfBirthInput).click();
    await this.driver.findElement(By.css(`.react-datepicker__year-select>[value="${year}"]`)).click();
    await this.driver.wait(until.elementLocated(By.css(`.react-datepicker__month-select`)), 10000);
    
    await this.driver.findElement(By.css(`.react-datepicker__month-select>[value="${month}"]`)).click();
    
    await this.driver.findElement(By.css(`.react-datepicker__day--0${day}`)).click();
  }

  async enterSubject(subject) {
    let element = await this.driver.findElement(this.subjectsInput);
    await this.driver.executeScript("arguments[0].scrollIntoView();", element)

    await this.driver.findElement(this.subjectsInput).sendKeys(subject);
    await ks.sendKey('pagedown');
    await ks.sendKey('enter');
  }

  async selectHobbies() {
    await this.driver.findElement(this.hobbiesCheckBox).click();
  }

  async uploadPicture(filepath) {
    await this.driver.findElement(this.uploadPictureInput).sendKeys(path.resolve(filepath));
  }

  async enterCurrentAddress(address) {
    await this.driver.findElement(this.currentAddressInput).sendKeys(address);
  }

  async selectState(state) {
    await this.driver.findElement(this.stateDropdown).sendKeys(state);
    await new Promise(resolve => setTimeout(resolve, 2000));
    await ks.sendKey('enter');
  }

  async selectCity(city) {
    await this.driver.findElement(this.cityDropdown).sendKeys(city);
    await new Promise(resolve => setTimeout(resolve, 2000));
    await ks.sendKey('enter');
  }

  async clickSubmit() {
    await this.driver.findElement(this.submitBtn).sendKeys(Key.ENTER);
  }

  async verifyFormValues(expectedValues) {
    let tdElements = await this.driver.findElements(By.css('tbody > tr > td'));

    for (let i = 0; i < tdElements.length; i += 2) {
      let actualValue = await tdElements[i + 1].getText();
      let expectedValue = expectedValues[i / 2];

      if (actualValue === expectedValue) {
        console.log(`Value ${actualValue} at index ${i + 1} is correct.`);
      } else {
        console.log(`Value ${actualValue} at index ${i + 1} is incorrect. Expected value is ${expectedValue}`);
      }
    }
  }
}

module.exports = RegistrationPage;