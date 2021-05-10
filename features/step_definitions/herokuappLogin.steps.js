import { Given, When, Then } from '@cucumber/cucumber';

// Given(/^I am on the (\w+) page$/, async (page) => {
//     await browser.url(`https://the-internet.herokuapp.com/${page}`);
// });

// When(/^I login with (\w+) and (.+)$/, async (username, password) => {
//     await (await $('#username')).setValue(username);
//     await (await $('#password')).setValue(password);
//     await (await $('button[type="submit"]')).click();
// });

// Then(/^I should see a flash message saying (.*)$/, async (message) => {
//     await expect($('#flash')).toBeExisting();
//     await expect($('#flash')).toHaveTextContaining(message);
// });

Given(/^I am on the (\w+) page$/, function (page) {
    browser.url(`https://the-internet.herokuapp.com/${page}`);
});

When(/^I login with (\w+) and (.+)$/, function (username, password) {
    $('#username').setValue(username);
    $('#password').setValue(password);
    $('button[type="submit"]').click();
});

Then(/^I should see a flash message saying (.*)$/, function (message) {
    expect($('#flash').isExisting(),`Element '#flash' is not existing on the page`).to.be.true;
    expect($('#flash').getText()).to.have.string(message, `Expected message ${message} is not matching with actual message ${$('#flash').getText()}`);
});
