import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import { getServiceRequests, getStatistics } from '../../services/requestService'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  })
  const [recentRequests, setRecentRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch statistics
      const statsData = await getStatistics()
      setStats(statsData.data)
      
      // Fetch recent requests
      const requestsData = await getServiceRequests({ limit: 5 })
      setRecentRequests(requestsData.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statsCards = [
    { 
      label: 'Total Requests', 
      value: stats.total || 0, 
      change: '+12%', 
      icon: '📝', 
      color: 'from-blue-500 to-cyan-500' 
    },
    { 
      label: 'Pending', 
      value: stats.pending || 0, 
      change: '+5%', 
      icon: '⏳', 
      color: 'from-yellow-500 to-orange-500' 
    },
    { 
      label: 'In Progress', 
      value: stats.inProgress || 0, 
      change: '+8%', 
      icon: '🚀', 
      color: 'from-purple-500 to-pink-500' 
    },
    { 
      label: 'Completed', 
      value: stats.completed || 0, 
      change: '+15%', 
      icon: '✅', 
      color: 'from-emerald-500 to-teal-500' 
    },
  ]

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
      'in-progress': 'bg-blue-500/10 text-blue-500 border-blue-500/30',
      completed: 'bg-green-500/10 text-green-500 border-green-500/30',
      cancelled: 'bg-red-500/10 text-red-500 border-red-500/30',
    }
    return colors[status] || colors.pending
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-cool-gray text-xl">Loading...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative bg-midnight-surface rounded-2xl p-6 border border-soft-border overflow-hidden group cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                  <span className="text-neon-cyan text-sm font-medium">{stat.change}</span>
                </div>
                
                <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-cool-gray text-sm">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Requests Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-midnight-surface rounded-2xl border border-soft-border overflow-hidden"
        >
          <div className="p-6 border-b border-soft-border">
            <h2 className="text-2xl font-bold text-pure-white">Recent Service Requests</h2>
            <p className="text-cool-gray text-sm mt-1">Manage and track client requests</p>
          </div>

          {recentRequests.length === 0 ? (
            <div className="p-12 text-center text-cool-gray">
              <div className="text-6xl mb-4">📭</div>
              <div className="text-xl mb-2">No requests yet</div>
              <div className="text-sm">Service requests will appear here</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-soft-border/30">
                  <tr>
                    <th className="text-left py-4 px-6 text-cool-gray font-medium text-sm">Client</th>
                    <th className="text-left py-4 px-6 text-cool-gray font-medium text-sm">Service</th>
                    <th className="text-left py-4 px-6 text-cool-gray font-medium text-sm">Status</th>
                    <th className="text-left py-4 px-6 text-cool-gray font-medium text-sm">Date</th>
                    <th className="text-left py-4 px-6 text-cool-gray font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRequests.map((request) => (
                    <motion.tr
                      key={request._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ backgroundColor: 'rgba(79, 125, 243, 0.05)' }}
                      className="border-b border-soft-border transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div>
                          <div className="text-pure-white font-medium">{request.name}</div>
                          <div className="text-cool-gray text-sm">{request.email}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-cool-gray capitalize">
                        {request.serviceType.replace('-', ' ')}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-cool-gray">{formatDate(request.createdAt)}</td>
                      <td className="py-4 px-6">
                        <button 
                          onClick={() => navigate(`/admin/requests/${request._id}`)}
                          className="text-electric-blue hover:text-neon-cyan transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('/admin/requests')}
            className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-left group"
          >
            <div className="text-4xl mb-3">📝</div>
            <div className="text-xl font-bold text-white mb-2">View All Requests</div>
            <div className="text-white/80 text-sm">Manage all service requests</div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('/admin/analytics')}
            className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-left"
          >
            <div className="text-4xl mb-3">📊</div>
            <div className="text-xl font-bold text-white mb-2">View Analytics</div>
            <div className="text-white/80 text-sm">Detailed business insights</div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('/admin/clients')}
            className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 text-left"
          >
            <div className="text-4xl mb-3">👥</div>
            <div className="text-xl font-bold text-white mb-2">Manage Clients</div>
            <div className="text-white/80 text-sm">View all client information</div>
          </motion.button>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard
