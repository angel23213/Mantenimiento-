import React, { useState, useEffect, useRef } from 'react'
import { useCart } from '../CartContext'
import { initialMenu, CATEGORIES } from '../menuData'

function MenuCard({ item, onAdd }) {
  return (
    <div className={`menu-card bg-char-800 border rounded-2xl overflow-hidden flex flex-col ${
      item.available ? 'border-char-600 hover:border-fire-600/50' : 'border-char-700 opacity-60'
    }`}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        {!item.available && (
          <div className="absolute inset-0 bg-char-900/70 flex items-center justify-center">
            <span className="bg-char-800 text-gray-400 text-xs font-body uppercase tracking-widest px-3 py-1 rounded-full border border-char-600">
              No disponible
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-char-900/80 backdrop-blur text-lemon-400 font-display text-xl px-3 py-1 rounded-full">
          ${item.price}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display text-2xl text-white tracking-wide">{item.name}</h3>
        <p className="font-body text-sm text-gray-400 mt-1 flex-1 leading-relaxed">{item.desc}</p>
        <button
          onClick={() => onAdd(item)}
          disabled={!item.available}
          className="mt-4 w-full bg-fire-600 hover:bg-fire-500 disabled:bg-char-700 disabled:cursor-not-allowed text-white font-body font-500 text-sm py-2.5 rounded-xl transition-all active:scale-95 hover:shadow-lg hover:shadow-fire-500/20"
        >
          {item.available ? 'Agregar al carrito 🔥' : 'No disponible'}
        </button>
      </div>
    </div>
  )
}

export default function Menu({ menuData }) {
  const { addItem } = useCart()
  const [active, setActive] = useState('all')
  const ref = useRef(null)

  const items = menuData || initialMenu
  const filtered = active === 'all' ? items : items.filter(i => i.category === active)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    const els = ref.current?.querySelectorAll('.reveal')
    els?.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="menu" ref={ref} className="relative py-28 bg-char-800">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lemon-500 to-transparent" />
      <div className="max-w-6xl mx-auto px-4">
        <div className="reveal text-center mb-12">
          <p className="font-accent text-lemon-400 text-xl mb-2">Lo que sale de la parrilla</p>
          <h2 className="font-display text-6xl md:text-8xl text-white tracking-wide">MENÚ</h2>
        </div>

        {/* Category tabs */}
        <div className="reveal flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActive(cat.id)}
              className={`font-body font-500 text-sm px-5 py-2.5 rounded-full transition-all border ${
                active === cat.id
                  ? 'bg-fire-600 border-fire-600 text-white shadow-lg shadow-fire-500/30'
                  : 'bg-transparent border-char-600 text-gray-400 hover:border-fire-600/50 hover:text-white'
              }`}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => (
            <div key={item.id} className="reveal">
              <MenuCard item={item} onAdd={addItem} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
