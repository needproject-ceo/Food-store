import { motion } from 'framer-motion'
import { FiCheck, FiClock, FiPackage, FiTruck, FiHome } from 'react-icons/fi'

const steps = [
  { key: 'pending', label: 'Order Placed', icon: FiCheck },
  { key: 'confirmed', label: 'Confirmed', icon: FiPackage },
  { key: 'preparing', label: 'Preparing', icon: FiClock },
  { key: 'out_for_delivery', label: 'On the Way', icon: FiTruck },
  { key: 'delivered', label: 'Delivered', icon: FiHome },
]

export default function OrderTracker({ status }) {
  const currentIndex = steps.findIndex(s => s.key === status)

  return (
    <div className="flex items-center justify-between w-full py-4">
      {steps.map((step, index) => {
        const Icon = step.icon
        const isCompleted = index <= currentIndex
        const isCurrent = index === currentIndex

        return (
          <div key={step.key} className="flex-1 flex flex-col items-center relative">
            {index < steps.length - 1 && (
              <div className={`absolute top-5 left-1/2 w-full h-1 ${isCompleted && index < currentIndex ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`} />
            )}
            <motion.div
              animate={isCurrent ? { scale: [1, 1.15, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${
                isCompleted ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
              }`}
            >
              <Icon className="w-5 h-5" />
            </motion.div>
            <p className={`text-xs mt-2 text-center ${isCompleted ? 'text-primary font-medium' : 'text-gray-400'}`}>
              {step.label}
            </p>
          </div>
        )
      })}
    </div>
  )
}
