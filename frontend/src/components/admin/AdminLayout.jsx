import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

const AdminLayout = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const menuItems = [
    { name: 'Dashboard', icon: '📊', path: '/admin' },
    { name: 'Service Requests', icon: '📝', path: '/admin/requests' },
    { name: 'Analytics', icon: '📈', path: '/admin/analytics' },
    { name: 'Clients', icon: '👥', path: '/admin/clients' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-space-black flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="bg-midnight-surface border-r border-soft-border h-screen sticky top-0 transition-all duration-300 z-40"
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-neon-cyan rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🌊</span>
            </div>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col"
              >
                <span className="text-pure-white font-bold text-lg">CodeWave</span>
                <span className="text-muted-gray text-xs">Admin Panel</span>
              </motion.div>
            )}
          </div>

          {/* Toggle Button */}
          

          {/* Menu Items */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-electric-blue to-neon-cyan text-white'
                      : 'text-cool-gray hover:bg-soft-border'
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  {sidebarOpen && (
                    <span className="font-medium">{item.name}</span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full mt-8 flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
          >
            <span className="text-2xl">🚪</span>
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-midnight-surface/95 backdrop-blur-lg border-b border-soft-border px-8 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-pure-white">
                {menuItems.find(item => item.path === location.pathname)?.name || 'Admin Panel'}
              </h1>
              <p className="text-muted-gray text-sm">Manage your business operations</p>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-soft-border transition-colors">
                <svg className="w-6 h-6 text-cool-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-neon-cyan rounded-full"></span>
              </button>

              {/* Profile */}
              <div className="flex items-center gap-3 pl-4 border-l border-soft-border">
                <div className="text-right">
                  <div className="text-pure-white font-medium">Admin User</div>
                  <div className="text-muted-gray text-xs">admin@codewave.com</div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-neon-cyan rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto relative z-10">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout