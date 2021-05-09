const { After } = require('@cucumber/cucumber');
const moment = require('moment');
import cucumberJson from 'wdio-cucumberjs-json-reporter';

After(function (scenarioResult) {
    console.log('ScenarioResult-START');
    console.log(scenarioResult);
    console.log('ScenarioResult-END');
    if (scenarioResult.result.status !== 1) {
        const timestamp = moment().format('DDMMYYYY-HHmmss.SSS');
        const filepath = `./reports/screenshots/screenshot-${timestamp}.png`;
        let screenshot = browser.saveScreenshot(filepath);
        cucumberJson.attach(browser.takeScreenshot(), 'image/png');
        process.emit('test:screenshot', filepath);
    }
});