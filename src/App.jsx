import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './CartContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Admin from './components/Admin'
import Toast from './components/Toast'

function HomePage() {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <>
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <main>
        <Hero />
        <About />
        <Menu />
        <Footer />
      </main>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <Toast />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
