import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem('foodstore_cart')
    return stored ? JSON.parse(stored) : []
  })
  const [restaurantId, setRestaurantId] = useState(null)

  useEffect(() => {
    localStorage.setItem('foodstore_cart', JSON.stringify(items))
  }, [items])

  const addItem = (food, restaurant) => {
    if (restaurantId && restaurantId !== restaurant._id && items.length > 0) {
      if (!window.confirm('Your cart has items from another restaurant. Clear cart and add this item?')) return
      setItems([])
    }
    setRestaurantId(restaurant._id)
    setItems(prev => {
      const existing = prev.find(i => i._id === food._id)
      if (existing) {
        toast.success(`${food.name} quantity updated`)
        return prev.map(i => i._id === food._id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      toast.success(`${food.name} added to cart`)
      return [...prev, { ...food, quantity: 1, restaurantId: restaurant._id, restaurantName: restaurant.name }]
    })
  }

  const removeItem = (id) => {
    setItems(prev => {
      const updated = prev.filter(i => i._id !== id)
      if (updated.length === 0) setRestaurantId(null)
      return updated
    })
  }

  const updateQuantity = (id, qty) => {
    if (qty < 1) return removeItem(id)
    setItems(prev => prev.map(i => i._id === id ? { ...i, quantity: qty } : i))
  }

  const clearCart = () => {
    setItems([])
    setRestaurantId(null)
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, count, restaurantId }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
export default CartContext
