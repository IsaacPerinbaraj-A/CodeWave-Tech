import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'

const ServiceModal = ({ service, onClose }) => {
  const navigate = useNavigate()

  const handleRequestService = () => {
    onClose()
    navigate(`/request/${service.id}`)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-midnight-surface rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto relative"
        >
          {/* Gradient Border */}
          <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.color} opacity-50 blur-xl`} />
          <div className={`absolute inset-[2px] rounded-3xl bg-gradient-to-br ${service.color} p-[2px]`}>
            <div className="w-full h-full bg-space-black rounded-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8">
            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center hover:scale-110 transition-transform shadow-lg`}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon & Title */}
            <div className="flex items-start gap-6 mb-6">
              <motion.div 
                className={`w-24 h-24 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-2xl flex-shrink-0`}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-6xl">{service.icon}</span>
              </motion.div>
              
              <div className="flex-1">
                <h2 className={`text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                  {service.name}
                </h2>
                <p className="text-cool-gray text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-pure-white mb-4 flex items-center">
                <span className={`w-1 h-8 bg-gradient-to-b ${service.color} rounded-full mr-3`} />
                What's Included
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features && service.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 bg-midnight-surface rounded-xl p-4 border border-soft-border hover:border-electric-blue/50 transition-colors"
                  >
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-cool-gray">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Why Choose This Service */}
            <div className="bg-midnight-surface rounded-2xl p-6 mb-8 border border-soft-border">
              <h3 className="text-xl font-bold text-pure-white mb-3">Why Choose This Service?</h3>
              <p className="text-cool-gray leading-relaxed">
                Our expert team delivers world-class solutions using cutting-edge technology. 
                We focus on scalability, performance, and user experience to ensure your project 
                exceeds expectations. With transparent communication and agile methodology, 
                you'll be involved every step of the way.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="primary" 
                onClick={handleRequestService}
                className={`flex-1 bg-gradient-to-r ${service.color} border-none hover:opacity-90 text-white font-bold shadow-lg`}
              >
                Request This Service →
              </Button>
              <Button 
                variant="ghost" 
                onClick={onClose}
                className="flex-1"
              >
                Close
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 pt-6 border-t border-soft-border">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className={`text-3xl font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>100%</div>
                  <div className="text-xs text-muted-gray mt-1">Satisfaction</div>
                </div>
                <div>
                  <div className={`text-3xl font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>24/7</div>
                  <div className="text-xs text-muted-gray mt-1">Support</div>
                </div>
                <div>
                  <div className={`text-3xl font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>Fast</div>
                  <div className="text-xs text-muted-gray mt-1">Delivery</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ServiceModal
