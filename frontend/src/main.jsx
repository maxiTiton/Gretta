/**
 * Main Entry Point
 * Punto de entrada de la aplicación React
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'
import { validateEnv } from './config/env.js'

// Validar variables de entorno en desarrollo
if (import.meta.env.DEV) {
  try {
    validateEnv()
  } catch (error) {
    console.error('❌ Error de configuración:', error.message)
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
