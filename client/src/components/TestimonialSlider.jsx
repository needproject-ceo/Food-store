import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const testimonials = [
  { name: 'Sarah Johnson', role: 'Food Enthusiast', rating: 5, comment: 'Amazing service! The food arrived hot and fresh. The app is so easy to use and the variety of restaurants is incredible.', avatar: '👩' },
  { name: 'Mike Chen', role: 'Regular Customer', rating: 5, comment: "FoodStore has become my go-to for ordering food. Fast delivery, accurate orders, and great customer support. Highly recommend!", avatar: '👨' },
  { name: 'Emma Wilson', role: 'Busy Professional', rating: 4, comment: "Perfect for busy weekdays! The tracking feature is great and I love that I can schedule deliveries in advance.", avatar: '👩‍💼' },
  { name: 'David Kim', role: 'Foodie Blogger', rating: 5, comment: 'The restaurant selection is fantastic. I love discovering new places through FoodStore. The reviews are helpful and accurate.', avatar: '👨‍💻' },
]

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const next = () => { setDirection(1); setCurrent(prev => (prev + 1) % testimonials.length) }
  const prev = () => { setDirection(-1); setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length) }

  return (
    <div className="relative max-w-2xl mx-auto">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -60 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center"
        >
          <div className="text-5xl mb-4">{testimonials[current].avatar}</div>
          <div className="flex justify-center mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <FiStar key={i} className={`w-5 h-5 ${i < testimonials[current].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg italic mb-6">"{testimonials[current].comment}"</p>
          <p className="font-poppins font-bold text-gray-900 dark:text-white">{testimonials[current].name}</p>
          <p className="text-gray-400 text-sm">{testimonials[current].role}</p>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center items-center mt-6 space-x-4">
        <button onClick={prev} className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <FiChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <div className="flex space-x-2">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
              className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-primary w-6' : 'bg-gray-300 dark:bg-gray-600'}`}
            />
          ))}
        </div>
        <button onClick={next} className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <FiChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>
  )
}
