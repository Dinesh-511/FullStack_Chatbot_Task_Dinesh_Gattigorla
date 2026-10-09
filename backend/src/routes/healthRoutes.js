const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

/**
 * Health check endpoint for monitoring system and DB availability
 * @route GET /api/health
 */
router.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

  res.status(200).json({
    success: true,
    message: 'DroneTV AI Support & Lead Assistant API is operational',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    database: dbStatus
  });
});

module.exports = router;
