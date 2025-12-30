import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const HeroVisual = () => {
  const [typedCode, setTypedCode] = useState('')
  
  const codeSnippet = `// Building the future
const project = {
  name: "Amazing App",
  tech: ["React", "Node.js"],
  status: "🚀 Deploying..."
}

await deploy(project)
console.log("✨ Live!")
`

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= codeSnippet.length) {
        setTypedCode(codeSnippet.slice(0, currentIndex))
        currentIndex++
      } else {
        setTimeout(() => {
          currentIndex = 0
          setTypedCode('')
        }, 2000)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Floating Orbs Background */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-10 right-20 w-32 h-32 bg-electric-blue/20 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 left-10 w-40 h-40 bg-neon-cyan/20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          y: [0, -30, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"
      />

      {/* Main Code Window */}
      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 w-[500px]"
      >
        {/* Window Header */}
        <div className="bg-midnight-surface/90 backdrop-blur-xl rounded-t-2xl border border-soft-border p-4 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 text-center text-cool-gray text-sm font-mono">
            ~/projects/codewave.js
          </div>
        </div>

        {/* Code Content */}
        <div className="bg-midnight-surface/95 backdrop-blur-xl rounded-b-2xl border-x border-b border-soft-border p-6 font-mono text-sm min-h-[300px] shadow-2xl">
          <pre className="text-cool-gray leading-relaxed">
            <code>
              {typedCode.split('\n').map((line, i) => (
                <div key={i} className="flex">
                  <span className="text-muted-gray mr-4 select-none">{i + 1}</span>
                  <span className="flex-1">
                    {line.includes('//') ? (
                      <span className="text-emerald-400">{line}</span>
                    ) : line.includes('const') || line.includes('await') ? (
                      <span>
                        <span className="text-purple-400">{line.split(' ')[0]}</span>
                        {line.substring(line.indexOf(' '))}
                      </span>
                    ) : line.includes('console.log') ? (
                      <span className="text-yellow-400">{line}</span>
                    ) : line.includes('"') ? (
                      <span className="text-neon-cyan">{line}</span>
                    ) : (
                      <span className="text-pure-white">{line}</span>
                    )}
                  </span>
                </div>
              ))}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-electric-blue ml-1"
              />
            </code>
          </pre>
        </div>

        {/* Floating Tech Badges */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="absolute -left-20 top-20 bg-midnight-surface/90 backdrop-blur-xl px-4 py-2 rounded-full border border-electric-blue/30 shadow-lg"
        >
          <span className="text-electric-blue font-semibold">⚛️ React</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute -right-20 top-40 bg-midnight-surface/90 backdrop-blur-xl px-4 py-2 rounded-full border border-neon-cyan/30 shadow-lg"
        >
          <span className="text-neon-cyan font-semibold">📦 Node.js</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-midnight-surface/90 backdrop-blur-xl px-4 py-2 rounded-full border border-purple-500/30 shadow-lg"
        >
          <span className="text-purple-400 font-semibold">🤖 AI Powered</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default HeroVisual
