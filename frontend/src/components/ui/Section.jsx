import { motion } from 'framer-motion'

const Section = ({ 
  id, 
  children, 
  className = '',
  background = 'default',
  ...props 
}) => {
  const backgrounds = {
    default: 'bg-space-black',
    navy: 'bg-deep-navy',
    gradient: 'bg-hero-gradient',
  }

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`py-20 ${backgrounds[background]} ${className}`}
      {...props}
    >
      {children}
    </motion.section>
  )
}

export default Section
