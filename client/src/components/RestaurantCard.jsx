import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiStar, FiClock, FiTruck } from 'react-icons/fi'

export default function RestaurantCard({ restaurant }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <Link to={`/restaurants/${restaurant._id}`}>
        <div className="relative overflow-hidden h-48">
          <img
            src={restaurant.coverImage || restaurant.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400'}
            alt={restaurant.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          {restaurant.featured && (
            <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
              🔥 Featured
            </span>
          )}
          {!restaurant.isOpen && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium">Closed</span>
            </div>
          )}
          <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-800 dark:text-white text-xs font-bold px-2 py-1 rounded-full">
            {restaurant.priceRange || '$$'}
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-poppins font-semibold text-gray-900 dark:text-white text-lg mb-1 hover:text-primary transition-colors">
            {restaurant.name}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 line-clamp-1">
            {restaurant.cuisine?.join(' · ')}
          </p>

          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
              <FiStar className="text-yellow-400 fill-yellow-400 w-4 h-4" />
              <span className="font-medium text-gray-900 dark:text-white">{restaurant.rating || '4.5'}</span>
              <span>({restaurant.reviewCount || 0})</span>
            </span>
            <span className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
              <FiClock className="w-3.5 h-3.5" />
              <span>{restaurant.deliveryTime || '30-45 min'}</span>
            </span>
            <span className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
              <FiTruck className="w-3.5 h-3.5" />
              <span>${restaurant.deliveryFee?.toFixed(2) || '2.99'}</span>
            </span>
          </div>

          {restaurant.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {restaurant.tags.slice(0, 3).map(tag => (
                <span key={tag} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
