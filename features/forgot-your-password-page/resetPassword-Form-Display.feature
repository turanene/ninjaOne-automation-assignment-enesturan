@ui @resetPassword
Feature: Reset Password Page UI and Dropdown Behavior

  Background:
    Given I am on the NinjaOne reset password page

  @display
  Scenario: Email method selected - verify visible elements
    When I open the identity method dropdown
    And I select "Email" from the identity method dropdown
    Then I should see the NinjaOne logo
    And I should see the email input field
    And I should see the send button
    And I should not see the last four digits phone input field

  @display
  Scenario: Text method selected - verify visible elements
    When I open the identity method dropdown
    And I select "Text" from the identity method dropdown
    Then I should see the NinjaOne logo
    And I should see the last 4 digits input field
    And I should see the last four digits phone input field
    And I should see the send button

  @default
  Scenario: Identity method dropdown defaults to Email
    Then the identity method dropdown should display "Email"

  @options
  Scenario: Identity method dropdown has both Email and Text options
    When I open the identity method dropdown
    Then the identity method dropdown should contain "Email"
    And the identity method dropdown should contain "Text"

  @interaction
  Scenario: User selects "Text" from the identity method dropdown
    When I open the identity method dropdown
    And I select "Text" from the identity method dropdown
    Then the identity method dropdown should show "Text" selected

  @interaction
  Scenario: User re-selects "Email" from the identity method dropdown
    When I open the identity method dropdown
    And I select "Text" from the identity method dropdown
    And I open the identity method dropdown
    And I select "Email" from the identity method dropdown
    Then the identity method dropdown should show "Email" selected