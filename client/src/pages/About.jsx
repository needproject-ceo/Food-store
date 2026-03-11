import { motion } from 'framer-motion'
import AnimatedCounter from '../components/AnimatedCounter'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460] py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-poppins font-bold text-5xl text-white mb-4">About <span className="text-primary">FoodStore</span></h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">We're on a mission to bring the best food from the best restaurants directly to your door, fast, fresh, and with a smile.</p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-poppins font-bold text-3xl text-gray-900 dark:text-white mb-4">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">FoodStore was founded in 2024 with a simple idea: everyone deserves access to amazing food, whenever they want it. We started with a handful of restaurants and a passion for good food.</p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Today, we partner with over 500 restaurants across 100+ cities, delivering millions of meals with care and speed. Our technology ensures your food arrives at the perfect temperature, every time.</p>
            </div>
            <div className="text-8xl text-center">🍔</div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[{ v: '500', s: '+', l: 'Restaurants' }, { v: '100', s: '+', l: 'Cities' }, { v: '50000', s: '+', l: 'Orders Delivered' }, { v: '10000', s: '+', l: 'Happy Customers' }].map(({ v, s, l }) => (
              <motion.div key={l} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                <p className="font-poppins font-bold text-3xl text-primary"><AnimatedCounter value={v} suffix={s} /></p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{l}</p>
              </motion.div>
            ))}
          </div>

          {/* Values */}
          <h2 className="font-poppins font-bold text-3xl text-gray-900 dark:text-white mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[['🚀', 'Speed', 'We guarantee delivery in under 45 minutes because your time matters.'],
              ['❤️', 'Quality', 'We partner only with restaurants that meet our strict quality standards.'],
              ['🌍', 'Community', 'We support local restaurants and help them grow their business.']].map(([emoji, title, desc]) => (
              <motion.div key={title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">{emoji}</div>
                <h3 className="font-poppins font-bold text-lg text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
