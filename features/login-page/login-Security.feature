@ui @security @negative
Feature: Login Page Security Login Test

  Background:
    Given I am on the NinjaOne login page

  @sql-injection
  Scenario: Attempt login with SQL injection payload should NOT allow access
    When I enter an SQL injection payload into the "email" field
    And I enter an SQL injection payload into the "password" field
    And I click on the Sign in button
    Then I should not see the MFA page displayed
    And I should not be logged into the dashboard page