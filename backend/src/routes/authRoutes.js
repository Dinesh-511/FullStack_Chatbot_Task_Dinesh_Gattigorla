const express = require('express');
const router = express.Router();
const { loginAdmin, verifyAdminSession } = require('../controllers/authController');
const { requireAdminAuth } = require('../middleware/authMiddleware');
const { adminLoginLimiter } = require('../middleware/rateLimiter');

// Admin login route (rate limited)
router.post('/login', adminLoginLimiter, loginAdmin);

// Verify existing admin token
router.get('/verify', requireAdminAuth, verifyAdminSession);

module.exports = router;
