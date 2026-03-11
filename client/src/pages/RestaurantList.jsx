import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import RestaurantCard from '../components/RestaurantCard'
import SearchBar from '../components/SearchBar'
import LoadingSpinner from '../components/LoadingSpinner'
import api from '../utils/api'

const cuisines = ['All', 'American', 'Italian', 'Japanese', 'Mexican', 'Indian', 'Chinese', 'Korean', 'Healthy']

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [cuisine, setCuisine] = useState('')

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true)
      try {
        const params = cuisine ? `?cuisine=${cuisine}` : ''
        const res = await api.get(`/restaurants${params}`)
        setRestaurants(res.data.restaurants || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchRestaurants()
  }, [cuisine])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 pt-8">
          <h1 className="font-poppins font-bold text-4xl text-gray-900 dark:text-white mb-2">
            All <span className="gradient-text">Restaurants</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Find the perfect restaurant for any craving</p>
        </motion.div>

        <div className="max-w-xl mx-auto mb-8">
          <SearchBar placeholder="Search restaurants..." />
        </div>

        {/* Cuisine filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {cuisines.map(c => (
            <button
              key={c}
              onClick={() => setCuisine(c === 'All' ? '' : c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                (c === 'All' && !cuisine) || cuisine === c
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-primary'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : restaurants.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏪</div>
            <h3 className="font-poppins font-semibold text-xl text-gray-900 dark:text-white mb-2">No restaurants found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((r, i) => (
              <motion.div key={r._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <RestaurantCard restaurant={r} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
