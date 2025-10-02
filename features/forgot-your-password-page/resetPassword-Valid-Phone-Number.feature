@ui @validPhoneNumber
Feature: Reset Password via Text - Valid Scenarios

  Background:
    Given I am on the NinjaOne login page
    And I click on the "Forgot your password?" link
    And I am on the NinjaOne reset password page
    And I open the identity method dropdown
    And I select "Text" from the identity method dropdown

  @positive @text
  Scenario: User enters a valid phone number (last four digits)
    When I enter the valid last four digits into the phone number input field
    And I click the send button
    Then I should not proceed to the verification step
  
  @positive @text @hmm
  Scenario: User submits the form with valid email and valid phone number
    When I enter the valid email into the email input field
    And I enter the valid last four digits into the phone number input field
    And I click the send button
    Then I should be taken to the verification code input step