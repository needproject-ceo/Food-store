import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiStar, FiClock, FiTruck, FiArrowLeft } from 'react-icons/fi'
import FoodCard from '../components/FoodCard'
import ReviewCard from '../components/ReviewCard'
import LoadingSpinner from '../components/LoadingSpinner'
import api from '../utils/api'

export default function RestaurantDetail() {
  const { id } = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const [foods, setFoods] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rRes, fRes, revRes] = await Promise.all([
          api.get(`/restaurants/${id}`),
          api.get(`/foods?restaurant=${id}&limit=40`),
          api.get(`/reviews?restaurant=${id}`),
        ])
        setRestaurant(rRes.data)
        setFoods(fRes.data.foods || [])
        setReviews(revRes.data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  if (loading) return <LoadingSpinner fullPage />
  if (!restaurant) return <div className="text-center pt-32">Restaurant not found</div>

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      {/* Cover */}
      <div className="relative h-72 md:h-96">
        <img src={restaurant.coverImage || restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <Link to="/restaurants" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
            <FiArrowLeft className="mr-2" /> Back to Restaurants
          </Link>
          <h1 className="font-poppins font-bold text-3xl md:text-4xl text-white mb-2">{restaurant.name}</h1>
          <p className="text-white/80 mb-3">{restaurant.cuisine?.join(' · ')}</p>
          <div className="flex flex-wrap gap-4 text-white/90 text-sm">
            <span className="flex items-center gap-1"><FiStar className="text-yellow-400 fill-yellow-400" />{restaurant.rating} ({restaurant.reviewCount} reviews)</span>
            <span className="flex items-center gap-1"><FiClock />{restaurant.deliveryTime}</span>
            <span className="flex items-center gap-1"><FiTruck />${restaurant.deliveryFee} delivery</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <p className="text-gray-600 dark:text-gray-400 mb-8">{restaurant.description}</p>

        {/* Menu */}
        <h2 className="font-poppins font-bold text-2xl text-gray-900 dark:text-white mb-6">Menu</h2>
        {foods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {foods.map((food, i) => (
              <motion.div key={food._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <FoodCard food={food} />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 mb-12">No menu items available.</p>
        )}

        {/* Reviews */}
        {reviews.length > 0 && (
          <>
            <h2 className="font-poppins font-bold text-2xl text-gray-900 dark:text-white mb-6">Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map(r => <ReviewCard key={r._id} review={r} />)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
