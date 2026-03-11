import { motion } from 'framer-motion'

const categories = [
  { id: '', label: 'All', emoji: '🍽️' },
  { id: 'Burgers', label: 'Burgers', emoji: '🍔' },
  { id: 'Pizza', label: 'Pizza', emoji: '🍕' },
  { id: 'Sushi Rolls', label: 'Sushi', emoji: '🍣' },
  { id: 'Tacos', label: 'Tacos', emoji: '🌮' },
  { id: 'Pasta', label: 'Pasta', emoji: '🍝' },
  { id: 'Bowls', label: 'Bowls', emoji: '🥗' },
  { id: 'Desserts', label: 'Desserts', emoji: '🍰' },
  { id: 'Breakfast', label: 'Breakfast', emoji: '🥞' },
  { id: 'Drinks', label: 'Drinks', emoji: '🥤' },
]

export default function CategoryFilter({ selected, onChange }) {
  return (
    <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
      {categories.map(cat => (
        <motion.button
          key={cat.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(cat.id)}
          className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selected === cat.id
              ? 'bg-primary text-white shadow-md shadow-primary/40'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
          }`}
        >
          <span>{cat.emoji}</span>
          <span>{cat.label}</span>
        </motion.button>
      ))}
    </div>
  )
}
