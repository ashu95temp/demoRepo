NOTE-1: In package.json file, npm script is mentioned as below:
"scripts": {
    "test": "wdio wdio.conf.js"
}    

1. Run command to execute all feature files whoes path is mentioned in Spec property:
npm run test

2. Run command to execute a specific feature file by mentioning feture file name as CLI option/environment variable:
ff={featureFileName} npm run test

NOTE-2: mention ff as a process environment variable in wdio.conf.js file;
const featureFileName = process.env.ff || '*';
and in exports.config object mention in spec as;
spec: `./features/featureFiles/${featureFileName}.feature`,
EXAMPLE RUN COMMAND: ff=login npm run test

3. Run command to execute a specific scenrio from a feature file mentioning scenario tag name and feture file name as CLI option/environment variable:
ff={featureFileName} tags=@{tagName} npm run test

NOTE-3: mention ff as a process environment variable in wdio.conf.js file;
const featureFileName = process.env.ff || '*';
const tags = process.env.tags || '';
and in exports.config object mention in spec as;
spec: `./features/featureFiles/${featureFileName}.feature`,
and in exports.config object mention in cucumberOpts as;
cucumberOpts: {
    .
    .
    tagExpression: tags,
    .
},
EXAMPLE RUN COMMAND: ff=login tags=@tag1 npm run test

4. Run command to execute a suite mentioning suite name as wdio CLI option:
npm run test -- --suite="{suiteName}"
OR
tags=@{tagName} npm run test -- --suite="{suiteName}"
EXAMPLE RUN COMMAND: npm run test -- --suite="suite1"
OR
EXAMPLE RUN COMMAND: tags=@tag2 npm run test -- --suite="suite1"

===========================================================================================================

Few Useful Keyboard Shortcuts for Visual Studio Code in macOS:
1. To navigate from feature file step line to it's respective step definition function: fn + F12 (Follow below instructions to make this enable)
Instructions to enable navigation from feature file step lin to it's respective step definition function:
a. Install "Cucumber (Gherkin) Full Language Support" VSCode extension
b. Press "Command + ," to open settings
c. Search with "cucumberautocomplete"
d. In search results look for the result "Cucumberautocomplete: Steps"
e. Click on "Edit in settings.json" option under "Cucumberautocomplete: Steps"
f. Paste below content in json file and save the file: (provide the path of the directory which contains step definitions files)
{
    "cucumberautocomplete.steps": [
        "features/step_definitions/*.js"
    ],
    "[feature]": {
        "editor.defaultFormatter": "alexkrechik.cucumberautocomplete"
    }
}"
2. To Format the document(like feature file or step definition file): Option + Shift + F
3. To create a duplicate of any line just above the current line in a file: Option + Shift + Up Arrow Key
4. To create a duplicate of any line just below the current line in a file: Option + Shift + Down Arrow Key
5. To move any line in up direction: Option + Up Arrow Key
6. To move any line in down direction: Option + Down Arrow Key
7. To delete the current line in a file: Command + Shift + K
8. To go to beginning of the file: Command + Up Arrow Key
9. To go to end of the file: Command + Down Arrow Key
10. Column (box) selection: Option + Shift + drag mouse
11. Column (box) selection up: Option + Shift + Command + Up Arrow Key
12. Column (box) selection down: Option + Shift + Command + Down Arrow Key
13. Column (box) selection left: Option + Shift + Command + Left Arrow Key
14. Column (box) selection right: Option + Shift + Command + Right Arrow Key
15. Find: Command + F
16. Replace: Option + Command + F
17. Trim trailing whitespace: Command + K + Command + X
18. 