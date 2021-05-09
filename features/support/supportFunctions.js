const glob = require('glob');
const yamlMerge = require('merge-yaml');

module.exports = {
    getElements: function () {
        let locators;
        try {
            locators = require('../../locators/commonLocators');
        } catch (err) {
            throw err;
        }
        return locators;
    },
    getSelector: function() {
        let objYamlFiles;
        let objYaml;
        try {
            objYamlFiles = glob.sync('locators/*.yml');
            objYaml = yamlMerge(objYamlFiles);
        } catch (err) {
            throw err;
        }
        return objYaml;
    },
    getCopyText: function() {
        let copyTextYamlFiles;
        let copyTextYaml;
        try {
            copyTextYamlFiles = glob.sync('data/copyText/*.yml');
            copyTextYaml = yamlMerge(copyTextYamlFiles);
        } catch (err) {
            throw err;
        }
        return copyTextYaml;
    },
}