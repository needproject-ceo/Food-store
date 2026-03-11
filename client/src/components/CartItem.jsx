import { motion } from 'framer-motion'
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm"
    >
      <img
        src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'}
        alt={item.name}
        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 dark:text-white truncate">{item.name}</h4>
        <p className="text-primary font-semibold">${item.price?.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item._id, item.quantity - 1)}
          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
        >
          <FiMinus className="w-3 h-3" />
        </button>
        <span className="w-6 text-center font-semibold text-gray-900 dark:text-white">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item._id, item.quantity + 1)}
          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
        >
          <FiPlus className="w-3 h-3" />
        </button>
      </div>
      <div className="text-right">
        <p className="font-bold text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
        <button
          onClick={() => removeItem(item._id)}
          className="text-red-400 hover:text-red-600 transition-colors mt-1"
        >
          <FiTrash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}
