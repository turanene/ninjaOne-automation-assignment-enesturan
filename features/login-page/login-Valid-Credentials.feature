@ui @loginPageValidCredentials
Feature: Login Page Valid Credentials Login Behaviour

  Background:
    Given I am on the NinjaOne login page
  
  @ui @positive
  Scenario: Successful login with valid credentials + authenticator
    When I enter a valid email into the "email" field
    And I enter a valid password into the "password" field
    And I click the "Sign in" button
    And I should see the MFA page displayed
    Then I enter the valid MFA
    And I should be logged into the dashboard page