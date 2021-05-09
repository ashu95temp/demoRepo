Feature: Fill out and validate text input field

    @sanity
    Scenario Outline: Fill out and validate text input field scenario
        Given I launch the url "<url>"
        When I enter "<name>" into the input field "nameInputField"
        Then I verify text appear within "nameInputField" matches with the entered text "<name>"

        Examples:
            | url                                            | name   |
            | https://devexpress.github.io/testcafe/example/ | daniel |