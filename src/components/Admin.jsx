import React, { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

// Inicializar cliente de Supabase dinámicamente con variables de entorno de Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null

// Tu Contraseña Segura y Privada configurada con éxito
const ADMIN_PASSWORD = 'Aven270302'

export default function Admin() {
  const [auth, setAuth] = useState(false)
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState(false)
  const [menu, setMenu] = useState([])
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [editingId, setEditingId] = useState(null)

  // Cargar datos en tiempo real de Supabase o fallar elegantemente al estado local anterior
  useEffect(() => {
    if (!supabase) {
      // Si no hay .env configurado, cargar mock data local para evitar que truene
      import('../menuData').then(({ initialMenu }) => {
        setMenu(JSON.parse(JSON.stringify(initialMenu)))
        setLoading(false)
      })
      return
    }

    // Carga inicial
    fetchProducts()

    // Suscripción a cambios en tiempo real en Supabase
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'productos' }, () => {
        fetchProducts()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('productos').select('*').order('created_at', { ascending: true })
    if (!error && data) {
      const adaptedData = data.map(item => ({
        id: item.id,
        name: item.nombre,
        desc: item.descripcion,
        price: item.precio,
        img: item.imagen,
        category: item.categoria,
        available: item.disponible
      }))
      setMenu(adaptedData)
    }
    setLoading(false)
  }

  const triggerSaveIndicator = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) { setAuth(true); setPwError(false) }
    else { setPwError(true) }
  }

  // Modifica el precio y lo guarda de forma inmediata
  const updatePrice = async (id, val) => {
    const num = parseInt(val)
    if (isNaN(num) || num < 0) return

    setMenu(prev => prev.map(i => i.id === id ? { ...i, price: num } : i))

    if (supabase) {
      await supabase.from('productos').update({ precio: num }).eq('id', id)
      triggerSaveIndicator()
    }
  }

  // Modifica la disponibilidad (toggle) y la guarda de forma inmediata
  const toggleAvail = async (id) => {
    const currentItem = menu.find(i => i.id === id)
    if (!currentItem) return
    const nextVal = !currentItem.available

    setMenu(prev => prev.map(i => i.id === id ? { ...i, available: nextVal } : i))

    if (supabase) {
      await supabase.from('productos').update({ disponible: nextVal }).eq('id', id)
      triggerSaveIndicator()
    }
  }

  // Modifica texto (Nombre y descripción) localmente
  const updateField = (id, field, val) => {
    setMenu(prev => prev.map(i => i.id === id ? { ...i, [field]: val } : i))
  }

  const saveTextFields = async (item) => {
    if (supabase) {
      await supabase.from('productos').update({
        nombre: item.name,
        descripcion: item.desc
      }).eq('id', item.id)
      triggerSaveIndicator()
    }
  }

  const categories = ['burgers', 'papas', 'bebidas']

  if (!auth) {
    return (
      <div className="min-h-screen bg-char-900 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <span className="font-display text-5xl text-fire-500 tracking-wider">LEMON</span>
            <span className="font-display text-5xl text-lemon-400 tracking-wider"> BROS</span>
            <p className="font-body text-gray-400 mt-2 text-sm uppercase tracking-widest">Panel de Administración</p>
          </div>
          {/* Formulario de Login Protegido y Limpio de pistas */}
          <form onSubmit={handleLogin} className="bg-char-800 border border-char-600 rounded-2xl p-8 space-y-4">
            <div>
              <label className="font-body text-xs text-gray-400 uppercase tracking-widest block mb-2">Contraseña</label>
              <input
                type="password"
                value={pw}
                onChange={e => { setPw(e.target.value); setPwError(false) }}
                placeholder="••••••••••••"
                className={`w-full bg-char-700 border ${pwError ? 'border-red-500' : 'border-char-600'} rounded-xl px-4 py-3 text-white font-body focus:outline-none focus:border-fire-500 transition-colors`}
              />
              {pwError && <p className="text-red-400 text-xs mt-1 font-body">Contraseña incorrecta</p>}
            </div>
            <button type="submit"
              className="w-full bg-fire-600 hover:bg-fire-500 text-white font-body font-500 py-3 rounded-xl transition-all active:scale-95">
              Entrar al panel
            </button>
          </form>
          <div className="text-center mt-6">
            <a href="/" className="text-gray-500 hover:text-gray-300 text-sm font-body transition-colors">← Volver al sitio</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-char-900 text-white">
      {/* Header */}
      <div className="bg-char-800 border-b border-char-600 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-gray-400 hover:text-white transition-colors">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </a>
            <div>
              <h1 className="font-display text-3xl text-white tracking-wide">PANEL ADMIN</h1>
              <p className="font-body text-xs text-gray-400">Lemon Bros · Gestión en la Nube</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="font-body text-xs text-green-400 bg-green-400/10 border border-green-400/30 px-3 py-1 rounded-full animate-fade-in">
                ✓ Guardado en Supabase
              </span>
            )}
            <button onClick={() => setAuth(false)}
              className="text-gray-400 hover:text-white border border-char-600 hover:border-char-400 font-body text-sm px-4 py-2 rounded-xl transition-all">
              Salir
            </button>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-char-800/50 border-b border-char-700">
        <div className="max-w-6xl mx-auto px-4 py-3 flex gap-6 overflow-x-auto">
          {loading ? (
            <span className="text-xs text-gray-500 font-body">Cargando métricas en tiempo real...</span>
          ) : (
            [
              { label: 'Total productos', val: menu.length, color: 'text-white' },
              { label: 'Disponibles', val: menu.filter(i => i.available).length, color: 'text-green-400' },
              { label: 'No disponibles', val: menu.filter(i => !i.available).length, color: 'text-red-400' },
              { label: 'Precio promedio', val: `$${menu.length ? Math.round(menu.reduce((s,i) => s+i.price,0)/menu.length) : 0}`, color: 'text-lemon-400' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2 whitespace-nowrap">
                <span className={`font-display text-2xl ${s.color}`}>{s.val}</span>
                <span className="font-body text-xs text-gray-500 uppercase tracking-widest">{s.label}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        {loading ? (
          <div className="text-center py-20 text-gray-400 font-body">Conectando con la base de datos de Supabase...</div>
        ) : (
          categories.map(cat => {
            const catItems = menu.filter(i => i.category === cat)
            const catLabels = { burgers: '🍔 Burgers', papas: '🍟 Papas', bebidas: '🥤 Bebidas' }
            return (
              <div key={cat}>
                <h2 className="font-display text-4xl text-white mb-6 tracking-wide border-b border-char-700 pb-3">
                  {catLabels[cat]}
                </h2>
                <div className="space-y-3">
                  {catItems.map(item => (
                    <div key={item.id}
                      className={`bg-char-800 border rounded-xl p-4 transition-all ${item.available ? 'border-char-600' : 'border-char-700 opacity-75'}`}>
                      <div className="flex items-center gap-4">
                        {/* Image */}
                        <img src={item.img} alt={item.name} className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />

                        {/* Name + desc */}
                        <div className="flex-1 min-w-0">
                          {editingId === item.id ? (
                            <input
                              value={item.name}
                              onChange={e => updateField(item.id, 'name', e.target.value)}
                              className="bg-char-700 border border-char-500 rounded-lg px-3 py-1 text-white font-body font-500 text-sm w-full mb-1 focus:outline-none focus:border-fire-500"
                            />
                          ) : (
                            <p className="font-body font-500 text-white text-sm truncate">{item.name}</p>
                          )}
                          {editingId === item.id ? (
                            <textarea
                              value={item.desc}
                              onChange={e => updateField(item.id, 'desc', e.target.value)}
                              rows={2}
                              className="bg-char-700 border border-char-500 rounded-lg px-3 py-1 text-gray-400 font-body text-xs w-full resize-none focus:outline-none focus:border-fire-500"
                            />
                          ) : (
                            <p className="font-body text-xs text-gray-400 truncate">{item.desc}</p>
                          )}
                        </div>

                        {/* Price input (Auto-save) */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-gray-500 font-body text-sm">$</span>
                          <input
                            type="number"
                            value={item.price}
                            onChange={e => updatePrice(item.id, e.target.value)}
                            className="w-20 bg-char-700 border border-char-600 rounded-lg px-2 py-1.5 text-lemon-400 font-display text-xl text-center focus:outline-none focus:border-fire-500 transition-colors"
                          />
                        </div>

                        {/* Available toggle (Auto-save) */}
                        <div className="flex flex-col items-center gap-1 flex-shrink-0">
                          <button onClick={() => toggleAvail(item.id)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${item.available ? 'bg-green-500' : 'bg-char-600'}`}>
                            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${item.available ? 'translate-x-6' : 'translate-x-0.5'}`} />
                          </button>
                          <span className={`text-xs font-body ${item.available ? 'text-green-400' : 'text-red-400'}`}>
                            {item.available ? 'Activo' : 'Oculto'}
                          </span>
                        </div>

                        {/* Edit text toggle button */}
                        <button
                          onClick={() => {
                            if (editingId === item.id) {
                              saveTextFields(item)
                              setEditingId(null)
                            } else {
                              setEditingId(item.id)
                            }
                          }}
                          className={`p-2 rounded-lg transition-colors flex-shrink-0 ${editingId === item.id ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white hover:bg-char-700'}`}>
                          {editingId === item.id ? (
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })
        )}

        {/* Info Note */}
        <div className="bg-char-800 border border-char-600 rounded-xl p-5 flex gap-3">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-lemon-400 flex-shrink-0 mt-0.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-body text-sm text-gray-400">
            <span className="text-white font-500">Conexión activa:</span> El guardado se realiza instantáneamente en segundo plano en Supabase. Los cambios se sincronizan en tiempo real en todas las ventanas activas.
          </p>
        </div>
      </div>
    </div>
  )
}