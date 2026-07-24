import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types' // <-- 1. Importamos la librería de validación

function FlameGroup({ left, flameConfigs }) {
  return (
    <div className="flame-group" style={{ left: `${left}%` }}>
      {flameConfigs.map((f, i) => (
        <div key={i} className={`flame ${f.type}`} style={{
          width: f.w,
          height: f.h,
          left: f.left,
          animationDelay: f.delay,
          animationDuration: f.dur,
          opacity: f.opacity || 1,
        }} />
      ))}
    </div>
  )
}

// <-- 2. Aquí añadimos la validación estricta que te pidieron
FlameGroup.propTypes = {
  // Valida que 'left' sea estrictamente un número y obligatorio
  left: PropTypes.number.isRequired, 
  
  // Valida la estructura compleja de 'flameConfigs' (un arreglo de objetos con llaves específicas)
  flameConfigs: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      w: PropTypes.string.isRequired,
      h: PropTypes.string.isRequired,
      left: PropTypes.string.isRequired,
      delay: PropTypes.string.isRequired,
      dur: PropTypes.string.isRequired,
      opacity: PropTypes.number,
    })
  ).isRequired,
}

function Embers() {
  const embers = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${5 + Math.random() * 90}%`,
    delay: `${Math.random() * 4}s`,
    dur: `${2 + Math.random() * 3}s`,
    drift: `${(Math.random() - 0.5) * 60}px`,
    size: `${3 + Math.random() * 4}px`,
  }))

  return (
    <>
      {embers.map(e => (
        <div key={e.id} className="ember absolute" style={{
          left: e.left,
          bottom: '10%',
          width: e.size,
          height: e.size,
          '--duration': e.dur,
          '--delay': e.delay,
          '--drift': e.drift,
          animationDelay: e.delay,
          animationDuration: e.dur,
        }} />
      ))}
    </>
  )
}

export default function Hero() {
  const flameGroups = [
    { left: 0, configs: [
      { type: 'flame-outer', w: '60px', h: '200px', left: '0px', delay: '0s', dur: '2.2s' },
      { type: 'flame-mid', w: '40px', h: '160px', left: '10px', delay: '-0.4s', dur: '2.6s' },
      { type: 'flame-inner', w: '25px', h: '120px', left: '18px', delay: '-0.8s', dur: '2s' },
      { type: 'flame-core', w: '12px', h: '80px', left: '24px', delay: '-1s', dur: '1.8s' },
    ]},
    { left: 5, configs: [
      { type: 'flame-outer', w: '50px', h: '170px', left: '0px', delay: '-0.3s', dur: '2.4s' },
      { type: 'flame-mid', w: '32px', h: '130px', left: '9px', delay: '-0.7s', dur: '2.1s' },
      { type: 'flame-inner', w: '18px', h: '90px', left: '16px', delay: '-1.1s', dur: '1.9s' },
    ]},
    { left: 12, configs: [
      { type: 'flame-outer', w: '70px', h: '220px', left: '0px', delay: '-0.5s', dur: '2s' },
      { type: 'flame-mid', w: '50px', h: '180px', left: '10px', delay: '-0.9s', dur: '2.5s' },
      { type: 'flame-inner', w: '30px', h: '140px', left: '20px', delay: '-1.3s', dur: '2.2s' },
      { type: 'flame-core', w: '15px', h: '100px', left: '27px', delay: '-0.2s', dur: '1.7s' },
    ]},
    { left: 22, configs: [
      { type: 'flame-outer', w: '55px', h: '190px', left: '0px', delay: '-1s', dur: '2.3s' },
      { type: 'flame-mid', w: '38px', h: '150px', left: '8px', delay: '-0.6s', dur: '1.9s' },
      { type: 'flame-inner', w: '22px', h: '110px', left: '16px', delay: '-1.4s', dur: '2.1s' },
    ]},
    { left: 32, configs: [
      { type: 'flame-outer', w: '65px', h: '210px', left: '0px', delay: '-0.2s', dur: '2.1s' },
      { type: 'flame-mid', w: '45px', h: '170px', left: '10px', delay: '-0.8s', dur: '2.4s' },
      { type: 'flame-inner', w: '28px', h: '130px', left: '18px', delay: '-1.2s', dur: '2s' },
      { type: 'flame-core', w: '14px', h: '90px', left: '25px', delay: '-0.5s', dur: '1.6s' },
    ]},
    { left: 44, configs: [
      { type: 'flame-outer', w: '58px', h: '200px', left: '0px', delay: '-0.7s', dur: '2.2s' },
      { type: 'flame-mid', w: '40px', h: '160px', left: '9px', delay: '-1.1s', dur: '2.6s' },
      { type: 'flame-inner', w: '24px', h: '120px', left: '17px', delay: '-0.3s', dur: '2.3s' },
    ]},
    { left: 55, configs: [
      { type: 'flame-outer', w: '72px', h: '230px', left: '0px', delay: '-1.2s', dur: '2s' },
      { type: 'flame-mid', w: '52px', h: '190px', left: '10px', delay: '-0.4s', dur: '2.5s' },
      { type: 'flame-inner', w: '32px', h: '150px', left: '20px', delay: '-0.9s', dur: '2.2s' },
      { type: 'flame-core', w: '16px', h: '110px', left: '28px', delay: '-1.5s', dur: '1.8s' },
    ]},
    { left: 67, configs: [
      { type: 'flame-outer', w: '56px', h: '185px', left: '0px', delay: '-0.6s', dur: '2.3s' },
      { type: 'flame-mid', w: '38px', h: '145px', left: '9px', delay: '-1s', dur: '2s' },
      { type: 'flame-inner', w: '22px', h: '105px', left: '17px', delay: '-0.2s', dur: '1.9s' },
    ]},
    { left: 77, configs: [
      { type: 'flame-outer', w: '62px', h: '205px', left: '0px', delay: '-0.9s', dur: '2.1s' },
      { type: 'flame-mid', w: '44px', h: '165px', left: '9px', delay: '-1.3s', dur: '2.4s' },
      { type: 'flame-inner', w: '27px', h: '125px', left: '18px', delay: '-0.5s', dur: '2s' },
      { type: 'flame-core', w: '13px', h: '85px', left: '26px', delay: '-0.8s', dur: '1.7s' },
    ]},
    { left: 87, configs: [
      { type: 'flame-outer', w: '68px', h: '215px', left: '0px', delay: '-1.4s', dur: '2.2s' },
      { type: 'flame-mid', w: '48px', h: '175px', left: '10px', delay: '-0.7s', dur: '2.6s' },
      { type: 'flame-inner', w: '29px', h: '135px', left: '19px', delay: '-1.1s', dur: '2.3s' },
    ]},
    { left: 94, configs: [
      { type: 'flame-outer', w: '54px', h: '180px', left: '0px', delay: '-0.3s', dur: '2s' },
      { type: 'flame-mid', w: '36px', h: '140px', left: '9px', delay: '-0.9s', dur: '1.9s' },
      { type: 'flame-inner', w: '20px', h: '100px', left: '17px', delay: '-1.5s', dur: '2.1s' },
      { type: 'flame-core', w: '10px', h: '65px', left: '25px', delay: '-0.6s', dur: '1.6s' },
    ]},
  ]

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-char-900">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-char-900 via-red-950/20 to-char-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(234,88,12,0.15)_0%,_transparent_70%)]" />

      {/* Heat shimmer */}
      <div className="heat-shimmer" />

      {/* Flames */}
      <div className="flame-container w-full">
        {flameGroups.map((g, i) => (
          <FlameGroup key={i} left={g.left} flameConfigs={g.configs} />
        ))}
        <Embers />
      </div>

      {/* Bottom fire gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-char-900 to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 flex flex-col items-center">
        {/* Pre-title */}
        <p className="font-accent text-fire-400 text-xl mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Est. Zempoala, Hidalgo
        </p>

        {/* Main title */}
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h1 className="font-display tracking-[0.08em] leading-none flex flex-col items-center">
            <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-fire-500 fire-glow animate-flicker">
              LEMON
            </span>
            <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-lemon-400 lemon-glow -mt-2 md:-mt-5">
              BROS
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <div className="animate-fade-in mt-2" style={{ animationDelay: '0.6s' }}>
          <p className="text-gray-300 font-body text-lg md:text-2xl max-w-md tracking-wide">
            Parrilla artesanal al fuego vivo.
            <br />
            <span className="text-fire-400">Sabor que prende desde el primer mordisco.</span>
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <a href="#menu"
            className="group relative bg-fire-600 hover:bg-fire-500 text-white font-body font-500 text-lg px-10 py-4 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-fire-500/40 hover:scale-105 active:scale-95">
            <span className="relative z-10">Ver Menú 🔥</span>
          </a>
          <a href="https://wa.me/525548023904" target="_blank" rel="noopener noreferrer"
            className="border-2 border-lemon-400 text-lemon-400 hover:bg-lemon-400 hover:text-char-900 font-body font-500 text-lg px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 active:scale-95">
            Pedir por WhatsApp
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 animate-bounce opacity-60">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-fire-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}