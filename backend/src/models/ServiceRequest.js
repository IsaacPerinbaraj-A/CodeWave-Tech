const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    serviceType: {
      type: String,
      required: [true, 'Service type is required'],
      enum: [
        'web-development',
        'mobile-apps',
        'cloud-solutions',
        'ai-integration',
        'blockchain',
        'ui-ux',
      ],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      minlength: [10, 'Message must be at least 10 characters'],
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'cancelled'],
      default: 'pending',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    estimatedBudget: {
      type: String,
    },
    deadline: {
      type: Date,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
serviceRequestSchema.index({ email: 1, createdAt: -1 });
serviceRequestSchema.index({ status: 1 });

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
