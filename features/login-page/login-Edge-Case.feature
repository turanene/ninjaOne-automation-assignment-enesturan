@ui @loginPageEdgeCase
Feature: Login Page Edge Case Behaviors

  Background:
    Given I am on the NinjaOne login page

  @edge @uppercase
  Scenario: Login with email in uppercase and valid password
    When I enter the valid email in uppercase
    And I enter the valid password
    When I click the "Sign in" button
    Then I should see the MFA page displayed
    When I enter the valid MFA
    Then I should be logged into the dashboard page
    
  @edge @uppercase
  Scenario: Login with email and password both in uppercase
    And I enter the valid email in uppercase
    And I enter the valid password in uppercase
    When I click the "Sign in" button
    Then I should not see the MFA page displayed

  @edge @uppercase
  Scenario: Login with email in uppercase and password in lowercase
    And I enter the valid email in uppercase
    And I enter the valid password in lowercase
    When I click the "Sign in" button
    Then I should not see the MFA page displayed

  @edge @lowercase
  Scenario: Login with email in lowercase and password in uppercase
    And I enter the valid email in lowercase
    And I enter the valid password in uppercase
    When I click the "Sign in" button
    Then I should not see the MFA page displayed

  @edge @lowercase
  Scenario: Login with email and password both in lowercase
    And I enter the valid email in lowercase
    And I enter the valid password in lowercase
    When I click the "Sign in" button
    Then I should not see the MFA page displayed