@ui @loginPageInputFields
Feature: Login Page Input Field Behaviors

  Background:
    Given I am on the NinjaOne login page

  @field
  Scenario: Email and password fields are present and empty by default
    Then the "email" input field should be visible and empty
    And the "password" input field should be visible and empty

  @field @fails
  Scenario: Email and passowrd input should accept typing
    And I click into the "email" input field
    And I type a valid email address
    And I type a valid password
    Then the typed email should be visible in the "email" input field
    Then the typed password should be hidden and not displayed as plain text

  @field @bug @bugUI @maxlength 
  Scenario: Email and password fields should limit input length
    When I enter a very long string into the "email" and "password" fields
    Then the input should be trimmed or rejected beyond the allowed length