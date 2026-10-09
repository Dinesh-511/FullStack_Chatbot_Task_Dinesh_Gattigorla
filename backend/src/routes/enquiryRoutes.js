const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry
} = require('../controllers/enquiryController');
const {
  validateEnquiryCreate,
  validateEnquiryStatusUpdate
} = require('../validators/enquiryValidators');
const { requireAdminAuth } = require('../middleware/authMiddleware');
const { enquirySubmissionLimiter } = require('../middleware/rateLimiter');

// Public route to submit an enquiry (rate-limited and validated)
router.post('/', enquirySubmissionLimiter, validateEnquiryCreate, createEnquiry);

// Protected Admin routes
router.get('/', requireAdminAuth, getEnquiries);
router.get('/:id', requireAdminAuth, getEnquiryById);
router.patch('/:id', requireAdminAuth, validateEnquiryStatusUpdate, updateEnquiry);
router.put('/:id', requireAdminAuth, updateEnquiry);
router.delete('/:id', requireAdminAuth, deleteEnquiry);

module.exports = router;
