import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import AdminLayout from '../../components/admin/AdminLayout'
import { getServiceRequests } from '../../services/requestService'

const AdminRequests = () => {
  const navigate = useNavigate()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchRequests()
  }, [filter])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const params = filter !== 'all' ? { status: filter } : {}
      const response = await getServiceRequests(params)
      setRequests(response.data)
    } catch (error) {
      console.error('Error fetching requests:', error)
    } finally {
      setLoading(false)
    }
  }

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

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header with Filters */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-pure-white">Service Requests</h1>
            <p className="text-cool-gray mt-1">Manage and track all client requests</p>
          </div>

          <div className="flex gap-2">
            {['all', 'pending', 'in-progress', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg capitalize transition-all ${
                  filter === status
                    ? 'bg-electric-blue text-white'
                    : 'bg-midnight-surface text-cool-gray hover:text-pure-white border border-soft-border'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Requests Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-midnight-surface rounded-2xl border border-soft-border overflow-hidden"
        >
          {loading ? (
            <div className="p-12 text-center text-cool-gray">Loading...</div>
          ) : requests.length === 0 ? (
            <div className="p-12 text-center text-cool-gray">
              <div className="text-6xl mb-4">📭</div>
              <div className="text-xl mb-2">No requests found</div>
              <div className="text-sm">Try changing the filter</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-soft-border/30">
                  <tr>
                    <th className="text-left py-4 px-6 text-cool-gray font-medium text-sm">Client</th>
                    <th className="text-left py-4 px-6 text-cool-gray font-medium text-sm">Service</th>
                    <th className="text-left py-4 px-6 text-cool-gray font-medium text-sm">Status</th>
                    <th className="text-left py-4 px-6 text-cool-gray font-medium text-sm">Priority</th>
                    <th className="text-left py-4 px-6 text-cool-gray font-medium text-sm">Date</th>
                    <th className="text-left py-4 px-6 text-cool-gray font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <motion.tr
                      key={request._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ backgroundColor: 'rgba(79, 125, 243, 0.05)' }}
                      className="border-b border-soft-border transition-colors cursor-pointer"
                      onClick={() => navigate(`/admin/requests/${request._id}`)}
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
                      <td className="py-4 px-6 capitalize text-cool-gray">
                        {request.priority}
                      </td>
                      <td className="py-4 px-6 text-cool-gray">{formatDate(request.createdAt)}</td>
                      <td className="py-4 px-6">
                        <button className="text-electric-blue hover:text-neon-cyan transition-colors">
                          View →
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  )
}

export default AdminRequests
