Feature: Account Summary Details Validation

    @failing
    Scenario Outline: Account Summary Details Validation scenario
        Given I am on the zero bank's login page
        When I login with username <username> and password <pwd>
        Then I should be displayed with zero bank's logged in home page
        And I validate account summary details on the home page

        Examples:
            | username | pwd      |
            | username | password |