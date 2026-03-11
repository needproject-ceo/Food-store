import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="text-8xl mb-6"
        >
          🍽️
        </motion.div>
        <h1 className="font-poppins font-bold text-8xl text-primary mb-4">404</h1>
        <h2 className="font-poppins font-bold text-2xl text-gray-900 dark:text-white mb-4">Page Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
          Oops! Looks like this page went out for delivery and never came back. 🚚
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition-colors">
            Go Home
          </Link>
          <Link to="/menu" className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            Browse Menu
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
