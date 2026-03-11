import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiShoppingCart, FiTrash2 } from 'react-icons/fi'
import CartItem from '../components/CartItem'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, total, clearCart, restaurantId } = useCart()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-poppins font-bold text-3xl text-gray-900 dark:text-white">
              Your <span className="gradient-text">Cart</span>
            </h1>
            {items.length > 0 && (
              <button onClick={clearCart} className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm">
                <FiTrash2 className="w-4 h-4" /> Clear Cart
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-24">
              <FiShoppingCart className="w-20 h-20 text-gray-300 dark:text-gray-700 mx-auto mb-6" />
              <h3 className="font-poppins font-bold text-2xl text-gray-900 dark:text-white mb-3">Your cart is empty</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8">Add some delicious items to get started!</p>
              <Link to="/menu" className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition-colors">
                Browse Menu
              </Link>
            </div>
          ) : (
            <>
              <AnimatePresence>
                <div className="space-y-3 mb-8">
                  {items.map(item => <CartItem key={item._id} item={item} />)}
                </div>
              </AnimatePresence>

              {/* Summary */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <h3 className="font-poppins font-semibold text-lg text-gray-900 dark:text-white mb-4">Order Summary</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Delivery Fee</span>
                    <span>$2.99</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Tax (10%)</span>
                    <span>${(total * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span className="text-primary">${(total + 2.99 + total * 0.1).toFixed(2)}</span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="block w-full bg-primary text-white text-center py-4 rounded-full font-semibold text-lg hover:bg-red-600 transition-colors"
                >
                  Proceed to Checkout →
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}
