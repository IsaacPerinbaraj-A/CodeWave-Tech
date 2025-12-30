import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'

const Success = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-space-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <span className="text-6xl">✅</span>
        </motion.div>

        <h1 className="text-4xl font-bold text-pure-white mb-4">
          Request Submitted Successfully!
        </h1>
        
        <p className="text-cool-gray text-lg mb-8">
          Thank you for your interest! We've received your service request and will get back to you within 24 hours.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" onClick={() => navigate('/')}>
            Back to Home
          </Button>
          <Button variant="ghost" onClick={() => navigate('/#services')}>
            View Services
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default Success
