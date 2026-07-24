module.exports = {
  // 1. Entorno de pruebas simulando el navegador (¡Lo que faltaba!)
  testEnvironment: 'jsdom',
  
  // 2. Archivo de configuración inicial para Testing Library
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // (Si tenías reglas de transform para Babel, déjalas aquí)
  
  // 3. Reglas de cobertura que agregamos
  collectCoverage: true,
  collectCoverageFrom: [
    'src/CartContext.jsx',
    'src/components/CartDrawer.jsx',
    'src/components/Hero.jsx',
  ],
};