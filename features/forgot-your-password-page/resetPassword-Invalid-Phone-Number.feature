@ui @invalidPhone
Feature: Reset Password via Text - Invalid Scenarios

  Background:
    Given I am on the NinjaOne reset password page
    And I open the identity method dropdown
    And I select "Text" from the identity method dropdown

  @negative @text @phone
  Scenario: User submits empty phone number field
    When I leave the phone number input field blank
    And I click the send button
    Then I should not proceed to the verification step

  @negative @text @phone @short
  Scenario: User enters less than 4 digits
    When I enter an invalid short phone number into the phone number input field
    And I click the send button
    Then I should not proceed to the verification step

  @negative @text @phone @nonNumeric
  Scenario: User enters non-numeric characters
    When I enter an invalid non-numeric phone number into the phone number input field
    And I click the send button
    Then I should not proceed to the verification step

  @negative @text @phone @whitespace
  Scenario: User enters whitespace in phone number field
    When I enter an invalid whitespace phone number into the phone number input field
    And I click the send button
    Then I should not proceed to the verification step

  @negative @text @phone @wrongDigits
  Scenario: User enters valid format but incorrect digits
    When I enter an invalid wrong phone number into the phone number input field
    And I click the send button
    Then I should not proceed to the verification step