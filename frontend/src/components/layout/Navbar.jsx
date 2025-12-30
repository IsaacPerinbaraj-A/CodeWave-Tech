import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../ui/Button'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  // Handle logo click - scroll to top
  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      // Already on home page, just scroll to top
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    // If not on home page, Link will navigate and ScrollToTop will handle it
    setMobileMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-deep-navy/95 backdrop-blur-lg shadow-soft border-b border-soft-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" onClick={handleLogoClick} className="flex items-center group">
            <span className="text-2xl font-bold">
              <span className="text-gradient-blue">CodeWave</span>
              <span className="text-pure-white"> Tech</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('services')}
              className="text-cool-gray hover:text-pure-white transition-colors duration-200 font-medium"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-cool-gray hover:text-pure-white transition-colors duration-200 font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-cool-gray hover:text-pure-white transition-colors duration-200 font-medium"
            >
              Contact
            </button>
            <Link to="/admin/login">
              <Button variant="ghost">
                🔐 Admin Login
              </Button>
            </Link>
            <Button variant="primary" onClick={() => scrollToSection('contact')}>
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-pure-white p-2"
            aria-label="Toggle menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-midnight-surface border-t border-soft-border"
          >
            <div className="px-4 py-6 space-y-4">
              <button
                onClick={() => scrollToSection('services')}
                className="block w-full text-left py-2 text-cool-gray hover:text-pure-white transition-colors font-medium"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left py-2 text-cool-gray hover:text-pure-white transition-colors font-medium"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left py-2 text-cool-gray hover:text-pure-white transition-colors font-medium"
              >
                Contact
              </button>
              <Link to="/admin/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full">
                  🔐 Admin Login
                </Button>  
              </Link>
              <Button variant="primary" className="w-full" onClick={() => scrollToSection('contact')}>
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar