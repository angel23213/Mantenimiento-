import React from 'react'
import { useCart } from '../CartContext'

export default function Toast() {
  const { toast } = useCart()
  if (!toast) return null
  return (
    <div className="toast fixed bottom-6 right-6 z-[100] bg-char-800 border border-fire-600/50 text-white font-body text-sm px-5 py-3 rounded-xl shadow-2xl shadow-black/50 flex items-center gap-2 max-w-xs">
      <span className="text-fire-400 text-base">🔥</span>
      <span>{toast}</span>
    </div>
  )
}
