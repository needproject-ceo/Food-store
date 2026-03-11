import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiStar, FiClock, FiShield } from 'react-icons/fi'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460]">
      {/* Background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <FiStar className="text-accent w-4 h-4" />
              <span className="text-white text-sm">Top Rated Food Delivery</span>
            </motion.div>

            <h1 className="font-poppins font-bold text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
              Delicious Food{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Delivered Fast
              </span>
            </h1>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Order from hundreds of restaurants near you. Fresh ingredients, amazing taste, delivered to your door in under 45 minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center space-x-2 bg-primary hover:bg-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5"
              >
                <span>Order Now</span>
                <FiArrowRight />
              </Link>
              <Link
                to="/restaurants"
                className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                <span>Browse Restaurants</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { icon: FiStar, value: '4.8', label: 'App Rating' },
                { icon: FiClock, value: '30min', label: 'Avg Delivery' },
                { icon: FiShield, value: '100%', label: 'Safe & Secure' },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center">
                  <div className="flex justify-center mb-2">
                    <Icon className="text-accent w-6 h-6" />
                  </div>
                  <p className="font-poppins font-bold text-2xl text-white">{value}</p>
                  <p className="text-gray-400 text-sm">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero image/illustration */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="relative flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-9xl shadow-2xl shadow-primary/40">
                🍔
              </div>
              {/* Floating badges */}
              {[
                { emoji: '🍕', label: 'Pizza', pos: '-left-8 top-12', delay: 0 },
                { emoji: '🍣', label: 'Sushi', pos: '-right-8 top-16', delay: 0.5 },
                { emoji: '🌮', label: 'Tacos', pos: 'left-4 -bottom-4', delay: 1 },
                { emoji: '🍰', label: 'Desserts', pos: 'right-4 -bottom-8', delay: 1.5 },
              ].map(({ emoji, label, pos, delay }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: delay + 0.5, type: 'spring' }}
                  className={`absolute ${pos} glass rounded-2xl px-3 py-2 flex items-center space-x-2`}
                >
                  <span className="text-2xl">{emoji}</span>
                  <span className="text-white text-sm font-medium">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
