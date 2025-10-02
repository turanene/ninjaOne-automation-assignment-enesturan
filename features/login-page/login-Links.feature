@ui @loginPageExternalLinks
Feature: Login Page External and Support Links

  Background:
    Given I am on the NinjaOne login page

  @smoke @links
  Scenario: Login page links are visible
    Then I should see the "Forgot your password?" link
    And I should see the "Do not have an account?" link
    And I should see the "Contact us" link

  @smoke @links
  Scenario: Forgot your password link redirects to reset password page
    When I click on the "Forgot your password?" link
    Then I should be redirected to the Reset Password page

  @bug @bugUI @links @fails
  Scenario: "Do not have an account?" link redirects incorrectly
    When I click on the "Do not have an account?" link
    But due to a known bug, I am incorrectly redirected elsewhere

  @smoke @links
  Scenario: Contact us link opens support page with contact information
    When I click on the "Contact us" link
    Then a new browser tab should open
    And the page should display the following support contact information:
      | Contact Type        | Email / Handle              |
      | Account Support     | success@ninjaone.com        |
      | Billing             | billing@ninjaone.com        |
      | Sales               | sales@ninjaone.com          |
      | Technical Support   | support@ninjaone.com        |
      | Support             | @ninjarmmsupport            |