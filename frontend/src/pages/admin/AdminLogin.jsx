import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { login } from '../../services/authService'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    console.log('🔐 Attempting login with:', { email: formData.email, password: '***' })

    try {
      const response = await login(formData)
      console.log('✅ Login response:', response)
      
      if (response.data && response.data.token) {
        localStorage.setItem('adminToken', response.data.token)
        console.log('✅ Token saved, navigating to /admin')
        navigate('/admin')
      } else {
        console.error('❌ No token in response:', response)
        setError('No token received from server')
      }
    } catch (err) {
      console.error('❌ Login error:', err)
      console.error('❌ Error response:', err.response)
      setError(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-space-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 left-20 w-96 h-96 bg-electric-blue rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-neon-cyan rounded-full blur-3xl"
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-midnight-surface/90 backdrop-blur-xl rounded-2xl p-8 border border-soft-border shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-electric-blue to-neon-cyan rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🌊</span>
            </div>
            <h1 className="text-3xl font-bold text-pure-white mb-2">Admin Login</h1>
            <p className="text-cool-gray">Access your dashboard</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
            >
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@codewave.com"
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-cool-gray hover:text-electric-blue transition-colors text-sm"
            >
              ← Back to Website
            </a>
          </div>
        </div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-muted-gray text-sm">
            🔒 Secure admin access only
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AdminLogin