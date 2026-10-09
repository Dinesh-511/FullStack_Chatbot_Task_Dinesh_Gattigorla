const mongoose = require('mongoose');
const Enquiry = require('../models/Enquiry');
const { escapeRegex } = require('../utils/sanitize');

/**
 * @desc    Create a new enquiry / lead (Public)
 * @route   POST /api/enquiries
 * @access  Public
 */
const createEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, userType, interest, message } = req.body;

    const newEnquiry = await Enquiry.create({
      name,
      email,
      phone,
      userType,
      interest,
      message,
      status: 'New'
    });

    // Provide short reference id (e.g., DTV-last6chars of ObjectId)
    const referenceId = `DTV-${newEnquiry._id.toString().slice(-6).toUpperCase()}`;

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your enquiry has been received.',
      data: {
        _id: newEnquiry._id,
        referenceId,
        name: newEnquiry.name,
        email: newEnquiry.email,
        phone: newEnquiry.phone,
        userType: newEnquiry.userType,
        interest: newEnquiry.interest,
        status: newEnquiry.status,
        createdAt: newEnquiry.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all enquiries with filters, search, and pagination (Admin only)
 * @route   GET /api/enquiries
 * @access  Private (Admin)
 */
const getEnquiries = async (req, res, next) => {
  try {
    const {
      search = '',
      userType = '',
      status = '',
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;

    const query = {};

    // Filter by userType (Student, Customer, Other)
    if (userType && ['Student', 'Customer', 'Other'].includes(userType)) {
      query.userType = userType;
    }

    // Filter by status (New, Contacted, In Progress, Closed)
    if (status && ['New', 'Contacted', 'In Progress', 'Closed'].includes(status)) {
      query.status = status;
    }

    // Search across name, email, phone, message, interest safely
    if (search && search.trim() !== '') {
      const safeSearch = escapeRegex(search.trim());
      const searchRegex = new RegExp(safeSearch, 'i');
      query.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { interest: searchRegex },
        { message: searchRegex }
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    const sortOrder = order === 'asc' ? 1 : -1;
    const sortField = ['createdAt', 'name', 'status', 'userType'].includes(sortBy) ? sortBy : 'createdAt';

    // Fetch data and counts in parallel
    const [enquiries, total, countsByStatus] = await Promise.all([
      Enquiry.find(query)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Enquiry.countDocuments(query),
      // Aggregate status summary for dashboard metric cards
      Enquiry.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ])
    ]);

    // Format status metrics
    const metrics = {
      total: await Enquiry.countDocuments(),
      new: 0,
      contacted: 0,
      inProgress: 0,
      closed: 0
    };

    countsByStatus.forEach((item) => {
      if (item._id === 'New') metrics.new = item.count;
      if (item._id === 'Contacted') metrics.contacted = item.count;
      if (item._id === 'In Progress') metrics.inProgress = item.count;
      if (item._id === 'Closed') metrics.closed = item.count;
    });

    res.status(200).json({
      success: true,
      data: enquiries,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum) || 1
      },
      metrics
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single enquiry by ID (Admin only)
 * @route   GET /api/enquiries/:id
 * @access  Private (Admin)
 */
const getEnquiryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid enquiry ID format.'
      });
    }

    const enquiry = await Enquiry.findById(id).lean();

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.'
      });
    }

    res.status(200).json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update enquiry (e.g. status) (Admin only)
 * @route   PATCH /api/enquiries/:id or PUT /api/enquiries/:id
 * @access  Private (Admin)
 */
const updateEnquiry = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid enquiry ID format.'
      });
    }

    const updates = {};
    const allowedUpdates = ['status', 'name', 'email', 'phone', 'userType', 'interest', 'message'];

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid update fields provided.'
      });
    }

    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedEnquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully.',
      data: updatedEnquiry
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete enquiry (Admin only)
 * @route   DELETE /api/enquiries/:id
 * @access  Private (Admin)
 */
const deleteEnquiry = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid enquiry ID format.'
      });
    }

    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);

    if (!deletedEnquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully.',
      data: {
        _id: id
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry
};
