import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Mail, 
  Phone, 
  Calendar, 
  Download, 
  Send, 
  BarChart3, 
  TrendingUp,
  Filter,
  Search,
  RefreshCw,
  FileSearch,
  AlertCircle
} from 'lucide-react'

const AdminPage = () => {
  const [waitlistData, setWaitlistData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [emailSubject, setEmailSubject] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [accessDenied, setAccessDenied] = useState(false)
  const [adminKey, setAdminKey] = useState('')
  const [showRecoveryModal, setShowRecoveryModal] = useState(false)
  const [logData, setLogData] = useState('')
  const [showEmailRecoveryModal, setShowEmailRecoveryModal] = useState(false)
  const [emailData, setEmailData] = useState('')

  // Fetch real data from API
  useEffect(() => {
    const fetchWaitlistData = async () => {
      try {
        setLoading(true)
        
        // Get admin key from environment or prompt user (only if not already stored)
        let currentAdminKey = adminKey
        if (!currentAdminKey) {
          currentAdminKey = prompt('Enter admin access key:')
          if (!currentAdminKey) {
            setLoading(false)
            setAccessDenied(true)
            return
          }
          setAdminKey(currentAdminKey)
        }

        const response = await fetch('/api/get-submissions', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-key': currentAdminKey
          }
        })

        if (!response.ok) {
                  if (response.status === 401) {
          setLoading(false)
          setAccessDenied(true)
          alert('Unauthorized - Invalid admin key')
          return
        }
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        
        if (result.success) {
          const formattedData = result.data.submissions.map(submission => ({
            id: submission.id,
            name: submission.name,
            email: submission.email,
            phone: submission.phone,
            petType: submission.petType,
            message: submission.message,
            date: new Date(submission.date).toISOString().split('T')[0], // Format date
            type: submission.type,
            language: submission.language
          }))
          
          setWaitlistData(formattedData)
          setFilteredData(formattedData)
        } else {
          throw new Error(result.message || 'Failed to fetch data')
        }

      } catch (error) {
        alert('Failed to load waitlist data: ' + error.message)
        
        // Fallback to empty array instead of mock data
        setWaitlistData([])
        setFilteredData([])
      } finally {
        setLoading(false)
      }
    }

    fetchWaitlistData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Refresh function
  const handleRefresh = async () => {
    if (!adminKey) {
      alert('Admin key not available. Please reload the page.')
      return
    }

    try {
      setLoading(true)
      
      const response = await fetch('/api/get-submissions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey
        }
      })

      if (!response.ok) {
        if (response.status === 401) {
          setAccessDenied(true)
          alert('Admin session expired - please reload the page')
          return
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      
      if (result.success) {
        const formattedData = result.data.submissions.map(submission => ({
          id: submission.id,
          name: submission.name,
          email: submission.email,
          phone: submission.phone,
          petType: submission.petType,
          message: submission.message,
          date: new Date(submission.date).toISOString().split('T')[0],
          type: submission.type,
          language: submission.language
        }))
        
        setWaitlistData(formattedData)
        setFilteredData(formattedData)
        
        alert(`Refreshed! Found ${formattedData.length} submissions.`)
      } else {
        throw new Error(result.message || 'Failed to refresh data')
      }

    } catch (error) {
      alert('Failed to refresh data: ' + error.message)
      setLoading(false)
    }
  }

  // Recovery function
  const handleRecoverFromLogs = async () => {
    if (!logData.trim()) {
      alert('Please paste your Vercel logs containing submission data.')
      return
    }

    try {
      setLoading(true)
      
      const response = await fetch('/api/recover-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey
        },
        body: JSON.stringify({ logData })
      })

      const result = await response.json()
      
      if (result.success) {
        const recoveredData = result.data.submissions
        setWaitlistData(recoveredData)
        setFilteredData(recoveredData)
        setShowRecoveryModal(false)
        setLogData('')
        alert(`Successfully recovered ${recoveredData.length} submissions from logs!`)
      } else {
        throw new Error(result.message || 'Failed to recover submissions')
      }

    } catch (error) {
      alert('Failed to recover submissions: ' + error.message)
      setLoading(false)
    }
  }

  // Email recovery function
  const handleRecoverFromEmails = async () => {
    if (!emailData.trim()) {
      alert('Please paste your email content containing form submissions.')
      return
    }

    try {
      setLoading(true)
      
      const response = await fetch('/api/recover-from-emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey
        },
        body: JSON.stringify({ emailData })
      })

      const result = await response.json()
      
      if (result.success) {
        const recoveredData = result.data.submissions
        // Merge with existing data
        const existingIds = new Set(waitlistData.map(item => item.email))
        const newData = recoveredData.filter(item => !existingIds.has(item.email))
        const mergedData = [...waitlistData, ...newData]
        
        setWaitlistData(mergedData)
        setFilteredData(mergedData)
        setShowEmailRecoveryModal(false)
        setEmailData('')
        alert(`Successfully recovered ${recoveredData.length} submissions from emails! (${newData.length} new, ${recoveredData.length - newData.length} duplicates skipped)`)
      } else {
        throw new Error(result.message || 'Failed to recover submissions from emails')
      }

    } catch (error) {
      alert('Failed to recover submissions from emails: ' + error.message)
      setLoading(false)
    }
  }

  // Filter and search functionality
  useEffect(() => {
    let filtered = waitlistData

    if (filterType !== 'all') {
      filtered = filtered.filter(user => user.type === filterType)
    }

    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.petType.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredData(filtered)
  }, [searchTerm, filterType, waitlistData])

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredData.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredData.map(user => user.id))
    }
  }

  const handleSendEmail = async () => {
    try {
      // Get admin key (you might want to store this from the initial login)
      const adminKey = prompt('Enter admin access key to send emails:')
      if (!adminKey) {
        return
      }

      const response = await fetch('/api/send-bulk-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedUserIds: selectedUsers,
          subject: emailSubject,
          message: emailMessage,
          adminKey: adminKey
        })
      })

      const result = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          alert('Unauthorized - Invalid admin key')
          return
        }
        throw new Error(result.message || 'Failed to send emails')
      }

      if (result.success) {
        alert(`Emails sent successfully to ${result.data.totalSent} users!`)
        
        // Close modal and reset
        setShowEmailModal(false)
        setEmailSubject('')
        setEmailMessage('')
        setSelectedUsers([])
      } else {
        throw new Error(result.message || 'Failed to send emails')
      }

    } catch (error) {
      alert('Failed to send emails: ' + error.message)
    }
  }

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Pet Type', 'Message', 'Date', 'Type', 'Language']
    const csvContent = [
      headers.join(','),
      ...filteredData.map(user => [
        user.name,
        user.email,
        user.phone,
        user.petType,
        `"${user.message}"`,
        user.date,
        user.type,
        user.language || 'EN'
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'waitlist.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const stats = {
    total: waitlistData.length,
    earlyAccess: waitlistData.filter(u => u.type === 'early-access').length,
    preOrders: waitlistData.filter(u => u.type === 'pre-order').length,
    thisWeek: waitlistData.filter(u => {
      const userDate = new Date(u.date)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return userDate >= weekAgo
    }).length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading waitlist data...</p>
        </div>
      </div>
    )
  }

  if (accessDenied) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-6">
              You need admin access to view this page. Please contact the administrator for access.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">HausPet Admin Dashboard</h1>
          <p className="text-gray-600">Manage your waitlist and communicate with potential customers</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-sky-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Mail className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Early Access</p>
                <p className="text-2xl font-bold text-gray-900">{stats.earlyAccess}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <BarChart3 className="w-8 h-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pre-Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.preOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">{stats.thisWeek}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent appearance-none bg-white"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="early-access">Early Access</option>
                  <option value="pre-order">Pre-Orders</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>

              <button
                onClick={() => setShowRecoveryModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <FileSearch className="w-4 h-4" />
                <span>Recover from Logs</span>
              </button>

              <button
                onClick={() => setShowEmailRecoveryModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Recover from Emails</span>
              </button>

              <button
                onClick={exportToCSV}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={() => setShowEmailModal(true)}
                disabled={selectedUsers.length === 0}
                className="flex items-center space-x-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span>Send Email ({selectedUsers.length})</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredData.length && filteredData.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pet Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Language
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <Users className="w-12 h-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
                        <p className="text-gray-500 mb-4">
                          {waitlistData.length === 0 
                            ? "No form submissions found. All submissions are now stored permanently and will persist across deployments and restarts."
                            : "No submissions match your current search or filter criteria."
                          }
                        </p>
                        {waitlistData.length === 0 && (
                          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm">
                            <p className="text-green-800 font-medium mb-1">✅ Professional Storage Active</p>
                            <p className="text-green-700">
                              Using permanent database storage. All data persists forever and never gets lost. If no data shows, try submitting a test form.
                            </p>
                          </div>
                        )}
                        <button
                          onClick={handleRefresh}
                          className="flex items-center space-x-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span>Refresh Data</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredData.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.message}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center text-sm text-gray-900">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          {user.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          {user.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {user.petType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.type === 'early-access' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {user.type === 'early-access' ? 'Early Access' : 'Pre-Order'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.language === 'DE' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.language || 'EN'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {new Date(user.date).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Email Modal */}
        {showEmailModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Send Email to {selectedUsers.length} User(s)
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Email subject..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    placeholder="Email message..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendEmail}
                  disabled={!emailSubject || !emailMessage}
                  className="flex-1 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Send Email
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Recovery Modal */}
        {showRecoveryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <FileSearch className="w-6 h-6 text-orange-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Recover Submissions from Logs</h3>
              </div>

              <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-orange-900 mb-2">Storage Issue Detected</h4>
                    <p className="text-sm text-orange-800 mb-2">
                      The current storage uses Vercel&apos;s /tmp directory which is temporary and gets cleared. 
                      You can recover past submissions from Vercel function logs.
                    </p>
                    <div className="text-sm text-orange-800">
                      <strong>How to get logs:</strong>
                      <ol className="list-decimal list-inside mt-1 space-y-1">
                        <li>Go to your Vercel dashboard</li>
                        <li>Navigate to your project → Functions tab</li>
                        <li>Find &quot;submit-form&quot; function logs</li>
                        <li>Copy logs containing &quot;🔍 SUBMISSION_LOG_START&quot; and &quot;🔍 SUBMISSION_LOG_END&quot;</li>
                        <li>Paste them below</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paste Vercel Logs Here
                </label>
                <textarea
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none font-mono text-xs"
                  value={logData}
                  onChange={(e) => setLogData(e.target.value)}
                  placeholder="Paste your Vercel function logs here...&#10;&#10;Look for lines containing:&#10;🔍 SUBMISSION_LOG_START&#10;{...submission data...}&#10;🔍 SUBMISSION_LOG_END"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowRecoveryModal(false)
                    setLogData('')
                  }}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRecoverFromLogs}
                  disabled={!logData.trim() || loading}
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Recover Data'}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Email Recovery Modal */}
        {showEmailRecoveryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Recover Submissions from Emails</h3>
              </div>

              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-2">Recover from Email Submissions</h4>
                    <p className="text-sm text-blue-800 mb-2">
                      Extract form submission data from the emails you received when users submitted forms.
                    </p>
                    <div className="text-sm text-blue-800">
                      <strong>How to get email data:</strong>
                      <ol className="list-decimal list-inside mt-1 space-y-1">
                        <li>Go to your email inbox (where HausPet submissions are sent)</li>
                        <li>Find emails with &quot;HausPet Early Access&quot; or &quot;HausPet Pre-order&quot; subjects</li>
                        <li>Open each email and copy the entire email content</li>
                        <li>Paste all email contents below (you can paste multiple emails)</li>
                        <li>The system will extract Name, Email, Phone, Pet info, etc.</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paste Email Content Here
                </label>
                <textarea
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                  value={emailData}
                  onChange={(e) => setEmailData(e.target.value)}
                  placeholder={`Paste your HausPet email submissions here...

Example:
Subject: HausPet Early Access Application
Name: John Doe
Email: john@example.com
Phone: +1234567890
Pet Type: Dog
Pet Name: Max
Message: Interested in early access...

---

You can paste multiple emails here, separated by --- or similar markers.`}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowEmailRecoveryModal(false)
                    setEmailData('')
                  }}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRecoverFromEmails}
                  disabled={!emailData.trim() || loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Recover from Emails'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPage