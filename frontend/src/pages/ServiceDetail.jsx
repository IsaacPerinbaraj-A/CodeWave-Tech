import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'

const servicesData = {
  'web-development': {
    name: 'Web Development',
    icon: '🌐',
    color: 'from-blue-500 to-cyan-500',
    tagline: 'Build the web of tomorrow',
    description: 'Transform your ideas into powerful web applications that drive business growth. We create responsive, scalable, and SEO-optimized websites that deliver exceptional user experiences.',
    features: [
      'Progressive Web Apps (PWA) with offline capabilities',
      'Server-side rendering with Next.js for optimal SEO',
      'Real-time features using WebSockets',
      'E-commerce platforms with payment gateways',
      'Custom admin dashboards and analytics',
      'Performance optimization and Core Web Vitals',
    ],
    process: [
      { step: 'Discovery', desc: 'Understanding your goals and requirements' },
      { step: 'Design', desc: 'Creating wireframes and prototypes' },
      { step: 'Development', desc: 'Building with modern frameworks' },
      { step: 'Testing', desc: 'Quality assurance and bug fixes' },
      { step: 'Launch', desc: 'Deployment and going live' },
      { step: 'Support', desc: 'Ongoing maintenance and updates' },
    ],
    tech: [
      { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    ],
    timeline: '4-12 weeks',
    price: 'Starting from $5,000',
  },
  'mobile-apps': {
    name: 'Mobile Applications',
    icon: '📱',
    color: 'from-purple-500 to-pink-500',
    tagline: 'Apps that users love',
    description: 'Create stunning mobile experiences for iOS and Android. From concept to App Store, we handle everything with attention to detail and user-first design.',
    features: [
      'Cross-platform with React Native and Flutter',
      'Native iOS (Swift) and Android (Kotlin) development',
      'Biometric authentication (Face ID, Touch ID)',
      'App Store and Play Store optimization',
    ],
    process: [
      { step: 'Strategy', desc: 'App concept and feature planning' },
      { step: 'UI/UX', desc: 'Mobile-first design and prototyping' },
      { step: 'Development', desc: 'Native or cross-platform coding' },
      { step: 'Testing', desc: 'Device testing and QA' },
      { step: 'Submission', desc: 'App Store deployment' },
      { step: 'Growth', desc: 'Updates and feature expansion' },
    ],
    tech: [
      { name: 'React Native', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
      { name: 'Swift', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' },
      { name: 'Kotlin', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
      { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
      { name: 'Android', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg' },
    ],
    timeline: '8-16 weeks',
    price: 'Starting from $8,000',
  },
  'cloud-solutions': {
    name: 'Cloud Solutions',
    icon: '☁️',
    color: 'from-cyan-500 to-blue-500',
    tagline: 'Scale without limits',
    description: 'Modernize your infrastructure with cloud-native solutions. We architect, migrate, and optimize your systems for maximum performance and cost efficiency.',
    features: [
      'Multi-cloud architecture (AWS, Azure, GCP)',
      'Kubernetes and Docker orchestration',
      'CI/CD pipeline automation',
      'Database migration and optimization',
    ],
    process: [
      { step: 'Assessment', desc: 'Current infrastructure analysis' },
      { step: 'Planning', desc: 'Cloud strategy and architecture' },
      { step: 'Migration', desc: 'Moving to the cloud safely' },
      { step: 'Optimization', desc: 'Performance and cost tuning' },
      { step: 'Automation', desc: 'DevOps and CI/CD setup' },
      { step: 'Monitoring', desc: 'Continuous improvement' },
    ],
    tech: [
      { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { name: 'Azure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
      { name: 'Google Cloud', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
      { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
      { name: 'Terraform', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg' },
    ],
    timeline: '6-20 weeks',
    price: 'Starting from $10,000',
  },
  'ai-integration': {
    name: 'AI & Machine Learning',
    icon: '🤖',
    color: 'from-violet-500 to-purple-500',
    tagline: 'Intelligence that scales',
    description: 'Harness the power of AI to automate, analyze, and innovate. From ChatGPT integration to custom ML models, we make AI work for your business.',
    features: [
      'ChatGPT, GPT-4, and Claude integration',
      'Custom machine learning models',
      'Natural language processing',
      'Computer vision and image recognition',
      'Predictive analytics and forecasting',
      'Intelligent chatbots and virtual assistants',
    ],
    process: [
      { step: 'Use Case', desc: 'Identifying AI opportunities' },
      { step: 'Data Prep', desc: 'Collecting and cleaning data' },
      { step: 'Model Training', desc: 'Building and training models' },
      { step: 'Integration', desc: 'Connecting to your systems' },
      { step: 'Testing', desc: 'Validation and fine-tuning' },
      { step: 'Deployment', desc: 'Production rollout' },
    ],
    tech: [
      { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
      { name: 'PyTorch', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
      { name: 'OpenAI', logo: 'https://img.icons8.com/?size=100&id=FBO05Dys9QCg&format=png' },
      { name: 'Jupyter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
      { name: 'Pandas', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
    ],
    timeline: '6-14 weeks',
    price: 'Starting from $12,000',
  },
  'blockchain': {
    name: 'Blockchain & Web3',
    icon: '⛓️',
    color: 'from-orange-500 to-red-500',
    tagline: 'Decentralize the future',
    description: 'Build on blockchain with smart contracts, DApps, and NFT platforms. Secure, transparent, and revolutionary solutions for the Web3 era.',
    features: [
      'Smart contract development (Solidity, Rust)',
      'DApp creation on Ethereum, Polygon, Solana',
      'NFT marketplace and minting platforms',
      'Wallet integration (MetaMask, WalletConnect)',
      'DeFi protocols (staking, lending, AMM)',
      'IPFS and decentralized storage',
    ],
    process: [
      { step: 'Concept', desc: 'Tokenomics and blockchain selection' },
      { step: 'Smart Contracts', desc: 'Writing secure contracts' },
      { step: 'Auditing', desc: 'Security review and testing' },
      { step: 'Frontend', desc: 'Web3-enabled interface' },
      { step: 'Testing', desc: 'Testnet deployment' },
      { step: 'Mainnet', desc: 'Production launch' },
    ],
    tech: [
      { name: 'Solidity', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg' },
      { name: 'Ethereum', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Ethereum_logo.svg' },
      { name: 'Web3.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Hardhat', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hardhat/hardhat-original.svg' },
      { name: 'MetaMask', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg' },
      { name: 'IPFS', logo: 'https://avatars.githubusercontent.com/u/10536621?s=200&v=4' },
    ],
    timeline: '8-16 weeks',
    price: 'Starting from $15,000',
  },
  'ui-ux': {
    name: 'UI/UX Design',
    icon: '🎨',
    color: 'from-pink-500 to-rose-500',
    tagline: 'Design that converts',
    description: 'Create beautiful, intuitive experiences that users love. Research-driven design that combines aesthetics with functionality.',
    features: [
      'Wireframing and prototyping',
      'Information architecture',
      'Pixel-Perfect Design',
      'Design systems and style guides',
      'Usability testing and A/B testing',
      'Accessibility compliance (WCAG)',
    ],
    process: [
      { step: 'Research', desc: 'Understanding users and goals' },
      { step: 'Wireframes', desc: 'Structure and flow mapping' },
      { step: 'Prototypes', desc: 'Interactive mockups' },
      { step: 'UI Design', desc: 'Visual design and branding' },
      { step: 'Testing', desc: 'User feedback and iteration' },
      { step: 'Handoff', desc: 'Developer collaboration' },
    ],
    tech: [
      { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'Adobe XD', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg' },
      { name: 'Sketch', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg' },
      { name: 'Photoshop', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
      { name: 'Illustrator', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg' },
      { name: 'Framer', logo: 'https://cdn.worldvectorlogo.com/logos/framer-motion.svg' },
    ],
    timeline: '4-10 weeks',
    price: 'Starting from $6,000',
  },
}

const ServiceDetail = () => {
  const { serviceId } = useParams()
  const navigate = useNavigate()
  const service = servicesData[serviceId]

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-space-black">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-pure-white mb-4">Service Not Found</h1>
          <Button variant="primary" onClick={() => navigate('/')}>
            Go Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-space-black pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background Orbs */}
        <motion.div
          className={`absolute top-20 left-10 w-96 h-96 bg-gradient-to-br ${service.color} rounded-full blur-3xl opacity-20`}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className={`absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br ${service.color} rounded-full blur-3xl opacity-20`}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link 
            to="/#services"
            className="inline-flex items-center text-cool-gray hover:text-pure-white transition-colors mb-8 group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Services
          </Link>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className={`w-32 h-32 bg-gradient-to-br ${service.color} rounded-3xl flex items-center justify-center shadow-2xl flex-shrink-0`}
            >
              <span className="text-7xl">{service.icon}</span>
            </motion.div>

            {/* Content */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`inline-block px-4 py-2 bg-gradient-to-r ${service.color} rounded-full text-white text-sm font-medium mb-4`}
              >
                {service.tagline}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}
              >
                {service.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-cool-gray mb-8 leading-relaxed max-w-3xl"
              >
                {service.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button 
                  variant="primary" 
                  className={`bg-gradient-to-r ${service.color} border-none hover:opacity-90`}
                  onClick={() => navigate(`/request/${serviceId}`)}
                >
                  Request Quote
                </Button>
                <Button variant="ghost">
                  Schedule Consultation
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            <div className="bg-midnight-surface rounded-2xl p-6 border border-soft-border text-center">
              <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                {service.timeline}
              </div>
              <div className="text-muted-gray">Typical Timeline</div>
            </div>
            <div className="bg-midnight-surface rounded-2xl p-6 border border-soft-border text-center">
              <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                {service.price}
              </div>
              <div className="text-muted-gray">Investment</div>
            </div>
            <div className="bg-midnight-surface rounded-2xl p-6 border border-soft-border text-center">
              <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                100%
              </div>
              <div className="text-muted-gray">Satisfaction Rate</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-deep-navy/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-pure-white mb-12 text-center">
            What's <span className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>Included</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ x: 10 }}
                className="flex items-start gap-4 bg-midnight-surface rounded-xl p-6 border border-soft-border hover:border-electric-blue/50 transition-all"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-pure-white font-semibold mb-1">{feature}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-pure-white mb-12 text-center">
            Our <span className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>Process</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.process.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.color} rounded-2xl opacity-30 blur`} />
                <div className="relative bg-midnight-surface rounded-2xl p-6 border border-soft-border">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 text-white font-bold text-xl`}>
                    {i + 1}
                  </div>
                  <h4 className="text-xl font-bold text-pure-white mb-2">{item.step}</h4>
                  <p className="text-cool-gray">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack with Logos */}
      <section className="py-20 bg-gradient-to-b from-transparent to-deep-navy/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-pure-white mb-4 text-center">
            <span className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>Technologies</span> We Use
          </h2>
          <p className="text-cool-gray text-center mb-12">Industry-leading tools and frameworks</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {service.tech.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-midnight-surface rounded-2xl p-6 border border-soft-border hover:border-electric-blue/50 transition-all flex flex-col items-center justify-center gap-3 group"
              >
                <div className="w-16 h-16 flex items-center justify-center">
                  <img 
                    src={tech.logo} 
                    alt={tech.name}
                    className="w-full h-full object-contain filter group-hover:drop-shadow-[0_0_10px_rgba(79,125,243,0.5)] transition-all"
                  />
                </div>
                <span className="text-cool-gray text-sm font-medium text-center group-hover:text-pure-white transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-pure-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-cool-gray text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create something amazing together. 
              Get a free consultation and quote today.
            </p>
            <Button 
              variant="primary"
              className={`bg-gradient-to-r ${service.color} border-none hover:opacity-90 text-lg px-8 py-4`}
              onClick={() => navigate(`/request/${serviceId}`)}
            >
              Request a Quote →
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ServiceDetail
