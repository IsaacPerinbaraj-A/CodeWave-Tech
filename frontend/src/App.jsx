import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ParticleBackground from './components/background/ParticleBackground'
import ScrollToTop from './components/utils/ScrollToTop'
import Home from './pages/Home'
import ServiceDetail from './pages/ServiceDetail'
import ServiceRequest from './pages/ServiceRequest'
import Success from './pages/Success'
import Error from './pages/Error'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminRequests from './pages/admin/AdminRequests'
import RequestDetail from './pages/admin/RequestDetail'
import AdminAnalytics from './pages/admin/AdminAnalytics'
import AdminClients from './pages/admin/AdminClients'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminToken')
  return isAuthenticated ? children : <Navigate to="/admin/login" />
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      
      <Routes>
        {/* Admin Routes (No Navbar/Footer) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/requests"
          element={
            <ProtectedRoute>
              <AdminRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/requests/:id"
          element={
            <ProtectedRoute>
              <RequestDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute>
              <AdminAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/clients"
          element={
            <ProtectedRoute>
              <AdminClients />
            </ProtectedRoute>
          }
        />

        {/* Public Routes (With Navbar/Footer) */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen flex flex-col bg-space-black relative">
              <ParticleBackground />
              <div className="relative z-10">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services/:serviceId" element={<ServiceDetail />} />
                    <Route path="/request/:serviceId" element={<ServiceRequest />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/error" element={<Error />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
