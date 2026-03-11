import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiStar, FiClock, FiArrowLeft, FiPlus, FiMinus } from 'react-icons/fi'
import LoadingSpinner from '../components/LoadingSpinner'
import ReviewCard from '../components/ReviewCard'
import { useCart } from '../context/CartContext'
import api from '../utils/api'

export default function FoodDetail() {
  const { id } = useParams()
  const [food, setFood] = useState(null)
  const [reviews, setReviews] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fRes, revRes] = await Promise.all([
          api.get(`/foods/${id}`),
          api.get(`/reviews?food=${id}`),
        ])
        setFood(fRes.data)
        setReviews(revRes.data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(food, food.restaurant || { _id: food.restaurant, name: 'Restaurant' })
    }
  }

  if (loading) return <LoadingSpinner fullPage />
  if (!food) return <div className="text-center pt-32">Food item not found</div>

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link to="/menu" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary mb-8 transition-colors">
          <FiArrowLeft className="mr-2" /> Back to Menu
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <img src={food.image} alt={food.name} className="w-full h-80 object-cover rounded-2xl shadow-lg" />
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs px-3 py-1 rounded-full">{food.category}</span>
              {food.isVeg && <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">🌿 Veg</span>}
            </div>
            <h1 className="font-poppins font-bold text-3xl text-gray-900 dark:text-white mb-3">{food.name}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{food.description}</p>

            <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1"><FiStar className="text-yellow-400 fill-yellow-400" />{food.rating}</span>
              <span className="flex items-center gap-1"><FiClock />{food.prepTime}</span>
              {food.calories > 0 && <span>{food.calories} cal</span>}
            </div>

            {food.restaurant?.name && (
              <Link to={`/restaurants/${food.restaurant._id}`} className="text-primary text-sm hover:underline mb-6 block">
                From: {food.restaurant.name} →
              </Link>
            )}

            <div className="flex items-center gap-4 mb-6">
              <span className="font-poppins font-bold text-3xl text-primary">${food.price?.toFixed(2)}</span>
            </div>

            {/* Quantity + Add */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  <FiMinus className="w-4 h-4" />
                </button>
                <span className="font-bold text-gray-900 dark:text-white w-6 text-center">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAdd}
                className="flex-1 bg-primary text-white py-3 rounded-full font-semibold hover:bg-red-600 transition-colors"
              >
                Add to Cart · ${(food.price * quantity).toFixed(2)}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        {reviews.length > 0 && (
          <div className="mt-12">
            <h2 className="font-poppins font-bold text-2xl text-gray-900 dark:text-white mb-6">Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map(r => <ReviewCard key={r._id} review={r} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
