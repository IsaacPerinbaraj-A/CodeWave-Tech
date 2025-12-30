import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '',
  hover = true,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -4 } : {}}
      className={`card-premium ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card
