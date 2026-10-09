/**
 * Frontend Form Validators
 * ============================================================================
 * Mirrors the backend express-validator rules for seamless inline validation
 * on both the contact form and the in-chat enquiry drawer.
 * ============================================================================
 */

// Regex for valid Indian mobile phone numbers (10 digits starting with 6-9, optional +91 prefix)
export const INDIAN_PHONE_REGEX = /^(?:\+91[\-\s]?)?[6-9]\d{9}$/;

// Standard RFC-compliant email regex
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate a single enquiry form field
 * 
 * @param {string} fieldName - Name of the field being validated
 * @param {string} value - Current field value
 * @returns {string} Error message, or empty string if valid
 */
export const validateField = (fieldName, value) => {
  const trimmed = typeof value === 'string' ? value.trim() : '';

  switch (fieldName) {
    case 'name':
      if (!trimmed) return 'Full name is required';
      if (trimmed.length < 2) return 'Name must be at least 2 characters';
      if (trimmed.length > 100) return 'Name cannot exceed 100 characters';
      return '';

    case 'email':
      if (!trimmed) return 'Email address is required';
      if (!EMAIL_REGEX.test(trimmed)) return 'Please enter a valid email address (e.g. name@example.com)';
      if (trimmed.length > 120) return 'Email cannot exceed 120 characters';
      return '';

    case 'phone':
      if (!trimmed) return 'Phone number is required';
      if (!INDIAN_PHONE_REGEX.test(trimmed)) {
        return 'Please enter a valid 10-digit Indian mobile number (e.g. 9820123456 or +91-9820123456)';
      }
      return '';

    case 'userType':
      if (!trimmed) return 'Please select whether you are a Student, Customer, or Other';
      if (!['Student', 'Customer', 'Other'].includes(trimmed)) {
        return 'Invalid user type selection';
      }
      return '';

    case 'interest':
      if (!trimmed) return 'Please select or specify a service or course of interest';
      if (trimmed.length < 2) return 'Interest must be at least 2 characters';
      if (trimmed.length > 150) return 'Interest cannot exceed 150 characters';
      return '';

    case 'message':
      if (!trimmed) return 'Please provide a short description of your enquiry';
      if (trimmed.length < 5) return 'Message must be at least 5 characters long';
      if (trimmed.length > 2000) return 'Message cannot exceed 2000 characters';
      return '';

    default:
      return '';
  }
};

/**
 * Validate entire enquiry form data object
 * 
 * @param {Object} formData - Key-value pair of all form fields
 * @returns {{ isValid: boolean, errors: Object }} Validation result and error map
 */
export const validateEnquiryForm = (formData) => {
  const errors = {};
  const fields = ['name', 'email', 'phone', 'userType', 'interest', 'message'];

  fields.forEach((field) => {
    const error = validateField(field, formData[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
