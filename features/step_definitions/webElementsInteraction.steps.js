import { Given, When, Then } from '@cucumber/cucumber';
import cucumberJson from 'wdio-cucumberjs-json-reporter';

Given(/^I launch the url "([^"]*)?"$/, function (url) {
    browser.url(url);
    browser.pause(2000);
});

When(/^I enter "([^"]*)?" into the input field "([^"]*)?"$/, function (value, selector) {
    if (!locators[selector]) throw new Error(`locator "${selector}" is not defined.`);
    $(locators[selector]).waitForExist();
    $(locators[selector]).setValue(value);
    cucumberJson.attach(browser.takeScreenshot(), 'image/png');
});

Then(/^I verify text appear within "([^"]*)?" matches with the entered text "([^"]*)?"$/, function (selector, expectedValue) {
    if (!locators[selector]) throw new Error(`locator "${selector}" is not defined.`);
    let actualValue = $(locators[selector]).getAttribute('value');
    expect(actualValue).to.be.equal(expectedValue, `Appeared text "${actualValue}" within "${selector}" is not matching with expected text "${expectedValue}".`);
});

When(/^I click on the element "([^"]*)?"$/, function (selector) {
    if (!locators[selector]) throw new Error(`locator "${selector} is not defined."`);
    $(locators[selector]).waitForExist();
    $(locators[selector]).click();
});

Then(/^I should be displayed with "(\d+)" options from "([^"]*)?"$/, function (expectedNumOfOpts, selector) {
    if (!locators[selector]) throw new Error(`locator "${selector}" is not defined.`);
    let actualNumOfOpts = $$(`${locators[selector]} > option`).length;
    expect(actualNumOfOpts).to.be.equal(expectedNumOfOpts, `Expected ${expectedNumOfOpts} options to be displayed but actually displayed with ${actualNumOfOpts} options.`);
});

Then(/^I expect that the element "([^"]*)?" options text matches with the expected options text "([^"]*)?"$/, function (selector, expectedCopyText) {
    if (!locators[selector]) throw new Error(`locator "${selector}" is not defined.`);
    if (!copyText[expectedCopyText]) throw new Error(`copy text for "${expectedCopyText}" is not defined.`);
    let actualNumOfOpts = $$(`${locators[selector]} > option`).length;
    let expectedOptsText = copyText[expectedCopyText];
    for (let i = 0; i < actualNumOfOpts; i++) {
        let text = $(`${locators[selector]} > option:nth-child(${i + 1})`).getText();
        expect(text).to.be.equal(expectedOptsText[i], `Option number ${i + 1}'s text is not matching. Expected text "${expectedOptsText[i]}" but actually got text "${text}".`);
    }
});

When(/^I select the (1st|2nd|3rd|[1-9]\d*0th|(?:[1-9]\d*)?(?:[2-9](?:1st|2nd|3rd)|(?:[4-9]|11|12|13)th)) option from "([^"]*)?"$/, function (index, selector) {
    // let indexNum = parseInt(index.substr(0, index.length - 2)) - 1;
    let indexNum = parseInt(index.match(/\d+/g)[0]) - 1;
    $(locators[selector]).selectByIndex(indexNum);
});

When(/^I select the option with the (name|value|text) "([^"]*)?" from "([^"]*)?"$/, function (method, inputValue, selector) {
    if (!locators[selector]) throw new Error(`locator "${selector}" is not defined.`);
    switch (method) {
        case 'text':
            $(locators[selector]).selectByVisibleText(inputValue);
            break;
        case 'value':
            $(locators[selector]).selectByAttribute('value', inputValue);
            break;
        case 'name':
            $(locators[selector]).selectByAttribute('name', inputValue);
            break;
    }
});

Then(/^I expect that the selected option matches with (1st|2nd|3rd|[1-9]\d*0th|(?:[1-9]\d*)?(?:[2-9](?:1st|2nd|3rd)|(?:[4-9]|11|12|13)th)) option from "([^"]*)?"$/, function (index, selector) {
    if (!locators[selector]) throw new Error(`locator "${selector}" is not defined.`);
    let indexNum = parseInt(index.match(/\d+/g)[0]) - 1;
    let expectedSelectedOptTextFromDOM = $(`${locators[selector]} > option:nth-child(${indexNum + 1})`).getText();
    let elemId = $(locators[selector]).getAttribute('id');
    let actualSelectedOptText = browser.execute((elemId) => {
        return document.getElementById(elemId)[document.getElementById(elemId).selectedIndex].innerText;
    }, elemId);
    expect(actualSelectedOptText).to.be.equal(expectedSelectedOptTextFromDOM, `Selected option text is not displaying in "${selector}" as per DOM element.`);
});

Then(/^I expect that the option with the (name|value|text) "([^"]*)?" matches with the selected option within "([^"]*)?"$/, function (method, inputValue, selector) {
    if (!locators[selector]) throw new Error(`locator "${selector}" is not defined.`);
    let numberOfOpts = $$(`${locators[selector]} > option`).length;
    let expectedSelectedOptText;
    switch (method) {
        case 'text':
            expectedSelectedOptText = inputValue;
            break;
        case 'value':
            for (let i = 0; i < numberOfOpts; i++) {
                let actualValueAttr = $(`${locators[selector]} > option:nth-child(${i + 1})`).getAttribute('value');
                expectedSelectedOptText = actualValueAttr === inputValue ? $(`${locators[selector]} > option:nth-child(${i + 1})`).getText() : '';
                if (expectedSelectedOptText !== '') {
                    break;
                }
            }
            break;
        case 'name':
            for (let i = 0; i < numberOfOpts; i++) {
                let actualNameAttr = $(`${locators[selector]} > option:nth-child(${i + 1})`).getAttribute('name');
                expectedSelectedOptText = actualNameAttr === inputValue ? $(`${locators[selector]} > option:nth-child(${i + 1})`).getText() : '';
                if (expectedSelectedOptText !== '') {
                    break;
                }
            }
            break;
    }
    let elemId = $(locators[selector]).getAttribute('id');
    let actualSelectedOptText = browser.execute((elemId) => {
        return document.getElementById(elemId)[document.getElementById(elemId).selectedIndex].innerText;
    }, elemId);
    expect(actualSelectedOptText).to.be.equal(expectedSelectedOptText, `Expected option text is "${expectedSelectedOptText}" but actually got option text as "${actualSelectedOptText}" within "${selector}".`);
});