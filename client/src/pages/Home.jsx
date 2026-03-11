import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import FoodCard from '../components/FoodCard'
import RestaurantCard from '../components/RestaurantCard'
import AnimatedCounter from '../components/AnimatedCounter'
import TestimonialSlider from '../components/TestimonialSlider'
import LoadingSpinner from '../components/LoadingSpinner'
import api from '../utils/api'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function Home() {
  const [featuredFoods, setFeaturedFoods] = useState([])
  const [featuredRestaurants, setFeaturedRestaurants] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [foodsRes, restaurantsRes] = await Promise.all([
          api.get('/foods?featured=true&limit=8'),
          api.get('/restaurants?featured=true&limit=6'),
        ])
        setFeaturedFoods(foodsRes.data.foods || [])
        setFeaturedRestaurants(restaurantsRes.data.restaurants || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <HeroSection />

      {/* Stats */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500', suffix: '+', label: 'Restaurants' },
              { value: '10000', suffix: '+', label: 'Happy Customers' },
              { value: '50000', suffix: '+', label: 'Orders Delivered' },
              { value: '100', suffix: '+', label: 'Cities' },
            ].map(({ value, suffix, label }) => (
              <motion.div key={label} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <p className="font-poppins font-bold text-4xl text-primary">
                  <AnimatedCounter value={value} suffix={suffix} />
                </p>
                <p className="text-gray-500 dark:text-gray-400 mt-1">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-gray-900 dark:text-white mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Order your favorite food in just 3 simple steps</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', emoji: '🔍', title: 'Browse & Choose', desc: 'Explore hundreds of restaurants and thousands of dishes. Filter by cuisine, price, and more.' },
              { step: '02', emoji: '🛒', title: 'Add to Cart', desc: 'Add your favorite items to cart and customize your order to your liking.' },
              { step: '03', emoji: '🚀', title: 'Fast Delivery', desc: 'Track your order in real time and get it delivered hot and fresh to your door.' },
            ].map(({ step, emoji, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-5xl mb-4">{emoji}</div>
                <span className="text-primary font-bold text-sm">{step}</span>
                <h3 className="font-poppins font-bold text-xl text-gray-900 dark:text-white mt-1 mb-3">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Foods */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-poppins font-bold text-3xl text-gray-900 dark:text-white">
                Featured <span className="gradient-text">Dishes</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Handpicked favorites from our top restaurants</p>
            </div>
            <Link to="/menu" className="text-primary font-medium hover:underline">View All →</Link>
          </motion.div>
          {loading ? <LoadingSpinner /> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredFoods.map((food, i) => (
                <motion.div key={food._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                  <FoodCard food={food} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-poppins font-bold text-3xl text-gray-900 dark:text-white">
                Top <span className="gradient-text">Restaurants</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Discover the best dining experiences near you</p>
            </div>
            <Link to="/restaurants" className="text-primary font-medium hover:underline">View All →</Link>
          </motion.div>
          {loading ? <LoadingSpinner /> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredRestaurants.map((r, i) => (
                <motion.div key={r._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <RestaurantCard restaurant={r} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-gray-900 dark:text-white mb-4">
              What Our <span className="gradient-text">Customers Say</span>
            </h2>
          </motion.div>
          <TestimonialSlider />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-poppins font-bold text-4xl text-white mb-4">Ready to Order?</h2>
            <p className="text-red-100 text-lg mb-8 max-w-xl mx-auto">Join thousands of happy customers. Get your first delivery fee FREE!</p>
            <Link to="/menu" className="inline-block bg-white text-primary font-bold px-10 py-4 rounded-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              Order Now 🚀
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
