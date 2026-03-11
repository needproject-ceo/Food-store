import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiShoppingBag } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'

export default function Profile() {
  const { user, updateUser, logout } = useAuth()
  const [orders, setOrders] = useState([])
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '', street: user?.address?.street || '', city: user?.address?.city || '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!user) return
    api.get('/orders/my').then(res => setOrders(res.data || [])).catch(console.error)
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-poppins font-bold text-2xl mb-4">Please login to view your profile</h2>
          <Link to="/login" className="bg-primary text-white px-6 py-3 rounded-full">Login</Link>
        </div>
      </div>
    )
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await api.put('/auth/profile', { name: form.name, phone: form.phone, address: { street: form.street, city: form.city } })
      updateUser(res.data)
      setEditing(false)
      toast.success('Profile updated!')
    } catch (err) {
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              {user.name?.[0]?.toUpperCase()}
            </div>
            <h2 className="font-poppins font-bold text-xl text-gray-900 dark:text-white mb-1">{user.name}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{user.email}</p>
            <button onClick={() => setEditing(!editing)} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm mx-auto hover:bg-primary hover:text-white transition-colors">
              <FiEdit2 className="w-3 h-3" /> Edit Profile
            </button>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Edit Form */}
            {editing && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <h3 className="font-poppins font-semibold text-lg text-gray-900 dark:text-white mb-4">Edit Profile</h3>
                <form onSubmit={handleSave} className="space-y-4">
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full Name" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-transparent focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white" />
                  <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="Phone Number" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-transparent focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white" />
                  <input value={form.street} onChange={e => setForm(f => ({ ...f, street: e.target.value }))} placeholder="Street Address" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-transparent focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white" />
                  <input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="City" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-transparent focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white" />
                  <div className="flex gap-3">
                    <button type="submit" disabled={saving} className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-red-600 transition-colors disabled:opacity-70">
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button type="button" onClick={() => setEditing(false)} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-full font-medium">
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-poppins font-semibold text-lg text-gray-900 dark:text-white mb-4">Account Info</h3>
              <div className="space-y-3">
                {[
                  [FiUser, 'Name', user.name],
                  [FiMail, 'Email', user.email],
                  [FiPhone, 'Phone', user.phone || 'Not set'],
                  [FiMapPin, 'Address', [user.address?.street, user.address?.city].filter(Boolean).join(', ') || 'Not set'],
                ].map(([Icon, label, value]) => (
                  <div key={label} className="flex items-center gap-3 text-sm">
                    <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-gray-500 w-16">{label}:</span>
                    <span className="text-gray-700 dark:text-gray-300">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Orders */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-poppins font-semibold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FiShoppingBag className="w-5 h-5" /> Recent Orders
              </h3>
              {orders.length === 0 ? (
                <p className="text-gray-400 text-sm">No orders yet. <Link to="/menu" className="text-primary hover:underline">Order now!</Link></p>
              ) : (
                <div className="space-y-3">
                  {orders.slice(0, 5).map(order => (
                    <Link key={order._id} to={`/order-tracking/${order._id}`} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{order.restaurant?.name || 'Restaurant'}</p>
                        <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary text-sm">${order.total?.toFixed(2)}</p>
                        <span className="text-xs capitalize bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full text-gray-500">{order.status}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
