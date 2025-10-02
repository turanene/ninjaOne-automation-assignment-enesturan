const { authenticator } = require("otplib");

const getOtpCode = (secret) => {
  return authenticator.generate(secret);
};

module.exports = { getOtpCode };