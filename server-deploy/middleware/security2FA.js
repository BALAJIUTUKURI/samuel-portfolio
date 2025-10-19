const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

const generate2FASecret = (email) => {
  return speakeasy.generateSecret({
    name: `Samuel Portfolio (${email})`,
    issuer: 'Samuel Paul Portfolio',
    length: 32
  });
};

const generateQRCode = async (secret) => {
  try {
    return await QRCode.toDataURL(secret.otpauth_url);
  } catch (error) {
    throw new Error('Failed to generate QR code');
  }
};

const verify2FAToken = (token, secret) => {
  return speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token,
    window: 2
  });
};

module.exports = { generate2FASecret, generateQRCode, verify2FAToken };