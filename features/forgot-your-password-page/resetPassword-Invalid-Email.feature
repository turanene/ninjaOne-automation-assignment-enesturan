@ui @invalidEmail
Feature: Prevent reset password flow with invalid email input

  Background:
    Given I am on the NinjaOne reset password page
    And I open the identity method dropdown
    And I select "Email" from the identity method dropdown

  @negative @invalid @email
  Scenario: User enters a non-existent email
    When I enter an invalid email into the email input field
    And I click the send button
    Then I should not proceed to the verification step

  @negative @invalid @email @format
  Scenario: User enters an email without a domain
    When I enter an invalid no-domain email into the email input field
    And I click the send button
    Then I should not proceed to the verification step

  @negative @invalid @email @whitespace
  Scenario: User enters an email with whitespace
    When I enter an invalid whitespace email into the email input field
    And I click the send button
    Then I should not proceed to the verification step

  @negative @invalid @email @blank
  Scenario: User submits the form with empty email field
    When I leave the email input field blank
    And I click the send button
    Then I should not proceed to the verification step

  @negative @invalid @email @leadingwhitespace
  Scenario: User enters a valid email but starts with whitespace
    When I enter a valid email with leading whitespace into the email input field
    And I click the send button
    Then I should not proceed to the verification step
 
  @negative @invalid @email @midwhitespace
  Scenario: User enters a valid email but has whitespace in middle
    When I enter a valid email with middle whitespace into the email input field
    And I click the send button
    Then I should not proceed to the verification step

  @negative @invalid @email @whitespacebeforeat
  Scenario: User enters a valid email but has whitespace before "@"
    When I enter a valid email with whitespace before at into the email input field
    And I click the send button
    Then I should not proceed to the verification step

  @negative @invalid @email @nodomain
  Scenario: User enters a valid email but missing domain name
    When I enter an invalid no-domain email2 into the email input field
    And I click the send button
    Then I should not proceed to the verification step

  @negative @invalid @email @endswithdot
  Scenario: User enters an email that ends with dot after "@"
    When I enter an invalid email ending with dot into the email input field
    And I click the send button
    Then I should not proceed to the verification step

  @negative @invalid @email @noat
  Scenario: User enters a valid email with valid domain name but no "@"
    When I enter an invalid email without at into the email input field
    And I click the send button
    Then I should not proceed to the verification step