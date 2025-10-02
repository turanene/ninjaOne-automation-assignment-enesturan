@ui @validEmail
Feature: Reset Password via Email - Valid Scenarios

  Background:
    Given I am on the NinjaOne login page
    And I click on the "Forgot your password?" link
    And I am on the NinjaOne reset password page
    And I open the identity method dropdown
    And I select "Email" from the identity method dropdown

  @positive @email @e1
  Scenario: User enters a valid email
    When I enter the valid email into the email input field
    And I click the send button
    Then I should see recovery email sent message