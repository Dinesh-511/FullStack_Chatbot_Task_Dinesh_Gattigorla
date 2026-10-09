const { body, validationResult } = require('express-validator');

// Regex for Indian mobile numbers: 10 digits starting with 6, 7, 8, or 9, with optional +91 prefix
const INDIAN_PHONE_REGEX = /^(?:\+91[\-\s]?)?[6-9]\d{9}$/;

/**
 * Middleware to check validation results and return a structured 422 error response
 */
const checkValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Map errors by field name for clean inline frontend display
    const formattedErrors = {};
    errors.array().forEach((err) => {
      // Use err.path (express-validator v7) or fallback to err.param
      const field = err.path || err.param || 'general';
      if (!formattedErrors[field]) {
        formattedErrors[field] = err.msg;
      }
    });

    return res.status(422).json({
      success: false,
      message: 'Validation failed. Please correct the highlighted errors.',
      errors: formattedErrors
    });
  }
  next();
};

/**
 * Validation rules for creating a new enquiry
 */
const validateEnquiryCreate = [
  body('name')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters')
    .escape(),

  body('email')
    .trim()
    .notEmpty().withMessage('Email address is required')
    .isEmail().withMessage('Please enter a valid email address (e.g. name@example.com)')
    .isLength({ max: 120 }).withMessage('Email cannot exceed 120 characters')
    .normalizeEmail(),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(INDIAN_PHONE_REGEX).withMessage('Please enter a valid 10-digit Indian mobile number (e.g. 9820123456 or +91-9820123456)'),

  body('userType')
    .trim()
    .notEmpty().withMessage('User type is required')
    .isIn(['Student', 'Customer', 'Other']).withMessage('User type must be Student, Customer, or Other'),

  body('interest')
    .trim()
    .notEmpty().withMessage('Service or course of interest is required')
    .isLength({ min: 2, max: 150 }).withMessage('Interest must be between 2 and 150 characters')
    .escape(),

  body('message')
    .trim()
    .notEmpty().withMessage('Enquiry message is required')
    .isLength({ min: 5, max: 2000 }).withMessage('Message must be between 5 and 2000 characters')
    .escape(),

  checkValidationErrors
];

/**
 * Validation rules for updating an enquiry status (Admin)
 */
const validateEnquiryStatusUpdate = [
  body('status')
    .trim()
    .notEmpty().withMessage('Status is required')
    .isIn(['New', 'Contacted', 'In Progress', 'Closed']).withMessage('Status must be New, Contacted, In Progress, or Closed'),

  checkValidationErrors
];

module.exports = {
  INDIAN_PHONE_REGEX,
  validateEnquiryCreate,
  validateEnquiryStatusUpdate,
  checkValidationErrors
};
