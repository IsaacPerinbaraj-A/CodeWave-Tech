import { motion } from 'framer-motion'
import Button from '../ui/Button'
import HeroVisual from '../ui/HeroVisual'

const Hero = () => {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-electric-blue rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-neon-cyan rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-64 h-64 bg-soft-violet rounded-full blur-3xl opacity-15"
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Content - Grid Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="px-4 py-2 bg-electric-blue/10 border border-electric-blue/30 rounded-full text-electric-blue text-sm font-medium backdrop-blur-sm">
                ✨ Premium Software Development
              </div>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Build the{' '}
              <motion.span 
                className="inline-block bg-gradient-to-r from-electric-blue via-neon-cyan to-soft-violet bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: '200% auto' }}
              >
                Future
              </motion.span>
              <br />
              of Software
            </motion.h1>
            
            <motion.p 
              className="text-xl text-cool-gray mb-8 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Transform your vision into <span className="text-neon-cyan font-semibold">scalable</span>, 
              <span className="text-electric-blue font-semibold"> modern</span> solutions. 
              We build the impossible.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button variant="primary" onClick={scrollToServices}>
                🚀 Explore Services
              </Button>
              <Button variant="ghost" as="a" href="#contact">
                Get in Touch
              </Button>
            </motion.div>

            {/* Floating Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div 
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center lg:text-left"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient-blue">150+</div>
                <div className="text-sm text-muted-gray">Projects</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center lg:text-left"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-neon-cyan to-electric-blue bg-clip-text text-transparent">98%</div>
                <div className="text-sm text-muted-gray">Satisfaction</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center lg:text-left"
              >
                <div className="text-3xl md:text-4xl font-bold text-soft-violet">24/7</div>
                <div className="text-sm text-muted-gray">Support</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Visual Component */}
          <div className="hidden lg:block">
            <HeroVisual />
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg className="w-6 h-6 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </div>
  )
}

export default Hero