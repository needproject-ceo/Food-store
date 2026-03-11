import { FiStar, FiThumbsUp } from 'react-icons/fi'

export default function ReviewCard({ review }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < review.rating)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
            {review.user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{review.user?.name || 'Anonymous'}</p>
            <p className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex">
          {stars.map((filled, i) => (
            <FiStar key={i} className={`w-4 h-4 ${filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
          ))}
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{review.comment}</p>
      {review.helpful > 0 && (
        <div className="mt-3 flex items-center space-x-1 text-xs text-gray-400">
          <FiThumbsUp className="w-3 h-3" />
          <span>{review.helpful} found helpful</span>
        </div>
      )}
    </div>
  )
}
