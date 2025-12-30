const express = require('express')
const router = express.Router()
const ServiceRequest = require('../models/ServiceRequest')
const { authenticateToken } = require('../middleware/auth')

// Create a new service request (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, company, phone, message, serviceType } = req.body

    // Backend validation
    if (!message || message.trim().length < 10) {
      return res.status(400).json({ 
        message: 'Project details must be at least 10 characters long' 
      })
    }

    const serviceRequest = await ServiceRequest.create({
      name,
      email,
      company,
      phone,
      message,
      serviceType,
    })

    res.status(201).json({
      success: true,
      data: serviceRequest,
    })
  } catch (error) {
    console.error('Create request error:', error)
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message)
      return res.status(400).json({ 
        message: messages.join(', ') 
      })
    }
    
    res.status(500).json({ 
      message: 'Failed to create service request. Please try again.' 
    })
  }
})

// Get all service requests (admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, limit = 50 } = req.query
    
    const filter = {}
    if (status) filter.status = status

    const requests = await ServiceRequest.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))

    res.json({
      success: true,
      data: requests,
    })
  } catch (error) {
    console.error('Get requests error:', error)
    res.status(500).json({ 
      message: 'Failed to fetch requests' 
    })
  }
})

// Get single request (admin only)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id)
    
    if (!request) {
      return res.status(404).json({ 
        message: 'Request not found' 
      })
    }

    res.json({
      success: true,
      data: request,
    })
  } catch (error) {
    console.error('Get request error:', error)
    res.status(500).json({ 
      message: 'Failed to fetch request' 
    })
  }
})

// Update request (admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const request = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!request) {
      return res.status(404).json({ 
        message: 'Request not found' 
      })
    }

    res.json({
      success: true,
      data: request,
    })
  } catch (error) {
    console.error('Update request error:', error)
    res.status(500).json({ 
      message: 'Failed to update request' 
    })
  }
})

// Delete request (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const request = await ServiceRequest.findByIdAndDelete(req.params.id)

    if (!request) {
      return res.status(404).json({ 
        message: 'Request not found' 
      })
    }

    res.json({
      success: true,
      message: 'Request deleted successfully',
    })
  } catch (error) {
    console.error('Delete request error:', error)
    res.status(500).json({ 
      message: 'Failed to delete request' 
    })
  }
})

// Get statistics (admin only)
router.get('/stats/overview', authenticateToken, async (req, res) => {
  try {
    const total = await ServiceRequest.countDocuments()
    const pending = await ServiceRequest.countDocuments({ status: 'pending' })
    const inProgress = await ServiceRequest.countDocuments({ status: 'in-progress' })
    const completed = await ServiceRequest.countDocuments({ status: 'completed' })

    const byService = await ServiceRequest.aggregate([
      {
        $group: {
          _id: '$serviceType',
          count: { $sum: 1 },
        },
      },
    ])

    res.json({
      success: true,
      data: {
        total,
        pending,
        inProgress,
        completed,
        byService,
      },
    })
  } catch (error) {
    console.error('Stats error:', error)
    res.status(500).json({ 
      message: 'Failed to fetch statistics' 
    })
  }
})

module.exports = router