 @ui @loginPageInvalidCredentials
 Feature: Login Page Invalid Credentials Login Behaviors

  Background:
    Given I am on the NinjaOne login page


  @negative @invalidCredentials
  Scenario: Sign in with both email and password fields empty
    When I click the "Sign in" button
    Then I should see the "Error during login" message
    And the error message should disappear automatically after a few seconds
    And I should not see the MFA page displayed
    And I should not be logged into the dashboard page

  @negative @invalidCredentials
  Scenario: Sign in with single character in email and password as soon as page loads
    And I quickly enter a single character into the "email" field
    And I quickly enter a single character into the "password" field
    When I click the "Sign in" button
    Then I should see the "Human verification failed. Please try again or contact your system administrator for assistance." message
    And I should not see the MFA page displayed
    And I should not be logged into the dashboard page

  @negative @invalidCredentials @fails
  Scenario: Sign in with invalid email and password
    And I enter an invalid email
    And I enter an invalid password
    When I click on the Sign in button
    Then I should see the "Invalid username/password. Please contact your system administrator for assistance." message
    And I should not see the MFA page displayed
    And I should not be logged into the dashboard page

  @negative @invalidCredentials
  Scenario: Sign in with invalid email (missing domain) and empty password
    When I enter missing domain into the "email" field
    And I leave the "password" field empty
    And I click the "Sign in" button
    Then I should not see the MFA page displayed
    And I should not be logged into the dashboard page

  @negative @invalidCredentials
  Scenario: Sign in with password only
    When I leave the "email" field empty
    And I enter "somepassword" into the "password" field
    And I click the "Sign in" button
    Then I should see the "Error during login" message
    And the error message should disappear automatically after a few seconds
    And I should not see the MFA page displayed
    And I should not be logged into the dashboard page

  @negative @invalidCredentials @toast
  Scenario: Sign in with email only
    When I enter "user@example.com" into the "email" field
    And I leave the "password" field empty
    And I click on the Sign in button
    Then I should see the "Error during login" message
    And the error message should disappear automatically after a few seconds
    And I should not see the MFA page displayed
    And I should not be logged into the dashboard page

  @negative @whitespace @fails
  Scenario: Attempt login with valid email address containing whitespace
    When I enter a valid email address with leading or trailing whitespace
    And I enter a valid password
    And I click on the Sign in button
    Then I should see the "Invalid username/password. Please contact your system administrator for assistance." message
    And I should not see the MFA page displayed
    And I should not be logged into the dashboard page
    