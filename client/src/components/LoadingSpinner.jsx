export default function LoadingSpinner({ size = 'md', fullPage = false }) {
  const sizeClass = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }[size]

  const spinner = (
    <div className={`${sizeClass} border-4 border-gray-200 border-t-primary rounded-full animate-spin`} />
  )

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-dark/80 backdrop-blur-sm z-50">
        {spinner}
      </div>
    )
  }

  return <div className="flex justify-center items-center py-8">{spinner}</div>
}
