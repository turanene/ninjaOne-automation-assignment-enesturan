@ui @loginPageErrorStates
Feature: Login Page Error States

  Background:
    Given I am on the NinjaOne login page

  @errorMessages @errorDuringlogin
  Scenario: Attempt login with empty fields shows error state
    When I click on the Sign in button
    Then I should see the "Error during login" message
    Then the error message should disappear automatically after a few seconds
    And I should not see the MFA page displayed
    And I should not be logged into the dashboard page
  
  @errorMessages @humanVerification
  Scenario: Human verification fails with minimal input
    And I quickly enter a single character into the "email" field
    And I quickly enter a single character into the "password" field
    When I click on the Sign in button
    Then I should see the "Human verification failed. Please try again or contact your system administrator for assistance." message
    

  @negative @errorMessages @invalidCredentials
  Scenario: Invalid credential error message
    Then I wait for the reCAPTCHA to load
    And I enter an invalid email
    And I enter an invalid password
    And I click the "Keep me signed in" checkbox
    When I click on the Sign in button
    Then I should see the "Invalid username/password. Please contact your system administrator for assistance." message
    