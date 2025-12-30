import Hero from '../components/hero/Hero'
import Services from '../components/services/Services'

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      
      <section id="about" className="py-20 bg-space-black">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-pure-white mb-4">
            Why Choose Us
          </h2>
          <p className="text-cool-gray text-lg mb-12">
            We combine technical excellence with business understanding
          </p>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-midnight-surface p-8 rounded-xl border border-soft-border hover:border-electric-blue transition-all">
              <div className="text-5xl mb-3">🚀</div>
              <div className="text-5xl font-bold text-gradient-blue mb-2">150+</div>
              <div className="text-cool-gray">Projects Delivered</div>
            </div>
            
            <div className="bg-midnight-surface p-8 rounded-xl border border-soft-border hover:border-electric-blue transition-all">
              <div className="text-5xl mb-3">⭐</div>
              <div className="text-5xl font-bold text-gradient-blue mb-2">98%</div>
              <div className="text-cool-gray">Client Satisfaction</div>
            </div>
            
            <div className="bg-midnight-surface p-8 rounded-xl border border-soft-border hover:border-electric-blue transition-all">
              <div className="text-5xl mb-3">💬</div>
              <div className="text-5xl font-bold text-gradient-blue mb-2">24/7</div>
              <div className="text-cool-gray">Support Available</div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-midnight-surface p-6 rounded-xl border border-soft-border text-left">
              <h3 className="text-xl font-semibold text-pure-white mb-3 flex items-center">
                <span className="text-3xl mr-3">🚀</span>
                Cutting-Edge Technology
              </h3>
              <p className="text-cool-gray">
                We use the latest frameworks and tools to build fast, scalable solutions.
              </p>
            </div>
            
            <div className="bg-midnight-surface p-6 rounded-xl border border-soft-border text-left">
              <h3 className="text-xl font-semibold text-pure-white mb-3 flex items-center">
                <span className="text-3xl mr-3">🎯</span>
                Business-Focused
              </h3>
              <p className="text-cool-gray">
                Every decision is made with your business goals and ROI in mind.
              </p>
            </div>
            
            <div className="bg-midnight-surface p-6 rounded-xl border border-soft-border text-left">
              <h3 className="text-xl font-semibold text-pure-white mb-3 flex items-center">
                <span className="text-3xl mr-3">🔒</span>
                Security First
              </h3>
              <p className="text-cool-gray">
                Industry-standard security practices to protect your data.
              </p>
            </div>
            
            <div className="bg-midnight-surface p-6 rounded-xl border border-soft-border text-left">
              <h3 className="text-xl font-semibold text-pure-white mb-3 flex items-center">
                <span className="text-3xl mr-3">⚡</span>
                Agile Development
              </h3>
              <p className="text-cool-gray">
                Fast iterations and rapid deployment to get to market quickly.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section id="contact" className="py-20 bg-deep-navy">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-pure-white mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-cool-gray text-lg mb-8">
            Let's discuss your project and turn your ideas into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:contact@devstudio.com" className="btn-primary inline-block">
              Email Us
            </a>
            <a href="#services" className="btn-secondary inline-block">
              View Services
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
