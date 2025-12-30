import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'

const Error = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-space-black px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 bg-error-red/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg 
            className="w-12 h-12 text-error-red" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-pure-white mb-4">
          Submission Failed
        </h1>
        
        <p className="text-cool-gray text-lg mb-8 leading-relaxed">
          We encountered an error processing your request. Please try again 
          or contact us directly at{' '}
          <a 
            href="mailto:contact@devstudio.com" 
            className="text-electric-blue hover:text-electric-blue-hover transition-colors"
          >
            contact@devstudio.com
          </a>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="ghost">
              Return Home
            </Button>
          </Link>
          <Button variant="primary" onClick={() => navigate(-1)}>
            Try Again
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default Error
