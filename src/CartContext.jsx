import React, { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [toast, setToast] = useState(null)

  const showToast = useCallback((msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }, [])

  const addItem = useCallback((product) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...product, qty: 1 }]
    })
    showToast(`¡${product.name} agregado! 🔥`)
  }, [showToast])

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQty = useCallback((id, delta) => {
    setItems(prev => {
      return prev.map(i => {
        if (i.id !== id) return i
        const newQty = i.qty + delta
        return newQty <= 0 ? null : { ...i, qty: newQty }
      }).filter(Boolean)
    })
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  const buildWhatsApp = useCallback(() => {
    if (items.length === 0) return ''
    const lines = items.map(i => `• ${i.qty}x ${i.name} — $${(i.price * i.qty).toFixed(0)}`)
    const text = `🍋🔥 *Pedido Lemon Bros*\n\n${lines.join('\n')}\n\n*Total: $${total.toFixed(0)} MXN*\n\n📍 Blvd. San Alfonso, Santa Matilde, Zempoala, Hidalgo`
    return `https://wa.me/525548023904?text=${encodeURIComponent(text)}`
  }, [items, total])

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count, buildWhatsApp, toast }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
