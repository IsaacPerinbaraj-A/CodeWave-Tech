const ServiceRequest = require('../models/ServiceRequest');
const { sendEmail } = require('../utils/email');

// @desc    Create new service request
// @route   POST /api/requests
// @access  Public
exports.createRequest = async (req, res) => {
  try {
    const { name, email, company, phone, serviceType, message } = req.body;

    // Create request
    const request = await ServiceRequest.create({
      name,
      email,
      company,
      phone,
      serviceType,
      message,
    });

    // Send confirmation email to client
    try {
      await sendEmail({
        to: email,
        subject: 'Service Request Received - DevStudio',
        html: `
          <h1>Thank you for your request!</h1>
          <p>Hi ${name},</p>
          <p>We've received your request for <strong>${serviceType}</strong>.</p>
          <p>Our team will review it and get back to you within 24 hours.</p>
          <br/>
          <p>Best regards,<br/>DevStudio Team</p>
        `,
      });

      // Send notification to admin
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Service Request - ${serviceType}`,
        html: `
          <h2>New Service Request</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Service:</strong> ${serviceType}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Request submitted successfully',
      data: request,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message,
    });
  }
};

// @desc    Get all service requests
// @route   GET /api/requests
// @access  Private (Admin)
exports.getRequests = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = {};
    if (status) query.status = status;

    const requests = await ServiceRequest.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await ServiceRequest.countDocuments(query);

    res.status(200).json({
      success: true,
      data: requests,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get single service request
// @route   GET /api/requests/:id
// @access  Private (Admin)
exports.getRequest = async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found',
      });
    }

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Update service request
// @route   PUT /api/requests/:id
// @access  Private (Admin)
exports.updateRequest = async (req, res) => {
  try {
    const request = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found',
      });
    }

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Delete service request
// @route   DELETE /api/requests/:id
// @access  Private (Admin)
exports.deleteRequest = async (req, res) => {
  try {
    const request = await ServiceRequest.findByIdAndDelete(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Request deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get analytics/stats
// @route   GET /api/requests/stats
// @access  Private (Admin)
exports.getStats = async (req, res) => {
  try {
    const totalRequests = await ServiceRequest.countDocuments();
    const pendingRequests = await ServiceRequest.countDocuments({ status: 'pending' });
    const inProgressRequests = await ServiceRequest.countDocuments({ status: 'in-progress' });
    const completedRequests = await ServiceRequest.countDocuments({ status: 'completed' });

    // Requests by service type
    const byService = await ServiceRequest.aggregate([
      {
        $group: {
          _id: '$serviceType',
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        total: totalRequests,
        pending: pendingRequests,
        inProgress: inProgressRequests,
        completed: completedRequests,
        byService,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};
