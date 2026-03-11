import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'

export default function Checkout() {
  const { items, total, clearCart, restaurantId } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState({
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zip: user?.address?.zip || '',
  })
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [notes, setNotes] = useState('')

  const deliveryFee = 2.99
  const tax = total * 0.1
  const orderTotal = total + deliveryFee + tax

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-poppins font-bold text-2xl mb-4">Please login to checkout</h2>
          <Link to="/login" className="bg-primary text-white px-6 py-3 rounded-full">Login</Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-poppins font-bold text-2xl mb-4">Your cart is empty</h2>
          <Link to="/menu" className="bg-primary text-white px-6 py-3 rounded-full">Browse Menu</Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!address.street || !address.city) return toast.error('Please fill in delivery address')
    setLoading(true)
    try {
      const orderItems = items.map(i => ({ food: i._id, name: i.name, price: i.price, quantity: i.quantity, image: i.image }))
      const res = await api.post('/orders', {
        restaurant: restaurantId,
        items: orderItems,
        subtotal: total,
        deliveryFee,
        tax,
        total: orderTotal,
        deliveryAddress: address,
        paymentMethod,
        notes,
      })
      clearCart()
      navigate(`/order-confirmation/${res.data._id}`)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-poppins font-bold text-3xl text-gray-900 dark:text-white mb-8">
          Checkout
        </motion.h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <h2 className="font-poppins font-semibold text-lg text-gray-900 dark:text-white mb-4">📍 Delivery Address</h2>
              <div className="grid grid-cols-1 gap-4">
                <input value={address.street} onChange={e => setAddress(a => ({ ...a, street: e.target.value }))} placeholder="Street Address" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-transparent focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white" required />
                <div className="grid grid-cols-3 gap-3">
                  <input value={address.city} onChange={e => setAddress(a => ({ ...a, city: e.target.value }))} placeholder="City" className="px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-transparent focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white col-span-1" required />
                  <input value={address.state} onChange={e => setAddress(a => ({ ...a, state: e.target.value }))} placeholder="State" className="px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-transparent focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white col-span-1" />
                  <input value={address.zip} onChange={e => setAddress(a => ({ ...a, zip: e.target.value }))} placeholder="ZIP" className="px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-transparent focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white col-span-1" />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <h2 className="font-poppins font-semibold text-lg text-gray-900 dark:text-white mb-4">💳 Payment Method</h2>
              <div className="grid grid-cols-3 gap-3">
                {[['card', '💳 Card'], ['cash', '💵 Cash'], ['wallet', '📱 Wallet']].map(([val, label]) => (
                  <button key={val} type="button" onClick={() => setPaymentMethod(val)}
                    className={`py-3 rounded-xl text-sm font-medium border-2 transition-all ${paymentMethod === val ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <h2 className="font-poppins font-semibold text-lg text-gray-900 dark:text-white mb-4">📝 Order Notes</h2>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any special instructions..." rows={3}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-transparent focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white resize-none" />
            </div>
          </div>

          {/* Right: Summary */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="font-poppins font-semibold text-lg text-gray-900 dark:text-white mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4 max-h-52 overflow-y-auto">
                {items.map(item => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400 truncate mr-2">{item.name} x{item.quantity}</span>
                    <span className="font-medium text-gray-900 dark:text-white flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Delivery</span><span>${deliveryFee.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span>Total</span><span className="text-primary">${orderTotal.toFixed(2)}</span>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-primary text-white py-4 rounded-full font-semibold text-lg hover:bg-red-600 transition-colors disabled:opacity-70"
              >
                {loading ? 'Placing Order...' : `Place Order · $${orderTotal.toFixed(2)}`}
              </motion.button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
