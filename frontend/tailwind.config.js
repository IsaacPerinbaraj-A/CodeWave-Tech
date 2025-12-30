/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background System
        'space-black': '#0B0F19',
        'deep-navy': '#111827',
        'midnight-surface': '#161B2E',
        'soft-border': '#1F2937',
        
        // Text System
        'pure-white': '#FFFFFF',
        'cool-gray': '#9CA3AF',
        'muted-gray': '#6B7280',
        'disabled-gray': '#4B5563',
        
        // Accent System
        'electric-blue': '#4F7DF3',
        'electric-blue-hover': '#3B6BE6',
        'neon-cyan': '#22D3EE',
        'soft-violet': '#7C7CFF',
        
        // Status Colors
        'error-red': '#EF4444',
        'error-light': '#FCA5A5',
        'success-green': '#22C55E',
        'success-light': '#86EFAC',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'btn': '12px',
        'input': '10px',
        'card': '18px',
      },
      boxShadow: {
        'soft-elevation': '0 10px 30px rgba(0, 0, 0, 0.4)',
        'glow-blue': '0 0 30px rgba(79, 125, 243, 0.3)',
        'glow-cyan': '0 0 25px rgba(34, 211, 238, 0.4)',
        'glow-blue-subtle': '0 0 20px rgba(79, 125, 243, 0.35)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(79,125,243,0.15), transparent 60%)',
        'card-gradient': 'linear-gradient(135deg, rgba(79,125,243,0.15), rgba(34,211,238,0.1))',
      },
    },
  },
  plugins: [],
}
