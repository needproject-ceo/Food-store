import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import OrderTracker from '../components/OrderTracker'
import LoadingSpinner from '../components/LoadingSpinner'
import api from '../utils/api'

export default function OrderTracking() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = () => api.get(`/orders/${id}`).then(res => setOrder(res.data)).catch(console.error)
    fetchOrder().finally(() => setLoading(false))
    const interval = setInterval(fetchOrder, 30000)
    return () => clearInterval(interval)
  }, [id])

  if (loading) return <LoadingSpinner fullPage />

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-poppins font-bold text-3xl text-gray-900 dark:text-white mb-8">
            Track <span className="gradient-text">Order</span>
          </h1>

          {order ? (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mb-6">
                <OrderTracker status={order.status} />
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mb-6">
                <h2 className="font-poppins font-semibold text-lg text-gray-900 dark:text-white mb-4">Order Details</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Order ID</span><span className="text-xs text-gray-700 dark:text-gray-300">{order._id}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Status</span><span className="capitalize text-primary font-medium">{order.status?.replace('_', ' ')}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Total</span><span className="font-bold text-primary">${order.total?.toFixed(2)}</span></div>
                  {order.estimatedDelivery && <div className="flex justify-between"><span className="text-gray-500">Est. Delivery</span><span>{new Date(order.estimatedDelivery).toLocaleTimeString()}</span></div>}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <h2 className="font-poppins font-semibold text-lg text-gray-900 dark:text-white mb-4">Items</h2>
                <div className="space-y-2">
                  {order.items?.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{item.name} x{item.quantity}</span>
                      <span className="font-medium text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500">Order not found</p>
              <Link to="/menu" className="mt-4 inline-block text-primary hover:underline">Go to Menu</Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
