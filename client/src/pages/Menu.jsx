import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import FoodCard from '../components/FoodCard'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import LoadingSpinner from '../components/LoadingSpinner'
import api from '../utils/api'

export default function Menu() {
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('')
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') || ''

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (category) params.append('category', category)
        if (search) params.append('search', search)
        params.append('limit', '40')
        const res = await api.get(`/foods?${params}`)
        setFoods(res.data.foods || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchFoods()
  }, [category, search])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 pt-8">
          <h1 className="font-poppins font-bold text-4xl text-gray-900 dark:text-white mb-2">
            Our <span className="gradient-text">Menu</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Explore all our delicious offerings</p>
        </motion.div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <SearchBar />
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter selected={category} onChange={setCategory} />
        </div>

        {/* Results */}
        {loading ? (
          <LoadingSpinner />
        ) : foods.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="font-poppins font-semibold text-xl text-gray-900 dark:text-white mb-2">No items found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try a different search or category</p>
          </div>
        ) : (
          <>
            <p className="text-gray-500 dark:text-gray-400 mb-6">{foods.length} items found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {foods.map((food, i) => (
                <motion.div key={food._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <FoodCard food={food} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
