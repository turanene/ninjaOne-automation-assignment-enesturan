@ui @loginCheckbox
Feature: Login Checkbox Functionality

  Background:
    Given I am on the NinjaOne login page

  @checkbox
  Scenario: Checkbox is visible on the login page
    Then I should see the "Keep me signed in" checkbox

  @checkbox 
  Scenario: Checkbox is unchecked by default
    Then the checkbox should be unselected

  @checkbox
  Scenario: Checkbox can be selected and unselected
    When I click the "Keep me signed in" checkbox
    Then the checkbox should be selected
    When I click the "Keep me signed in" checkbox
    Then the checkbox should be unselected


  @checkbox @negative
  Scenario: Login fails but checkbox state remains
    When I enter an invalid email
    And I enter an invalid password
    And I click the "Keep me signed in" checkbox
    And I click on the Sign in button
    And I should see the "Invalid username/password. Please contact your system administrator for assistance." message
    And the checkbox should remain selected

  