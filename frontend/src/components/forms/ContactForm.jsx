import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { submitServiceRequest } from '../../api/client'

const ContactForm = ({ serviceType = 'general' }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)

    try {
      await submitServiceRequest({
        ...formData,
        serviceType,
      })
      navigate('/success')
    } catch (error) {
      console.error('Form submission error:', error)
      navigate('/error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="bg-midnight-surface border border-soft-border rounded-card p-8"
    >
      <div className="space-y-6">
        {/* Name */}
        <Input
          label="Full Name *"
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          error={!!errors.name}
          helperText={errors.name}
          disabled={loading}
        />

        {/* Email */}
        <Input
          label="Email Address *"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="[email protected]"
          error={!!errors.email}
          helperText={errors.email}
          disabled={loading}
        />

        {/* Company */}
        <Input
          label="Company Name"
          id="company"
          name="company"
          type="text"
          value={formData.company}
          onChange={handleChange}
          placeholder="Your Company (Optional)"
          disabled={loading}
        />

        {/* Phone */}
        <Input
          label="Phone Number"
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+91 98765 43210"
          disabled={loading}
        />

        {/* Message */}
        <div>
          <label 
            htmlFor="message" 
            className="block text-sm font-medium text-pure-white mb-2"
          >
            Project Details *
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your project requirements..."
            disabled={loading}
            className={`input-field resize-none ${errors.message ? 'input-error' : ''}`}
          />
          {errors.message && (
            <p className="mt-2 text-sm text-error-light">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          variant="primary" 
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </Button>
      </div>
    </motion.form>
  )
}

export default ContactForm
