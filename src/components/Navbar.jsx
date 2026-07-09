import React, { useState, useEffect } from 'react'
import { useCart } from '../CartContext'

export default function Navbar({ onCartOpen }) {
  const { count } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '#about', label: 'Nosotros' },
    { href: '#menu', label: 'Menú' },
    { href: '#ubicacion', label: 'Ubicación' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-char-900/95 backdrop-blur-md shadow-lg shadow-black/50 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="text-3xl font-display tracking-wider text-fire-500 group-hover:text-lemon-400 transition-colors">
            LEMON
          </span>
          <span className="text-3xl font-display tracking-wider text-lemon-400 group-hover:text-fire-500 transition-colors">
            BROS
          </span>
          <span className="text-2xl">🍋</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="nav-link text-sm font-body font-500 text-gray-300 hover:text-fire-400 transition-colors uppercase tracking-widest">
              {l.label}
            </a>
          ))}
          <a href="/admin"
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors uppercase tracking-widest border border-gray-700 rounded px-3 py-1 hover:border-gray-500">
            Admin
          </a>
        </div>

        {/* Cart */}
        <div className="flex items-center gap-4">
          <button onClick={onCartOpen}
            className="relative flex items-center gap-2 bg-fire-600 hover:bg-fire-500 text-white font-body font-500 text-sm px-4 py-2 rounded-full transition-all hover:shadow-lg hover:shadow-fire-500/30 active:scale-95">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Carrito</span>
            {count > 0 && (
              <span className="cart-badge absolute -top-2 -right-2 bg-lemon-400 text-char-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-300 hover:text-white">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-char-800/98 backdrop-blur border-t border-char-700 px-4 py-4">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="block py-3 text-gray-300 hover:text-fire-400 uppercase tracking-widest text-sm border-b border-char-700/50">
              {l.label}
            </a>
          ))}
          <a href="/admin" onClick={() => setMenuOpen(false)}
            className="block py-3 text-gray-500 hover:text-gray-300 uppercase tracking-widest text-xs">
            Panel Admin
          </a>
        </div>
      )}
    </nav>
  )
}
