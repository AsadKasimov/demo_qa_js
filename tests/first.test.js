const { Builder } = require('selenium-webdriver');
const RegistrationPage = require('../pages/login.js/')

describe('Registration page', () => {
  let driver;
  let registrationPage;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('MicrosoftEdge').build();
    driver.manage().window().setRect({ width: 1100, height: 700 });
    registrationPage = new RegistrationPage(driver);
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('should fill out and submit the registration form', async () => {
    await driver.get('https://demoqa.com/automation-practice-form');

    await registrationPage.enterFirstName('John');
    await registrationPage.enterLastName('Doe');
    await registrationPage.enterEmail('john.doe@example.com');
    await registrationPage.selectGender();
    await registrationPage.enterMobileNumber('1234567890');
    await registrationPage.selectDateOfBirth('1990', '1', '01');
    await registrationPage.enterSubject('Computer Science');
    await registrationPage.selectHobbies();
    await registrationPage.uploadPicture('./img/413874770.jpg');
    await registrationPage.enterCurrentAddress('123 Main St');
    await registrationPage.selectState('NCR');
    await registrationPage.selectCity('Delhi');
    await registrationPage.clickSubmit();

    const expectedValues = [
      'John Doe',
      'john.doe@example.com',
      'Male',
      '1234567890',
      '01 January,1990',
      'Computer Science',
      'Sports',
      '413874770.jpg',
      '123 Main St',
      'NCR Delhi',
    ];

    await registrationPage.verifyFormValues(expectedValues);
  }, 60000); // set timeout value to 60 seconds
});
