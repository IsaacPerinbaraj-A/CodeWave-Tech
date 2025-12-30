import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { createServiceRequest } from '../services/requestService'

const ServiceRequest = () => {
  const { serviceId } = useParams()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const serviceNames = {
    'web-development': 'Web Development',
    'mobile-apps': 'Mobile Applications',
    'cloud-solutions': 'Cloud Solutions',
    'ai-integration': 'AI Integration',
    'blockchain': 'Blockchain & Web3',
    'ui-ux': 'UI/UX Design',
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const requestData = {
        ...formData,
        serviceType: serviceId,
      }

      await createServiceRequest(requestData)
      
      // Success - redirect to success page
      navigate('/success')
    } catch (err) {
      setError(err.message || 'Failed to submit request. Please try again.')
      console.error('Request submission error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-space-black pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-pure-white mb-4">
            Request{' '}
            <span className="text-gradient-blue">
              {serviceNames[serviceId] || 'Service'}
            </span>
          </h1>
          <p className="text-cool-gray text-lg">
            Fill out the form below and we'll get back to you within 24 hours
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-midnight-surface rounded-2xl p-8 border border-soft-border"
        >
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />

            <Input
              label="Company Name (Optional)"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your Company"
            />

            <Input
              label="Phone Number (Optional)"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
            />

<div>
              <label className="block text-cool-gray text-sm mb-2">
                Project Details <span className="text-red-400">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project requirements (minimum 10 characters)..."
                required
                rows={6}
                className="w-full px-4 py-3 bg-soft-border/30 border border-soft-border rounded-xl text-pure-white placeholder-muted-gray focus:outline-none focus:ring-2 focus:ring-electric-blue transition-all resize-none"
              />
              <p className="text-muted-gray text-xs mt-1">
                {formData.message.length}/10 characters minimum
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate(-1)}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default ServiceRequest
