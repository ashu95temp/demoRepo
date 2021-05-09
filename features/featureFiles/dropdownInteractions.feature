Feature: Various dropdown interactions

    @appearance
    Scenario Outline: Validating number of options appearance from a dropdown
        Given I launch the url "<url>"
        When I click on the element "<fieldName>"
        Then I should be displayed with "<numberOfOptions>" options from "<fieldName>"
        And I expect that the element "<fieldName>" options text matches with the expected options text "<expectedOptsText>"

        Examples:
            | url                                            | fieldName                       | expectedOptsText                                | numberOfOptions |
            | https://devexpress.github.io/testcafe/example/ | preferredInterfaceDropdownField | preferredInterfaceDropdownFieldExpectedOptsText | 3               |
            | https://www.globalsqa.com/samplepagetest/      | experienceDropdownField         | experienceDropdownFieldExpectedOptsText         | 6               |

    @selectedOptByIndexValidation
    Scenario Outline: Select <optsNum> Option by Index Method from a dropdown and validation of it
        Given I launch the url "<url>"
        When I select the <optsNum> option from "preferredInterfaceDropdownField"
        Then I expect that the selected option matches with <optsNum> option from "preferredInterfaceDropdownField"

        Examples:
            | url                                            | optsNum |
            | https://devexpress.github.io/testcafe/example/ | 2nd     |
            | https://devexpress.github.io/testcafe/example/ | 3rd     |
            | https://devexpress.github.io/testcafe/example/ | 1st     |
            | https://devexpress.github.io/testcafe/example/ | 11st    |

    @selectOptByVisibleTextValidation @sanity
    Scenario Outline: Select <optsVisibleText> option by Visible Text Method from a dropdown and validation of it
        Given I launch the url "<url>"
        When I select the option with the text "<optsVisibleText>" from "preferredInterfaceDropdownField"
        Then I expect that the option with the text "<optsVisibleText>" matches with the selected option within "preferredInterfaceDropdownField"

        Examples:
            | url                                            | optsVisibleText |
            | https://devexpress.github.io/testcafe/example/ | JavaScript API  |
            | https://devexpress.github.io/testcafe/example/ | Both            |
            | https://devexpress.github.io/testcafe/example/ | Command Line    |
            | https://devexpress.github.io/testcafe/example/ | Javascript API  |


    @selectOptByValueAttrValidation
    Scenario Outline: Select <optsValueAttr> option by Value Attribute Method from a dropdown and validation of it
        Given I launch the url "<url>"
        When I select the option with the value "<optsValueAttr>" from "experienceDropdownField"
        Then I expect that the option with the value "<optsValueAttr>" matches with the selected option within "experienceDropdownField"

        Examples:
            | url                                       | optsValueAttr |
            | https://www.globalsqa.com/samplepagetest/ | 0-1           |
            | https://www.globalsqa.com/samplepagetest/ | 7-10          |
            | https://www.globalsqa.com/samplepagetest/ | 1-3           |
            | https://www.globalsqa.com/samplepagetest/ | 5-7           |
            | https://www.globalsqa.com/samplepagetest/ | 3-5           |
            | https://www.globalsqa.com/samplepagetest/ | 10+           |
            | https://www.globalsqa.com/samplepagetest/ | 10-12         |
