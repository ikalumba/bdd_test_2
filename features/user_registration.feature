Feature: User Registration
  As a new user
  I want to register for an account
  So that I can use the application

  Scenario: Successful registration with valid details
    Given I am on the registration page
    When I enter valid registration details
    And I submit the registration form
    Then I should see a confirmation message
    And I should receive a confirmation email

  Scenario: Registration with already registered email
    Given I am on the registration page
    When I enter an email that is already registered
    And I submit the registration form
    Then I should see an error message
