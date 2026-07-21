import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

const ADMIN_PASSWORD = "Aven270302";

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Estados para el nuevo producto (Create)
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    desc: "",
    price: "",
    category: "burgers",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
  });

  useEffect(() => {
    if (!supabase) {
      import("../menuData").then(({ initialMenu }) => {
        setMenu(JSON.parse(JSON.stringify(initialMenu)));
        setLoading(false);
      });
      return;
    }

    const initializeAuthAndData = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          setAuth(true);
        }
      } catch (err) {
        console.error("Error al verificar sesión:", err);
      } finally {
        await fetchProducts();
      }
    };

    initializeAuthAndData();

    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "productos" },
        () => {
          fetchProducts();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchProducts = async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .order("created_at", { ascending: true });

      if (!error && data) {
        const adaptedData = data.map((item) => ({
          id: item.id,
          name: item.nombre,
          desc: item.descripcion,
          price: item.precio,
          img: item.imagen,
          category: item.categoria,
          available: item.disponible,
        }));
        setMenu(adaptedData);
      }
    } catch (err) {
      console.error("Error al traer productos:", err);
    } finally {
      setLoading(false);
    }
  };

  const triggerSaveIndicator = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setPwError(false);

    if (!supabase) {
      if (email === "admin@lemonbros.com" && pw === ADMIN_PASSWORD) {
        setAuth(true);
      } else {
        setPwError(true);
      }
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: pw,
    });

    if (error) {
      setPwError(true);
    } else {
      setAuth(true);
    }
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setAuth(false);
  };

  // Crear Producto (CREATE)
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const priceNum = Number.parseInt(newProduct.price, 10);

    if (!newProduct.name || Number.isNaN(priceNum) || priceNum < 0) {
      alert("Por favor ingresa un nombre y un precio válido.");
      return;
    }

    if (supabase) {
      const { data, error } = await supabase
        .from("productos")
        .insert([
          {
            nombre: newProduct.name,
            descripcion: newProduct.desc,
            precio: priceNum,
            categoria: newProduct.category,
            imagen: newProduct.img,
            disponible: true,
          },
        ])
        .select();

      if (error) {
        console.error("Error al insertar producto:", error);
        alert("Error al guardar en Supabase");
        return;
      }

      if (data && data.length > 0) {
        triggerSaveIndicator();
      }
    } else {
      const newItem = {
        id: Date.now(),
        name: newProduct.name,
        desc: newProduct.desc,
        price: priceNum,
        category: newProduct.category,
        img: newProduct.img,
        available: true,
      };
      setMenu((prev) => [...prev, newItem]);
    }

    setNewProduct({
      name: "",
      desc: "",
      price: "",
      category: "burgers",
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
    });
    setShowAddModal(false);
  };

  // Eliminar Producto (DELETE)
  const handleDeleteProduct = async (id, name) => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de que deseas eliminar "${name}"?`,
    );
    if (!confirmDelete) return;

    if (supabase) {
      const { error } = await supabase.from("productos").delete().eq("id", id);

      if (error) {
        console.error("Error al eliminar producto:", error);
        alert("No se pudo eliminar el producto de Supabase.");
        return;
      }
      triggerSaveIndicator();
    }

    // Actualizar estado local inmediatamente
    setMenu((prev) => prev.filter((item) => item.id !== id));
  };

  // Actualizar Precio (REF-001)
  const updatePrice = async (id, val) => {
    const num = Number.parseInt(val, 10);
    if (Number.isNaN(num) || num < 0) return;

    setMenu((prev) =>
      prev.map((i) => (i.id === id ? { ...i, price: num } : i)),
    );

    if (supabase) {
      await supabase.from("productos").update({ precio: num }).eq("id", id);
      triggerSaveIndicator();
    }
  };

  const toggleAvail = async (id) => {
    const currentItem = menu.find((i) => i.id === id);
    if (!currentItem) return;
    const nextVal = !currentItem.available;

    setMenu((prev) =>
      prev.map((i) => (i.id === id ? { ...i, available: nextVal } : i)),
    );

    if (supabase) {
      await supabase
        .from("productos")
        .update({ disponible: nextVal })
        .eq("id", id);
      triggerSaveIndicator();
    }
  };

  const updateField = (id, field, val) => {
    setMenu((prev) =>
      prev.map((i) => (i.id === id ? { ...i, [field]: val } : i)),
    );
  };

  // Guardar Cambios de Texto + Imagen (UPDATE)
  const saveFields = async (item) => {
    if (supabase) {
      await supabase
        .from("productos")
        .update({
          nombre: item.name,
          descripcion: item.desc,
          imagen: item.img, // <-- Guarda la nueva URL de la imagen en Supabase
        })
        .eq("id", item.id);
      triggerSaveIndicator();
    }
  };

  const categories = ["burgers", "papas", "bebidas"];

  if (loading) {
    return (
      <div className="min-h-screen bg-char-900 flex items-center justify-center">
        <div className="text-center text-gray-400 font-body">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lemon-400 mx-auto mb-4"></div>
          Conectando con Lemon Bros Cloud...
        </div>
      </div>
    );
  }

  if (!auth) {
    return (
      <div className="min-h-screen bg-char-900 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <span className="font-display text-5xl text-fire-500 tracking-wider">
              LEMON
            </span>
            <span className="font-display text-5xl text-lemon-400 tracking-wider">
              {" "}
              BROS
            </span>
            <p className="font-body text-gray-400 mt-2 text-sm uppercase tracking-widest">
              Panel de Administración
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="bg-char-800 border border-char-600 rounded-2xl p-8 space-y-4"
          >
            <div>
              <label className="font-body text-xs text-gray-400 uppercase tracking-widest block mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setPwError(false);
                }}
                placeholder="admin@lemonbros.com"
                className={`w-full bg-char-700 border ${pwError ? "border-red-500" : "border-char-600"} rounded-xl px-4 py-3 text-white font-body focus:outline-none focus:border-fire-500 transition-colors`}
              />
            </div>

            <div>
              <label className="font-body text-xs text-gray-400 uppercase tracking-widest block mb-2">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={pw}
                onChange={(e) => {
                  setPw(e.target.value);
                  setPwError(false);
                }}
                placeholder="••••••••••••"
                className={`w-full bg-char-700 border ${pwError ? "border-red-500" : "border-char-600"} rounded-xl px-4 py-3 text-white font-body focus:outline-none focus:border-fire-500 transition-colors`}
              />
              {pwError && (
                <p className="text-red-400 text-xs mt-1 font-body">
                  Credenciales incorrectas. Intenta de nuevo.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-fire-600 hover:bg-fire-500 text-white font-body font-500 py-3 rounded-xl transition-all active:scale-95"
            >
              Entrar al panel
            </button>
          </form>

          <div className="text-center mt-6">
            <a
              href="/"
              className="text-gray-500 hover:text-gray-300 text-sm font-body transition-colors"
            >
              ← Volver al sitio
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-char-900 text-white">
      {/* Header */}
      <div className="bg-char-800 border-b border-char-600 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </a>
            <div>
              <h1 className="font-display text-3xl text-white tracking-wide">
                PANEL ADMIN
              </h1>
              <p className="font-body text-xs text-gray-400">
                Lemon Bros · Gestión en la Nube
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saved && (
              <span className="font-body text-xs text-green-400 bg-green-400/10 border border-green-400/30 px-3 py-1 rounded-full animate-fade-in">
                ✓ Guardado en Supabase
              </span>
            )}

            <button
              onClick={() => setShowAddModal(!showAddModal)}
              className="bg-fire-600 hover:bg-fire-500 text-white font-body text-sm font-500 px-4 py-2 rounded-xl transition-all flex items-center gap-2"
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              {showAddModal ? "Cancelar" : "Nuevo Producto"}
            </button>

            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-white border border-char-600 hover:border-char-400 font-body text-sm px-4 py-2 rounded-xl transition-all"
            >
              Salir
            </button>
          </div>
        </div>
      </div>

      {/* Modal Desplegable Nuevo Producto */}
      {showAddModal && (
        <div className="bg-char-800 border-b border-char-600 p-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-2xl text-lemon-400 mb-4">
              AGREGAR NUEVO PRODUCTO
            </h2>
            <form
              onSubmit={handleAddProduct}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <div>
                <label className="block font-body text-xs text-gray-400 uppercase mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  required
                  placeholder="ej. Doble Cheeseburger"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="w-full bg-char-700 border border-char-600 rounded-xl px-4 py-2 text-white font-body focus:outline-none focus:border-fire-500"
                />
              </div>

              <div>
                <label className="block font-body text-xs text-gray-400 uppercase mb-1">
                  Precio ($)
                </label>
                <input
                  type="number"
                  required
                  placeholder="ej. 150"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  className="w-full bg-char-700 border border-char-600 rounded-xl px-4 py-2 text-white font-body focus:outline-none focus:border-fire-500"
                />
              </div>

              <div>
                <label className="block font-body text-xs text-gray-400 uppercase mb-1">
                  Categoría
                </label>
                <select
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                  className="w-full bg-char-700 border border-char-600 rounded-xl px-4 py-2 text-white font-body focus:outline-none focus:border-fire-500"
                >
                  <option value="burgers">Burgers</option>
                  <option value="papas">Papas</option>
                  <option value="bebidas">Bebidas</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block font-body text-xs text-gray-400 uppercase mb-1">
                  Descripción
                </label>
                <input
                  type="text"
                  placeholder="Ingredientes o breve detalle del producto"
                  value={newProduct.desc}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, desc: e.target.value })
                  }
                  className="w-full bg-char-700 border border-char-600 rounded-xl px-4 py-2 text-white font-body focus:outline-none focus:border-fire-500"
                />
              </div>

              <div>
                <label className="block font-body text-xs text-gray-400 uppercase mb-1">
                  URL de la Imagen
                </label>
                <input
                  type="url"
                  value={newProduct.img}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, img: e.target.value })
                  }
                  className="w-full bg-char-700 border border-char-600 rounded-xl px-4 py-2 text-white font-body focus:outline-none focus:border-fire-500"
                />
              </div>

              <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-white px-4 py-2 font-body text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-lemon-400 hover:bg-lemon-500 text-char-900 font-body font-bold px-6 py-2 rounded-xl transition-all"
                >
                  Guardar Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats bar */}
      <div className="bg-char-800/50 border-b border-char-700">
        <div className="max-w-6xl mx-auto px-4 py-3 flex gap-6 overflow-x-auto">
          <div className="flex gap-6">
            {[
              {
                label: "Total productos",
                val: menu.length,
                color: "text-white",
              },
              {
                label: "Disponibles",
                val: menu.filter((i) => i.available).length,
                color: "text-green-400",
              },
              {
                label: "No disponibles",
                val: menu.filter((i) => !i.available).length,
                color: "text-red-400",
              },
              {
                label: "Precio promedio",
                val: `$${menu.length ? Math.round(menu.reduce((s, i) => s + i.price, 0) / menu.length) : 0}`,
                color: "text-lemon-400",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <span className={`font-display text-2xl ${s.color}`}>
                  {s.val}
                </span>
                <span className="font-body text-xs text-gray-500 uppercase tracking-widest">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        {categories.map((cat) => {
          const catItems = menu.filter((i) => i.category === cat);
          const catLabels = {
            burgers: "🍔 Burgers",
            papas: "🍟 Papas",
            bebidas: "🥤 Bebidas",
          };
          return (
            <div key={cat}>
              <h2 className="font-display text-4xl text-white mb-6 tracking-wide border-b border-char-700 pb-3">
                {catLabels[cat]}
              </h2>
              <div className="space-y-3">
                {catItems.length === 0 ? (
                  <p className="font-body text-sm text-gray-500 italic">
                    No hay productos registrados en esta categoría.
                  </p>
                ) : (
                  catItems.map((item) => (
                    <div
                      key={item.id}
                      className={`bg-char-800 border rounded-xl p-4 transition-all ${item.available ? "border-char-600" : "border-char-700 opacity-75"}`}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                        />

                        {/* Name + desc + URL de imagen cuando está en modo edición */}
                        <div className="flex-1 min-w-0 space-y-1">
                          {editingId === item.id ? (
                            <>
                              <input
                                value={item.name}
                                onChange={(e) =>
                                  updateField(item.id, "name", e.target.value)
                                }
                                placeholder="Nombre"
                                className="bg-char-700 border border-char-500 rounded-lg px-3 py-1 text-white font-body font-500 text-sm w-full focus:outline-none focus:border-fire-500"
                              />
                              <textarea
                                value={item.desc}
                                onChange={(e) =>
                                  updateField(item.id, "desc", e.target.value)
                                }
                                rows={2}
                                placeholder="Descripción"
                                className="bg-char-700 border border-char-500 rounded-lg px-3 py-1 text-gray-400 font-body text-xs w-full resize-none focus:outline-none focus:border-fire-500"
                              />
                              {/* CAMPO URL DE IMAGEN */}
                              <input
                                type="url"
                                value={item.img}
                                onChange={(e) =>
                                  updateField(item.id, "img", e.target.value)
                                }
                                placeholder="URL de la imagen (https://...)"
                                className="bg-char-700 border border-char-500 rounded-lg px-3 py-1 text-lemon-400 font-body text-xs w-full focus:outline-none focus:border-fire-500"
                              />
                            </>
                          ) : (
                            <>
                              <p className="font-body font-500 text-white text-sm truncate">
                                {item.name}
                              </p>
                              <p className="font-body text-xs text-gray-400 truncate">
                                {item.desc}
                              </p>
                            </>
                          )}
                        </div>

                        {/* Precio */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-gray-500 font-body text-sm">
                            $
                          </span>
                          <input
                            type="number"
                            value={item.price}
                            onChange={(e) =>
                              updatePrice(item.id, e.target.value)
                            }
                            className="w-20 bg-char-700 border border-char-600 rounded-lg px-2 py-1.5 text-lemon-400 font-display text-xl text-center focus:outline-none focus:border-fire-500 transition-colors"
                          />
                        </div>

                        {/* Botón Deslizable (Toggle) */}
                        <div className="flex flex-col items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => toggleAvail(item.id)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              item.available ? "bg-green-500" : "bg-char-600"
                            }`}
                          >
                            <span
                              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                                item.available
                                  ? "translate-x-6"
                                  : "translate-x-0"
                              }`}
                            />
                          </button>
                          <span
                            className={`text-xs font-body ${item.available ? "text-green-400" : "text-red-400"}`}
                          >
                            {item.available ? "Activo" : "Oculto"}
                          </span>
                        </div>

                        {/* Botón Guardar / Editar */}
                        <button
                          onClick={() => {
                            if (editingId === item.id) {
                              saveFields(item);
                              setEditingId(null);
                            } else {
                              setEditingId(item.id);
                            }
                          }}
                          className={`p-2 rounded-lg transition-colors flex-shrink-0 ${editingId === item.id ? "bg-green-600 text-white" : "text-gray-400 hover:text-white hover:bg-char-700"}`}
                          title={
                            editingId === item.id
                              ? "Guardar cambios"
                              : "Editar producto"
                          }
                        >
                          {editingId === item.id ? (
                            <svg
                              width="16"
                              height="16"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="16"
                              height="16"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          )}
                        </button>

                        {/* BOTÓN DE ELIMINAR PRODUCTO */}
                        <button
                          onClick={() =>
                            handleDeleteProduct(item.id, item.name)
                          }
                          className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors flex-shrink-0"
                          title="Eliminar producto"
                        >
                          <svg
                            width="16"
                            height="16"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
