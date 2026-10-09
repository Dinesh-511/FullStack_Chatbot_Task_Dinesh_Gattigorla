const mongoose = require('mongoose');

/**
 * 404 Not Found handler for unregistered API routes
 */
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found: cannot ${req.method} ${req.originalUrl}`
  });
};

/**
 * Central Express error-handling middleware.
 * Ensures consistent JSON response structure and hides internal stack traces/database details from users.
 */
const errorHandler = (err, req, res, next) => {
  // Always log error internally for developers
  console.error('[Server Error]', {
    method: req.method,
    url: req.originalUrl,
    name: err.name,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });

  // Handle Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).json({
      success: false,
      message: 'Invalid identifier format provided.'
    });
  }

  // Handle Mongoose Schema Validation Errors
  if (err.name === 'ValidationError') {
    const errors = {};
    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });

    return res.status(422).json({
      success: false,
      message: 'Validation failed. Please verify the provided fields.',
      errors
    });
  }

  // Handle JSON parse error (e.g. malformed body)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON payload received in request body.'
    });
  }

  // Custom HTTP status if provided on error object
  const statusCode = err.statusCode || err.status || 500;
  const message = statusCode === 500 
    ? 'Something went wrong on our end. Please try again later.' 
    : err.message || 'An unexpected error occurred.';

  res.status(statusCode).json({
    success: false,
    message
  });
};

module.exports = {
  notFoundHandler,
  errorHandler
};
