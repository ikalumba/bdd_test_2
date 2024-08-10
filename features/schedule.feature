Feature: Schedule a Meeting
  As a logged-in user
  I want to schedule a meeting
  So that I can invite participants to join

  Scenario: Successfully schedule a meeting with valid details
    Given I am on the dashboard
    When I navigate to the schedule meeting page
    And I enter valid meeting details
    And I submit the schedule meeting form
    Then I should see a meeting confirmation
    And the meeting should be listed in my upcoming meetings

  Scenario: Schedule a meeting with missing details
    Given I am on the schedule meeting page
    When I enter incomplete meeting details
    And I submit the schedule meeting form
    Then I should see an error message indicating the missing fields
