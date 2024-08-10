Feature: User Login
  As a registered user
  I want to log in to my account
  So that I can access my meetings

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter valid login credentials
    And I submit the login form
    Then I should be redirected to the dashboard
    And I should see a welcome message

  Scenario: Login with invalid credentials
    Given I am on the login page
    When I enter invalid login credentials
    And I submit the login form
    Then I should see a login error message
