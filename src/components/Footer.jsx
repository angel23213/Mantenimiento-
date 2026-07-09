import React from 'react'

export default function Footer() {
  return (
    <>
      {/* Location Section */}
      <section id="ubicacion" className="relative py-24 bg-char-900">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fire-600 to-transparent" />
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-accent text-fire-400 text-xl mb-2">¿Dónde encontrarnos?</p>
            <h2 className="font-display text-6xl md:text-7xl text-white tracking-wide">UBICACIÓN</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Map embed */}
            <div className="rounded-2xl overflow-hidden border border-char-600 aspect-video">
              <iframe
                title="Lemon Bros Ubicación"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.9!2d-98.6698!3d19.9187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDU1JzA3LjMiTiA5OMKwNDAnMTEuMyJX!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-fire-600/20 border border-fire-600/40 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-fire-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-body font-500 text-white">Dirección</p>
                  <p className="font-body text-gray-400 mt-1">Blvd. San Alfonso, Santa Matilde<br />Zempoala, Hidalgo, México</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-fire-600/20 border border-fire-600/40 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-fire-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-body font-500 text-white">Horarios</p>
                  <p className="font-body text-gray-400 mt-1">Lunes – Viernes: 1pm – 10pm<br />Sábado – Domingo: 12pm – 11pm</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-fire-600/20 border border-fire-600/40 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-fire-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-body font-500 text-white">WhatsApp / Pedidos</p>
                  <a href="https://wa.me/525548023904" target="_blank" rel="noopener noreferrer"
                    className="font-body text-fire-400 hover:text-fire-300 mt-1 block transition-colors">
                    55 4802 3904
                  </a>
                </div>
              </div>

              <a href="https://wa.me/525548023904" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white font-body font-500 px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-green-500/30 active:scale-95">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                </svg>
                Escríbenos ahora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-char-900 border-t border-char-700 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl text-fire-500 tracking-wider">LEMON</span>
            <span className="font-display text-2xl text-lemon-400 tracking-wider">BROS</span>
            <span className="text-xl">🍋</span>
          </div>
          <p className="font-body text-xs text-gray-600 text-center">
            © {new Date().getFullYear()} Lemon Bros · Zempoala, Hidalgo · Todos los derechos reservados
          </p>
          <a href="/admin" className="font-body text-xs text-gray-600 hover:text-gray-400 transition-colors uppercase tracking-widest">
            Panel Admin
          </a>
        </div>
      </footer>
    </>
  )
}
