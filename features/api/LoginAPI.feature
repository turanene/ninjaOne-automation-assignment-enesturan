@api
Feature: NinjaOne Login API

  @empty400
  Scenario: Login fails with empty credentials
    When I send a login request with email "" and password ""
    Then the response should have status 400
    And the response JSON should include an error for "email"
    And the response JSON should include an error for "password"

  @invalid401 @bug @bugApi
  Scenario: Login fails with invalid credentials
    When I send a login request with email "fake@email.com" and password "wrongpass"
    Then the response should have status 401

  @valid200
  Scenario: Login requires MFA
    When I send a login request using API credentials
    Then the response should have status 200
    And the response JSON should contain a "resultCode" field as "MFA_REQUIRED"

  @mfa200
  Scenario: Login succeeds after MFA verification
    Given I have a valid MFA OTP
    When I send an MFA verification request
    Then the response should have status 200
    And the response JSON should indicate success