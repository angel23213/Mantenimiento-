// Datos del menú — pueden editarse desde /admin

export const initialMenu = [
  // === BURGERS ===
  {
    id: 'b1',
    category: 'burgers',
    name: 'Lemon Classic',
    desc: 'Carne 180g, queso americano, lechuga, tomate, cebolla, pepinillo y salsa especial lemon.',
    price: 115,
    available: true,
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
  },
  {
    id: 'b2',
    category: 'burgers',
    name: 'Fire Bros',
    desc: 'Doble carne, jalapeño tatemado, queso chihuahua fundido, bacon crujiente y mayo sriracha.',
    price: 155,
    available: true,
    img: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80',
  },
  {
    id: 'b3',
    category: 'burgers',
    name: 'Smash Hidalgo',
    desc: 'Dos smash patties, queso oaxaca derretido, cebolla caramelizada y chipotle ahumado.',
    price: 145,
    available: true,
    img: 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=600&q=80',
  },
  {
    id: 'b4',
    category: 'burgers',
    name: 'BBQ Zempoala',
    desc: 'Carne jugosa, salsa BBQ artesanal, aros de cebolla, queso cheddar y lechuga crujiente.',
    price: 135,
    available: true,
    img: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&q=80',
  },
  {
    id: 'b5',
    category: 'burgers',
    name: 'Lemon Gold',
    desc: 'Carne premium, trufa, queso brie, rúcula, mostaza Dijon y mermelada de chile de árbol.',
    price: 185,
    available: true,
    img: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600&q=80',
  },
  {
    id: 'b6',
    category: 'burgers',
    name: 'Veggie Bros',
    desc: 'Patty de frijol negro y betabel, queso manchego, aguacate, pico de gallo y sriracha verde.',
    price: 125,
    available: false,
    img: 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=600&q=80',
  },

  // === PAPAS ===
  {
    id: 'p1',
    category: 'papas',
    name: 'Papas Clásicas',
    desc: 'Bastones dorados con sal de mar y ketchup casero.',
    price: 55,
    available: true,
    img: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&q=80',
  },
  {
    id: 'p2',
    category: 'papas',
    name: 'Papas Fire',
    desc: 'Con polvo de chile, queso cotija, crema y salsa valentina. Nivel: 🔥🔥🔥',
    price: 75,
    available: true,
    img: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600&q=80',
  },
  {
    id: 'p3',
    category: 'papas',
    name: 'Papas Loaded',
    desc: 'Con cheddar fundido, bacon bits, cebollín y crema ácida. Las más pedidas.',
    price: 85,
    available: true,
    img: 'https://images.unsplash.com/photo-1630431341973-02e1b662ec35?w=600&q=80',
  },

  // === BEBIDAS ===
  {
    id: 'd1',
    category: 'bebidas',
    name: 'Limonada Bros',
    desc: 'Limonada con menta, hielo y toque de jengibre. La firma de la casa.',
    price: 45,
    available: true,
    img: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&q=80',
  },
  {
    id: 'd2',
    category: 'bebidas',
    name: 'Agua Fresca',
    desc: 'Jamaica, horchata o tamarindo. Pregunta la disponibilidad del día.',
    price: 35,
    available: true,
    img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
  },
  {
    id: 'd3',
    category: 'bebidas',
    name: 'Refresco',
    desc: 'Coca-Cola, Sprite, Manzanita Sol o agua mineral. 355ml.',
    price: 30,
    available: true,
    img: 'https://images.unsplash.com/photo-1624552184280-9e48e6a85d4a?w=600&q=80',
  },
]

export const CATEGORIES = [
  { id: 'all', label: 'Todo' },
  { id: 'burgers', label: '🍔 Burgers' },
  { id: 'papas', label: '🍟 Papas' },
  { id: 'bebidas', label: '🥤 Bebidas' },
]
