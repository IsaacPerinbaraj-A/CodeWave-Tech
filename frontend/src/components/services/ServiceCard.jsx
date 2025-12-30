import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const ServiceCard = ({ service, index }) => {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -12, scale: 1.03 }}
      onClick={() => navigate(`/services/${service.id}`)}
      className="group relative bg-midnight-surface border border-soft-border rounded-2xl p-6 h-full flex flex-col transition-all duration-300 hover:border-transparent overflow-hidden cursor-pointer"
    >
      {/* Gradient Border on Hover */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-[2px]`}>
        <div className="w-full h-full bg-midnight-surface rounded-2xl" />
      </div>
      
      {/* Glow Effect */}
      <div className={`absolute -inset-2 bg-gradient-to-r ${service.color} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`} />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Animated Icon */}
        <motion.div 
          className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-5xl filter drop-shadow-lg">{service.icon}</span>
        </motion.div>
        
        {/* Title */}
        <h3 className={`text-2xl font-bold text-pure-white mb-3 transition-all duration-300 bg-gradient-to-r ${service.color} bg-clip-text group-hover:text-transparent`}>
          {service.name}
        </h3>
        
        {/* Description */}
        <p className="text-cool-gray mb-6 leading-relaxed flex-grow">
          {service.description}
        </p>
        
        {/* Features */}
        {service.features && service.features.length > 0 && (
          <ul className="space-y-2 mb-6">
            {service.features.map((feature, i) => (
              <li
                key={i}
                className="flex items-start text-cool-gray text-sm"
              >
                <svg 
                  className={`w-5 h-5 mr-2 flex-shrink-0 mt-0.5 bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        )}
        
        {/* Click to Learn More */}
        <div className={`text-sm font-medium flex items-center mt-auto bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
          Learn more
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

export default ServiceCard
