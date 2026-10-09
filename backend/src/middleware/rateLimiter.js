const rateLimit = require('express-rate-limit');

/**
 * Rate limiter for public enquiry submission (POST /api/enquiries)
 * Limits each IP to 25 enquiries per 15 minutes to avoid spam.
 */
const enquirySubmissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 25, // limit each IP to 25 submissions per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many enquiry submissions from this IP. Please wait a few minutes before trying again.'
  }
});

/**
 * Stricter rate limiter for admin login endpoint (POST /api/admin/login)
 * Prevents brute-force credential stuffing.
 */
const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 failed login attempts per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. For security reasons, please wait 15 minutes before trying again.'
  }
});

module.exports = {
  enquirySubmissionLimiter,
  adminLoginLimiter
};
