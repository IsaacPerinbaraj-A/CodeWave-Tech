import { motion } from 'framer-motion'
import ServiceCard from './ServiceCard'

const servicesData = [
  {
    id: 'web-development',
    name: 'Web Development',
    icon: '🌐',
    color: 'from-blue-500 to-cyan-500',
    description: 'Custom web applications built with modern frameworks and scalable architecture.',
    features: [
      'React, Next.js, Vue.js frontends',
      'Node.js, Python backends',
      'RESTful and GraphQL APIs',
      'Cloud deployment & CI/CD',
    ],
  },
  {
    id: 'mobile-apps',
    name: 'Mobile Applications',
    icon: '📱',
    color: 'from-purple-500 to-pink-500',
    description: 'Native and cross-platform mobile solutions for iOS and Android.',
    features: [
      'React Native & Flutter',
      'Native iOS and Android',
      'App Store optimization',
      'Push notifications & analytics',
    ],
  },
  {
    id: 'cloud-solutions',
    name: 'Cloud Solutions',
    icon: '☁️',
    color: 'from-cyan-500 to-blue-500',
    description: 'Scalable cloud infrastructure and migration services.',
    features: [
      'AWS, Azure, Google Cloud',
      'Serverless architecture',
      'DevOps & automation',
      'Cost optimization',
    ],
  },
  {
    id: 'ai-integration',
    name: 'AI Integration',
    icon: '🤖',
    color: 'from-violet-500 to-purple-500',
    description: 'Intelligent features powered by machine learning and AI.',
    features: [
      'ChatGPT & GPT-4 integration',
      'Natural language processing',
      'Computer vision',
      'Predictive analytics',
    ],
  },
  {
    id: 'blockchain',
    name: 'Blockchain & Web3',
    icon: '⛓️',
    color: 'from-orange-500 to-red-500',
    description: 'Decentralized applications and smart contract development.',
    features: [
      'Smart contract development',
      'DApp creation',
      'NFT marketplace development',
      'Wallet integration',
    ],
  },
  {
    id: 'ui-ux',
    name: 'UI/UX Design',
    icon: '🎨',
    color: 'from-pink-500 to-rose-500',
    description: 'Beautiful, user-centered designs that convert and delight.',
    features: [
      'User research & personas',
      'Wireframing & prototyping',
      'Design systems',
      'Usability testing',
    ],
  },
]

const Services = () => {
  return (
    <section id="services" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-space-black via-deep-navy to-space-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-pure-white mb-4">
            Our <span className="text-gradient-blue">Services</span>
          </h2>
          <p className="text-cool-gray text-lg max-w-2xl mx-auto">
            Comprehensive software solutions tailored to your business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
