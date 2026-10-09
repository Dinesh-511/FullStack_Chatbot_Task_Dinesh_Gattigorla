const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @desc    Authenticate admin user and return JWT token
 * @route   POST /api/admin/login
 * @access  Public (Rate limited)
 */
const loginAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both username and password.'
      });
    }

    const configuredUsername = process.env.ADMIN_USERNAME || 'admin';
    const configuredPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    // Check username (case-insensitive for convenience)
    if (username.trim().toLowerCase() !== configuredUsername.toLowerCase()) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please verify your username and password.'
      });
    }

    // Compare with bcrypt hash
    let isPasswordMatch = false;
    if (configuredPasswordHash) {
      isPasswordMatch = await bcrypt.compare(password, configuredPasswordHash);
    } else {
      // Fallback dev check if hash wasn't set
      isPasswordMatch = password === 'admin123';
    }

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please verify your username and password.'
      });
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'dronetv_super_secret_jwt_key_2026_dev';
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

    const token = jwt.sign(
      {
        username: configuredUsername,
        role: 'admin'
      },
      jwtSecret,
      { expiresIn }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful. Welcome back, Admin.',
      data: {
        token,
        admin: {
          username: configuredUsername,
          role: 'admin'
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Verify current admin token
 * @route   GET /api/admin/verify
 * @access  Private (Admin)
 */
const verifyAdminSession = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Admin session is active.',
    data: {
      admin: req.admin
    }
  });
};

module.exports = {
  loginAdmin,
  verifyAdminSession
};
