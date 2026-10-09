const mongoose = require('mongoose');

/**
 * Enquiry Schema
 * Represents customer and student leads collected via the chatbot and contact forms.
 */
const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      maxlength: [120, 'Email cannot exceed 120 characters']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      maxlength: [20, 'Phone number cannot exceed 20 characters']
    },
    userType: {
      type: String,
      required: [true, 'User type is required'],
      enum: {
        values: ['Student', 'Customer', 'Other'],
        message: 'User type must be Student, Customer, or Other'
      },
      default: 'Customer'
    },
    interest: {
      type: String,
      required: [true, 'Service or course of interest is required'],
      trim: true,
      maxlength: [150, 'Interest cannot exceed 150 characters']
    },
    message: {
      type: String,
      required: [true, 'Enquiry message is required'],
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters']
    },
    status: {
      type: String,
      enum: {
        values: ['New', 'Contacted', 'In Progress', 'Closed'],
        message: 'Status must be New, Contacted, In Progress, or Closed'
      },
      default: 'New'
    }
  },
  {
    timestamps: true
  }
);

// Indexes for high performance querying and filtering on dashboard
enquirySchema.index({ status: 1 });
enquirySchema.index({ userType: 1 });
enquirySchema.index({ createdAt: -1 });

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
