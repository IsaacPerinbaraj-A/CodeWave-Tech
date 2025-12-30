import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AdminLayout from '../../components/admin/AdminLayout'
import { getServiceRequests } from '../../services/requestService'

const AdminClients = () => {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      setLoading(true)
      const response = await getServiceRequests({ limit: 100 })
      
      // Extract unique clients
      const uniqueClients = {}
      response.data.forEach(request => {
        if (!uniqueClients[request.email]) {
          uniqueClients[request.email] = {
            name: request.name,
            email: request.email,
            company: request.company,
            phone: request.phone,
            totalRequests: 1,
            services: [request.serviceType],
            lastContact: request.createdAt,
            status: request.status,
          }
        } else {
          uniqueClients[request.email].totalRequests++
          if (!uniqueClients[request.email].services.includes(request.serviceType)) {
            uniqueClients[request.email].services.push(request.serviceType)
          }
          if (new Date(request.createdAt) > new Date(uniqueClients[request.email].lastContact)) {
            uniqueClients[request.email].lastContact = request.createdAt
          }
        }
      })
      
      setClients(Object.values(uniqueClients))
    } catch (error) {
      console.error('Error fetching clients:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.company && client.company.toLowerCase().includes(searchTerm.toLowerCase()))
  )

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
          <div className="text-cool-gray text-xl">Loading clients...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-pure-white">Clients</h1>
          <p className="text-cool-gray mt-1">Manage your client relationships</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-midnight-surface rounded-2xl p-6 border border-soft-border"
          >
            <div className="text-4xl mb-2">👥</div>
            <div className="text-3xl font-bold text-pure-white">{clients.length}</div>
            <div className="text-cool-gray text-sm">Total Clients</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-midnight-surface rounded-2xl p-6 border border-soft-border"
          >
            <div className="text-4xl mb-2">🔄</div>
            <div className="text-3xl font-bold text-pure-white">
              {clients.filter(c => c.totalRequests > 1).length}
            </div>
            <div className="text-cool-gray text-sm">Repeat Clients</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-midnight-surface rounded-2xl p-6 border border-soft-border"
          >
            <div className="text-4xl mb-2">🏢</div>
            <div className="text-3xl font-bold text-pure-white">
              {clients.filter(c => c.company).length}
            </div>
            <div className="text-cool-gray text-sm">Companies</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-midnight-surface rounded-2xl p-6 border border-soft-border"
          >
            <div className="text-4xl mb-2">⭐</div>
            <div className="text-3xl font-bold text-pure-white">
              {clients.filter(c => c.status === 'completed').length}
            </div>
            <div className="text-cool-gray text-sm">Satisfied Clients</div>
          </motion.div>
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <input
            type="text"
            placeholder="Search clients by name, email, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 bg-midnight-surface border border-soft-border rounded-xl text-pure-white placeholder-cool-gray focus:outline-none focus:ring-2 focus:ring-electric-blue transition-all"
          />
        </motion.div>

        {/* Clients Grid */}
        {filteredClients.length === 0 ? (
          <div className="text-center py-20 text-cool-gray">
            <div className="text-6xl mb-4">👥</div>
            <div className="text-xl mb-2">No clients found</div>
            <div className="text-sm">
              {searchTerm ? 'Try a different search term' : 'Clients will appear here as they submit requests'}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client, i) => (
              <motion.div
                key={client.email}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-midnight-surface rounded-2xl p-6 border border-soft-border hover:border-electric-blue/50 transition-all"
              >
                {/* Avatar */}
                <div className="w-16 h-16 bg-gradient-to-br from-electric-blue to-neon-cyan rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">
                    {client.name.charAt(0).toUpperCase()}
                  </span>
                </div>

                {/* Info */}
                <h3 className="text-xl font-bold text-pure-white mb-1">{client.name}</h3>
                <a 
                  href={`mailto:${client.email}`}
                  className="text-electric-blue hover:text-neon-cyan text-sm block mb-2"
                >
                  {client.email}
                </a>

                {client.company && (
                  <div className="text-cool-gray text-sm mb-3">🏢 {client.company}</div>
                )}

                {client.phone && (
                  <div className="text-cool-gray text-sm mb-3">📞 {client.phone}</div>
                )}

                {/* Stats */}
                <div className="flex items-center gap-4 mb-3 pt-3 border-t border-soft-border">
                  <div>
                    <div className="text-pure-white font-bold">{client.totalRequests}</div>
                    <div className="text-muted-gray text-xs">Requests</div>
                  </div>
                  <div>
                    <div className="text-pure-white font-bold">{client.services.length}</div>
                    <div className="text-muted-gray text-xs">Services</div>
                  </div>
                </div>

                {/* Services Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {client.services.slice(0, 2).map((service, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-soft-border/50 text-cool-gray text-xs rounded-full capitalize"
                    >
                      {service.replace('-', ' ')}
                    </span>
                  ))}
                  {client.services.length > 2 && (
                    <span className="px-2 py-1 bg-soft-border/50 text-cool-gray text-xs rounded-full">
                      +{client.services.length - 2}
                    </span>
                  )}
                </div>

                {/* Last Contact */}
                <div className="text-muted-gray text-xs">
                  Last contact: {formatDate(client.lastContact)}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default AdminClients
