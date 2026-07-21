import React from 'react'
import { useCart } from '../CartContext'
import FocusTrap from 'focus-trap-react'
import PropTypes from 'prop-types'

export default function CartDrawer({ open, onClose }) {
  const { items, updateQty, removeItem, clearCart, total, count, buildWhatsApp } = useCart()

  const handleOrder = () => {
    const url = buildWhatsApp()
    if (url) window.open(url, '_blank')
  }

  return (
    <>
      {/* Backdrop (El fondo oscuro) */}
      <div
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClose();
          }
        }}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* 2. Envolvemos el Drawer aquí para atrapar el teclado */}
      <FocusTrap active={open } focusTrapOptions={{ allowOutsideClick: true }}>
        {/* Drawer */}
        <div className={`fixed right-0 top-0 bottom-0 w-full max-w-md bg-char-800 border-l border-char-600 z-50 flex flex-col transition-transform duration-400 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-char-600">
            <div>
              <h2 className="font-display text-3xl text-white tracking-wide">TU CARRITO</h2>
              <p className="font-body text-sm text-gray-400">{count} {count === 1 ? 'producto' : 'productos'}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-char-700 rounded-xl">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-20">
                <span className="text-6xl">🍔</span>
                <p className="font-display text-3xl text-char-600">CARRITO VACÍO</p>
                <p className="font-body text-gray-500 text-sm">Agrega algo del menú para empezar tu pedido</p>
                <button onClick={onClose} className="mt-2 text-fire-400 font-body text-sm hover:underline">
                  Ver menú →
                </button>
              </div>
            ) : (
              items.map(item => (
                <div key={item.id} className="flex gap-3 bg-char-700 rounded-xl p-3 border border-char-600">
                  <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-500 text-white text-sm truncate">{item.name}</p>
                    <p className="font-body text-fire-400 font-500 text-sm mt-0.5">${(item.price * item.qty).toFixed(0)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQty(item.id, -1)}
                        className="w-7 h-7 rounded-full bg-char-600 hover:bg-char-500 text-white text-base flex items-center justify-center transition-colors">
                        −
                      </button>
                      <span className="font-body font-500 text-white text-sm w-5 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)}
                        className="w-7 h-7 rounded-full bg-char-600 hover:bg-char-500 text-white text-base flex items-center justify-center transition-colors">
                        +
                      </button>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)}
                    className="text-gray-500 hover:text-red-400 transition-colors self-start p-1">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="px-6 py-5 border-t border-char-600 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-body text-gray-400">Subtotal</span>
                <span className="font-display text-3xl text-white">${total.toFixed(0)} <span className="text-sm font-body text-gray-400">MXN</span></span>
              </div>
              <button onClick={handleOrder}
                className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white font-body font-500 text-base py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-green-500/30 active:scale-95">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                </svg>
                Pedir por WhatsApp
              </button>
              <button onClick={clearCart}
                className="w-full text-gray-500 hover:text-red-400 font-body text-sm transition-colors py-1">
                Vaciar carrito
              </button>
            </div>
          )}
        </div>
      </FocusTrap>
    </>
  )

  CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
}