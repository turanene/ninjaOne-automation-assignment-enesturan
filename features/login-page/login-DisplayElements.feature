@ui @loginPageDisplayElements
Feature: Login Page Display Validation

  Background:
    Given I am on the NinjaOne login page

  @smoke @displayElements
  Scenario: All essential login page elements should be visible
    Then I should see the NinjaOne logo
    And I should see the "Email" input field
    And I should see the "Password" input field
    And I should see the "Keep me signed in" checkbox
    And I should see the "Sign in" button
    And I should see the "Forgot your password?" link
    And I should see the "Do not have an account?" link
    And I should see the "Contact us" link