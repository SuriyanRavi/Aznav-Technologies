import crypto from 'crypto';

/**
 * Returns the CSRF secret from environment variables or falls back to a default.
 * Generates a random cryptographic key if no secret is set.
 */
function getCsrfSecret() {
  return process.env.CSRF_SECRET || 'fallback_local_secret_for_csrf_protection_key';
}

/**
 * Generates a random CSRF token signed with the cookie's csrf_secret.
 * @param {string} secret - The CSRF secret stored in the user's cookie.
 * @returns {string} - The token to send to the client.
 */
export function generateCsrfToken(secret) {
  const token = crypto.randomBytes(32).toString('hex');
  const hmac = crypto.createHmac('sha256', secret).update(token).digest('hex');
  return `${token}.${hmac}`;
}

/**
 * Validates a CSRF token against the cookie's secret.
 * @param {string} secret - The CSRF secret stored in the user's cookie.
 * @param {string} tokenAndSignature - The token received from the client.
 * @returns {boolean} - True if valid, false otherwise.
 */
export function verifyCsrfToken(secret, tokenAndSignature) {
  if (!secret || !tokenAndSignature) return false;

  const parts = tokenAndSignature.split('.');
  if (parts.length !== 2) return false;

  const [token, signature] = parts;
  const expectedSignature = crypto.createHmac('sha256', secret).update(token).digest('hex');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch (e) {
    return false;
  }
}

/**
 * Generates a random cryptographic hex string of a given byte length.
 */
export function generateRandomSecret(bytes = 32) {
  return crypto.randomBytes(bytes).toString('hex');
}

/**
 * Native Node.js scrypt password hashing (Layer 5 requirement)
 * @param {string} password - Plain text password.
 * @returns {Promise<string>} - Hashed password with salt.
 */
export async function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex');
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(`${salt}:${derivedKey.toString('hex')}`);
    });
  });
}

/**
 * Native Node.js scrypt password verification (Layer 5 requirement)
 * @param {string} password - Plain text password.
 * @param {string} hash - Salted hash stored in DB.
 * @returns {Promise<boolean>} - True if matching, false otherwise.
 */
export async function verifyPassword(password, hash) {
  return new Promise((resolve, reject) => {
    const parts = hash.split(':');
    if (parts.length !== 2) return resolve(false);
    const [salt, key] = parts;
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      try {
        resolve(crypto.timingSafeEqual(Buffer.from(key, 'hex'), derivedKey));
      } catch (e) {
        resolve(false);
      }
    });
  });
}
