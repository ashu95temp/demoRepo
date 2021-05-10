import { Given, When, Then } from '@cucumber/cucumber';
const expect = require('chai').expect;
import cucumberJson from 'wdio-cucumberjs-json-reporter';

Given("I am on the zero bank's login page", function () {
    browser.url('http://zero.webappsecurity.com/index.html');
    cucumberJson.attach(browser.takeScreenshot(), 'image/png');
    cucumberJson.attach('Screenshot taken!');
});

When(/^I login with username (.*) and password (.*)$/, function (username, pwd) {
    $(locators.basePage_signIn_button).waitForExist();
    $(locators.basePage_signIn_button).click();
    $(locators.loginPage_username_inputFiled).waitForExist();
    $(locators.loginPage_username_inputFiled).setValue(username);
    $(locators.loginPage_password_inputFiled).waitForExist();
    $(locators.loginPage_password_inputFiled).setValue(pwd);
    cucumberJson.attach(browser.takeScreenshot(), 'image/png');
    browser.pause(3000);
    $(locators.loginPage_signIn_button).click();
    browser.pause(3000);
});

Then(/^I should( not)? be displayed with zero bank's logged in home page$/, function (falseCase) {
    cucumberJson.attach(browser.takeScreenshot(), 'image/png');
    let isAccounSummaryTabDisplayed = $(locators.homePage_accountSummaryTab_link).isDisplayed();
    if (falseCase) {
        expect(isAccounSummaryTabDisplayed, 'Account Summary Tab is displayed on home page but it should not.').to.be.false;
        // expect(isAccounSummaryTabDisplayed).to.be.equal(false, 'Account Summary Tab is displayed on home page but it should not.');
    } else {
        expect(isAccounSummaryTabDisplayed, 'Account Summary Tab is not displayed on home page but it should.').to.be.true;
        // expect(isAccounSummaryTabDisplayed).to.be.equal(true, 'Account Summary Tab is not displayed on home page but it should.');
    }    
});

Then(/^I logout from zero bank application(?: if login was successful)?$/, function () {
    if ($(locators.homePage_usernameDropdown_link).isDisplayed() && (!$(locators.loginPage_signIn_button).isDisplayed())) {
        $(locators.homePage_usernameDropdown_link).waitForExist();
        $(locators.homePage_usernameDropdown_link).click();
        $(locators.homePage_usernameDropdown_logoutOption).waitForExist();
        $(locators.homePage_usernameDropdown_logoutOption).click();
    }
});