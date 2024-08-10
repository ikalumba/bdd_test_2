Feature: Join a Meeting
  As a user
  I want to join a scheduled meeting
  So that I can participate in the meeting

  Scenario: Successfully join a meeting with a valid meeting ID
    Given I am on the join meeting page
    When I enter a valid meeting ID
    And I submit the join meeting form
    Then I should be redirected to the meeting
    And I should see the meeting interface

  Scenario: Join a meeting with an invalid meeting ID
    Given I am on the join meeting page
    When I enter an invalid meeting ID
    And I submit the join meeting form
    Then I should see an error message indicating the invalid meeting ID
