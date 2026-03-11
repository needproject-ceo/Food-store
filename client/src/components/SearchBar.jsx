import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiX } from 'react-icons/fi'

export default function SearchBar({ placeholder = 'Search for food, restaurants...', className = '' }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) navigate(`/menu?search=${encodeURIComponent(query.trim())}`)
  }

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className="relative flex items-center">
        <FiSearch className="absolute left-4 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
        />
        {query && (
          <button type="button" onClick={() => setQuery('')} className="absolute right-4 text-gray-400 hover:text-gray-600">
            <FiX className="w-5 h-5" />
          </button>
        )}
      </div>
    </form>
  )
}
