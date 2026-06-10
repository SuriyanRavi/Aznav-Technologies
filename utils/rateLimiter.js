// In-memory sliding window rate limiter to prevent DOS and brute force attacks

const ipRequests = new Map();

// Clean up stale IPs every 5 minutes to prevent memory leaks
if (typeof global !== 'undefined' && !global.rateLimiterInterval) {
  global.rateLimiterInterval = setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of ipRequests.entries()) {
      const windowMs = 15 * 60 * 1000; // 15 minutes
      const validRequests = data.filter(time => now - time < windowMs);
      if (validRequests.length === 0) {
        ipRequests.delete(ip);
      } else {
        ipRequests.set(ip, validRequests);
      }
    }
  }, 5 * 60 * 1000);
}

/**
 * Throttles requests based on IP address using sliding window.
 * @param {string} ip - Client IP address.
 * @param {number} limit - Maximum number of requests allowed in window.
 * @param {number} windowMs - Time window in milliseconds.
 * @returns {Object} { success: boolean, retryAfter?: number } - retryAfter is in seconds.
 */
export function rateLimit(ip, limit = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();

  if (!ipRequests.has(ip)) {
    ipRequests.set(ip, [now]);
    return { success: true };
  }

  const requests = ipRequests.get(ip);
  const activeRequests = requests.filter(time => now - time < windowMs);

  if (activeRequests.length >= limit) {
    const oldestRequest = activeRequests[0];
    const retryAfter = Math.ceil((windowMs - (now - oldestRequest)) / 1000);
    return {
      success: false,
      retryAfter: retryAfter > 0 ? retryAfter : 1,
    };
  }

  activeRequests.push(now);
  ipRequests.set(ip, activeRequests);
  return { success: true };
}
