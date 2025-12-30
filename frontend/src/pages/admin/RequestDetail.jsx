import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import AdminLayout from '../../components/admin/AdminLayout'
import Button from '../../components/ui/Button'
import { 
  getServiceRequest, 
  updateServiceRequest, 
  deleteServiceRequest 
} from '../../services/requestService'

const RequestDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [request, setRequest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    status: '',
    priority: '',
    notes: '',
    estimatedBudget: '',
    deadline: '',
  })

  useEffect(() => {
    fetchRequest()
  }, [id])

  const fetchRequest = async () => {
    try {
      setLoading(true)
      const response = await getServiceRequest(id)
      setRequest(response.data)
      setFormData({
        status: response.data.status || 'pending',
        priority: response.data.priority || 'medium',
        notes: response.data.notes || '',
        estimatedBudget: response.data.estimatedBudget || '',
        deadline: response.data.deadline ? response.data.deadline.split('T')[0] : '',
      })
    } catch (error) {
      console.error('Error fetching request:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async () => {
    try {
      setUpdating(true)
      await updateServiceRequest(id, formData)
      await fetchRequest()
      setEditMode(false)
      alert('Request updated successfully!')
    } catch (error) {
      console.error('Error updating request:', error)
      alert('Failed to update request')
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this request?')) return
    
    try {
      await deleteServiceRequest(id)
      alert('Request deleted successfully!')
      navigate('/admin/requests')
    } catch (error) {
      console.error('Error deleting request:', error)
      alert('Failed to delete request')
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'from-yellow-500 to-orange-500',
      'in-progress': 'from-blue-500 to-cyan-500',
      completed: 'from-green-500 to-emerald-500',
      cancelled: 'from-red-500 to-pink-500',
    }
    return colors[status] || colors.pending
  }

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'text-green-400',
      medium: 'text-yellow-400',
      high: 'text-red-400',
    }
    return colors[priority] || colors.medium
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-cool-gray text-xl">Loading request...</div>
        </div>
      </AdminLayout>
    )
  }

  if (!request) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-pure-white mb-4">Request Not Found</h2>
          <Button onClick={() => navigate('/admin/requests')}>
            Back to Requests
          </Button>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/admin/requests')}
            className="flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Requests
          </Button>

          <div className="flex gap-3">
            <Button 
              variant={editMode ? 'ghost' : 'primary'}
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? 'Cancel' : 'Edit'}
            </Button>
            <Button 
              variant="ghost" 
              onClick={handleDelete}
              className="text-red-400 hover:text-red-300"
            >
              Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Client Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-midnight-surface rounded-2xl p-6 border border-soft-border"
            >
              <h2 className="text-2xl font-bold text-pure-white mb-6">Client Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-muted-gray text-sm">Full Name</label>
                  <div className="text-pure-white text-lg font-medium mt-1">{request.name}</div>
                </div>

                <div>
                  <label className="text-muted-gray text-sm">Email</label>
                  <div className="text-pure-white text-lg font-medium mt-1">
                    <a href={`mailto:${request.email}`} className="text-electric-blue hover:text-neon-cyan">
                      {request.email}
                    </a>
                  </div>
                </div>

                <div>
                  <label className="text-muted-gray text-sm">Company</label>
                  <div className="text-pure-white text-lg font-medium mt-1">
                    {request.company || 'N/A'}
                  </div>
                </div>

                <div>
                  <label className="text-muted-gray text-sm">Phone</label>
                  <div className="text-pure-white text-lg font-medium mt-1">
                    {request.phone || 'N/A'}
                  </div>
                </div>

                <div>
                  <label className="text-muted-gray text-sm">Service Type</label>
                  <div className="text-pure-white text-lg font-medium mt-1 capitalize">
                    {request.serviceType.replace('-', ' ')}
                  </div>
                </div>

                <div>
                  <label className="text-muted-gray text-sm">Request Date</label>
                  <div className="text-pure-white text-lg font-medium mt-1">
                    {new Date(request.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Project Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-midnight-surface rounded-2xl p-6 border border-soft-border"
            >
              <h2 className="text-2xl font-bold text-pure-white mb-4">Project Details</h2>
              <div className="text-cool-gray leading-relaxed whitespace-pre-wrap">
                {request.message}
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Status & Actions */}
          <div className="space-y-6">
            {/* Status Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-midnight-surface rounded-2xl p-6 border border-soft-border"
            >
              <h3 className="text-xl font-bold text-pure-white mb-4">Status</h3>

              {editMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-cool-gray text-sm mb-2 block">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2 bg-space-black border border-soft-border rounded-lg text-pure-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-cool-gray text-sm mb-2 block">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full px-4 py-2 bg-space-black border border-soft-border rounded-lg text-pure-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-cool-gray text-sm mb-2 block">Estimated Budget</label>
                    <input
                      type="text"
                      value={formData.estimatedBudget}
                      onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                      placeholder="e.g., $10,000"
                      className="w-full px-4 py-2 bg-space-black border border-soft-border rounded-lg text-pure-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
                    />
                  </div>

                  <div>
                    <label className="text-cool-gray text-sm mb-2 block">Deadline</label>
                    <input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      className="w-full px-4 py-2 bg-space-black border border-soft-border rounded-lg text-pure-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
                    />
                  </div>

                  <div>
                    <label className="text-cool-gray text-sm mb-2 block">Notes</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={4}
                      placeholder="Add internal notes..."
                      className="w-full px-4 py-2 bg-space-black border border-soft-border rounded-lg text-pure-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
                    />
                  </div>

                  <Button 
                    variant="primary" 
                    className="w-full"
                    onClick={handleUpdate}
                    disabled={updating}
                  >
                    {updating ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-muted-gray text-sm">Current Status</label>
                    <div className={`mt-2 px-4 py-2 rounded-lg bg-gradient-to-r ${getStatusColor(request.status)} text-white font-medium text-center capitalize`}>
                      {request.status}
                    </div>
                  </div>

                  <div>
                    <label className="text-muted-gray text-sm">Priority</label>
                    <div className={`mt-2 text-lg font-bold ${getPriorityColor(request.priority)} capitalize`}>
                      {request.priority}
                    </div>
                  </div>

                  {request.estimatedBudget && (
                    <div>
                      <label className="text-muted-gray text-sm">Budget</label>
                      <div className="mt-2 text-pure-white text-lg font-medium">
                        {request.estimatedBudget}
                      </div>
                    </div>
                  )}

                  {request.deadline && (
                    <div>
                      <label className="text-muted-gray text-sm">Deadline</label>
                      <div className="mt-2 text-pure-white text-lg font-medium">
                        {new Date(request.deadline).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  )}

                  {request.notes && (
                    <div>
                      <label className="text-muted-gray text-sm">Notes</label>
                      <div className="mt-2 text-cool-gray text-sm whitespace-pre-wrap">
                        {request.notes}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default RequestDetail
