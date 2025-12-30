import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AdminLayout from '../../components/admin/AdminLayout'
import { getStatistics, getServiceRequests } from '../../services/requestService'

const AdminAnalytics = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('all')

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const response = await getStatistics()
      setStats(response.data)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const statsCards = [
    {
      label: 'Total Requests',
      value: stats?.total || 0,
      icon: '📝',
      color: 'from-blue-500 to-cyan-500',
      trend: '+12%',
    },
    {
      label: 'Pending',
      value: stats?.pending || 0,
      icon: '⏳',
      color: 'from-yellow-500 to-orange-500',
      trend: '+5%',
    },
    {
      label: 'In Progress',
      value: stats?.inProgress || 0,
      icon: '🚀',
      color: 'from-purple-500 to-pink-500',
      trend: '+8%',
    },
    {
      label: 'Completed',
      value: stats?.completed || 0,
      icon: '✅',
      color: 'from-emerald-500 to-teal-500',
      trend: '+15%',
    },
  ]

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-cool-gray text-xl">Loading analytics...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-pure-white">Analytics</h1>
            <p className="text-cool-gray mt-1">Business insights and performance metrics</p>
          </div>

          <div className="flex gap-2">
            {['all', 'month', 'week'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg capitalize transition-all ${
                  timeRange === range
                    ? 'bg-electric-blue text-white'
                    : 'bg-midnight-surface text-cool-gray hover:text-pure-white border border-soft-border'
                }`}
              >
                {range === 'all' ? 'All Time' : `This ${range}`}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative bg-midnight-surface rounded-2xl p-6 border border-soft-border overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                  <span className="text-neon-cyan text-sm font-medium">{stat.trend}</span>
                </div>
                
                <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-cool-gray text-sm">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Service Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-midnight-surface rounded-2xl p-6 border border-soft-border"
        >
          <h2 className="text-2xl font-bold text-pure-white mb-6">Requests by Service</h2>
          
          {stats?.byService && stats.byService.length > 0 ? (
            <div className="space-y-4">
              {stats.byService.map((service, i) => {
                const percentage = ((service.count / stats.total) * 100).toFixed(1)
                const colors = [
                  'from-blue-500 to-cyan-500',
                  'from-purple-500 to-pink-500',
                  'from-emerald-500 to-teal-500',
                  'from-orange-500 to-red-500',
                  'from-yellow-500 to-orange-500',
                  'from-pink-500 to-rose-500',
                ]
                const color = colors[i % colors.length]

                return (
                  <motion.div
                    key={service._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-pure-white capitalize">
                        {service._id.replace('-', ' ')}
                      </span>
                      <span className="text-cool-gray">{service.count} ({percentage}%)</span>
                    </div>
                    <div className="h-3 bg-soft-border rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
                        className={`h-full bg-gradient-to-r ${color}`}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-cool-gray">
              <div className="text-6xl mb-4">📊</div>
              <div>No service data available yet</div>
            </div>
          )}
        </motion.div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6"
          >
            <div className="text-white/80 mb-2">Conversion Rate</div>
            <div className="text-4xl font-bold text-white mb-2">
              {stats?.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-white/80 text-sm">Completed vs Total</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6"
          >
            <div className="text-white/80 mb-2">Active Projects</div>
            <div className="text-4xl font-bold text-white mb-2">{stats?.inProgress || 0}</div>
            <div className="text-white/80 text-sm">Currently in progress</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6"
          >
            <div className="text-white/80 mb-2">Response Time</div>
            <div className="text-4xl font-bold text-white mb-2">2.5h</div>
            <div className="text-white/80 text-sm">Average response time</div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminAnalytics
