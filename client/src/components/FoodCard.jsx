import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiStar, FiClock, FiPlus } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

export default function FoodCard({ food }) {
  const { addItem } = useCart()

  const handleAdd = (e) => {
    e.preventDefault()
    addItem(food, { _id: food.restaurant?._id || food.restaurant, name: food.restaurant?.name || 'Restaurant' })
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <Link to={`/food/${food._id}`}>
        <div className="relative overflow-hidden h-48">
          <img
            src={food.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'}
            alt={food.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          {food.isFeatured && (
            <span className="absolute top-3 left-3 bg-accent text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
              ⭐ Featured
            </span>
          )}
          {food.isVeg && (
            <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              🌿 Veg
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/food/${food._id}`}>
          <h3 className="font-poppins font-semibold text-gray-900 dark:text-white mb-1 hover:text-primary transition-colors line-clamp-1">
            {food.name}
          </h3>
        </Link>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 line-clamp-2">{food.description}</p>

        <div className="flex items-center space-x-3 mb-3 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center space-x-1">
            <FiStar className="text-yellow-400 fill-yellow-400 w-3.5 h-3.5" />
            <span>{food.rating || '4.5'}</span>
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <FiClock className="w-3.5 h-3.5" />
            <span>{food.prepTime || '15-20 min'}</span>
          </span>
          {food.calories > 0 && (
            <>
              <span>•</span>
              <span>{food.calories} cal</span>
            </>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="font-poppins font-bold text-xl text-primary">${food.price?.toFixed(2)}</span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            className="bg-primary text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-md hover:shadow-primary/40"
          >
            <FiPlus className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
