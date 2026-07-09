import React, { useEffect, useRef } from 'react'

const stats = [
  { value: '3+', label: 'Años en la parrilla' },
  { value: '12', label: 'Recetas únicas' },
  { value: '100%', label: 'Carne de Hidalgo' },
  { value: '∞', label: 'Amor por el fuego' },
]

export default function About() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.15 }
    )
    const els = ref.current?.querySelectorAll('.reveal')
    els?.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={ref} className="relative py-28 bg-char-900 overflow-hidden">
      {/* Decorative fire line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fire-600 to-transparent" />

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="reveal relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&q=80"
                alt="Parrilla Lemon Bros"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-char-900/80 via-transparent to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-fire-600 rounded-2xl p-6 shadow-2xl shadow-fire-500/30">
              <p className="font-display text-5xl text-white leading-none">100%</p>
              <p className="font-body text-sm text-fire-200 mt-1">Parrilla artesanal</p>
            </div>
            {/* Decorative border */}
            <div className="absolute -inset-3 border border-fire-600/20 rounded-3xl pointer-events-none" />
          </div>

          {/* Text side */}
          <div className="space-y-6">
            <div className="reveal">
              <p className="font-accent text-fire-400 text-xl mb-2">Nuestra historia</p>
              <h2 className="font-display text-6xl md:text-7xl text-white leading-none tracking-wide">
                FUEGO<br />
                <span className="text-fire-500">HIDALGUENSE</span>
              </h2>
            </div>

            <div className="reveal space-y-4 text-gray-300 font-body text-base leading-relaxed">
              <p>
                Lemon Bros nació de una obsesión: crear la hamburguesa perfecta en tierras hidalguenses.
                En Zempoala, donde el mezquite crece libre y el chile pulque tiene siglos de historia,
                encontramos los ingredientes para algo diferente.
              </p>
              <p>
                No somos una franquicia. Somos dos hermanos con pinzas en mano, carbón encendido
                y la promesa de que cada patty que sale de nuestra parrilla lleva el sabor real
                del Blvd. San Alfonso.
              </p>
              <p className="text-fire-400 font-500">
                Zempoala no es Veracruz — es Hidalgo. Y orgullosos lo gritamos en cada mordisco. 🍋🔥
              </p>
            </div>

            {/* Stats grid */}
            <div className="reveal grid grid-cols-2 gap-4 pt-4">
              {stats.map(s => (
                <div key={s.label} className="bg-char-800 border border-char-600 rounded-xl p-4">
                  <p className="font-display text-4xl text-fire-400">{s.value}</p>
                  <p className="font-body text-xs text-gray-400 mt-1 uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
