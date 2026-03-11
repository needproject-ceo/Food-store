import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import LoadingSpinner from '../components/LoadingSpinner'
import api from '../utils/api'

export default function OrderConfirmation() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/orders/${id}`).then(res => setOrder(res.data)).catch(console.error).finally(() => setLoading(false))
  }, [id])

  if (loading) return <LoadingSpinner fullPage />

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center pt-20 pb-16 px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-xl max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <span className="text-5xl">✅</span>
        </motion.div>

        <h1 className="font-poppins font-bold text-3xl text-gray-900 dark:text-white mb-2">Order Confirmed!</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Your order has been placed successfully. We'll deliver it in approximately 30-45 minutes.
        </p>

        {order && (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-6 text-left">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Order ID</span>
              <span className="font-medium text-gray-900 dark:text-white text-xs">{order._id}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Total</span>
              <span className="font-bold text-primary">${order.total?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status</span>
              <span className="capitalize bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-medium">{order.status}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Link to={`/order-tracking/${id}`} className="bg-primary text-white py-3 rounded-full font-semibold hover:bg-red-600 transition-colors">
            Track Your Order
          </Link>
          <Link to="/menu" className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-full font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            Order More Food
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
