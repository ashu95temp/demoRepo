Feature: Zero Bank Login Feature

  @tag1
  Scenario Outline: Login with valid credentials scenarios
    Given I am on the zero bank's login page
    When I login with username <username> and password <pwd>
    Then I should be displayed with zero bank's logged in home page
    And I logout from zero bank application if login was successful

    Examples:
      | username | pwd      |
      | username | password |

  @tag2
  Scenario Outline: Login with valid credentials scenarios
    Given I am on the zero bank's login page
    When I login with username <username> and password <pwd>
    Then I should not be displayed with zero bank's logged in home page

    Examples:
      | username | pwd          |
      | username | password1234 |