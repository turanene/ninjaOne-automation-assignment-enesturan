const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { getOtpCode } = require('../../support/totpGenerator');
require('dotenv').config();

let apiResponse;
let mfaResponse;
let loginToken;
let otp;

When('I send a login request with email {string} and password {string}', async function (email, password) {
  apiResponse = await this.page.request.post('https://app.ninjarmm.com/ws/account/login', {
    headers: { 'content-type': 'application/json' },
    data: { email, password, staySignedIn: false }
  });

  console.log("Status:", apiResponse.status());
  console.log("Preview:", (await apiResponse.text()).slice(0, 300));
});

When('I send a login request using API credentials', async function () {
  const email = process.env.API_EMAIL;
  const password = process.env.API_PASSWORD;

  if (!email || !password) {
    throw new Error("Missing API_EMAIL or API_PASSWORD in .env");
  }

  apiResponse = await this.page.request.post('https://app.ninjarmm.com/ws/account/login', {
    headers: { 'content-type': 'application/json' },
    data: { email, password, staySignedIn: false }
  });

  const body = await apiResponse.json();
  console.log("Login response:", body);

  if (body.loginToken) {
    loginToken = body.loginToken;
    console.log("Saved loginToken:", loginToken);
  }
});

Given('I have a valid MFA OTP', async function () {
  const secret = process.env.NINJAONE_API_MFA;
  if (!secret) throw new Error("Missing NINJAONE_API_MFA in .env");

  otp = getOtpCode(secret);
  console.log("Generated OTP:", otp);
});

When('I send an MFA verification request', async function () {
  if (!loginToken) throw new Error("Missing loginToken, run login scenario first!");

  mfaResponse = await this.page.request.post('https://app.ninjarmm.com/ws/account/mfa-login', {
    headers: { 'content-type': 'application/json' },
    data: {
      loginToken,
      code: otp
    }
  });

  console.log("MFA Response status:", mfaResponse.status());
  console.log("Preview:", (await mfaResponse.text()).slice(0, 300));
});

Then('the response should have status {int}', async function (expectedStatus) {
  const resp = mfaResponse || apiResponse;
  const actual = resp.status();

  console.log(`Actual status: ${actual}, Expected: ${expectedStatus}`);
  if (actual !== expectedStatus) {
    console.warn(`API returned ${actual} instead of ${expectedStatus}`);
  }

  expect(actual).toBe(expectedStatus);
});

Then('the response JSON should contain a {string} field as {string}', async function (field, expectedValue) {
  const body = await apiResponse.json();
  console.log("Full Body:", JSON.stringify(body, null, 2));

  let actual = body[field] || body.result?.[field];
  if (typeof actual === 'boolean') {
    actual = actual.toString();
  }

  expect(actual).toBe(expectedValue);
});

Then('the response JSON should include an error for {string}', async function (fieldName) {
  const body = await apiResponse.json();
  const errors = body?.errors || body;
  const hasError = Array.isArray(errors) && errors.some(e => e.path?.includes(fieldName));

  expect(hasError).toBe(true);
});

Then('the response JSON should indicate success', async function () {
  const body = await mfaResponse.json().catch(async () => {
    const text = await mfaResponse.text();
    throw new Error(`Response is not valid JSON. Raw: ${text}`);
  });

  console.log("MFA Body:", body);

  expect(
    body.succeeded === true || body.resultCode === "SUCCESS"
  ).toBeTruthy();
});