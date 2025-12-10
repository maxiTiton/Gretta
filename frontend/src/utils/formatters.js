/**
 * Formatters
 * Funciones para formatear datos
 */

import { format } from 'date-fns'
import { es } from 'date-fns/locale'

/**
 * Formatear precio en pesos argentinos
 * @param {number} price - Precio a formatear
 * @returns {string} Precio formateado (ej: "$1.234")
 */
export function formatPrice(price) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

/**
 * Formatear fecha
 * @param {Date|string} date - Fecha a formatear
 * @param {string} formatString - Formato deseado
 * @returns {string} Fecha formateada
 */
export function formatDate(date, formatString = 'dd/MM/yyyy') {
  // TODO: Usar date-fns para formatear
  return format(new Date(date), formatString, { locale: es })
}

/**
 * Formatear teléfono argentino
 * @param {string} phone - Teléfono a formatear
 * @returns {string} Teléfono formateado (ej: "(351) 123-4567")
 */
export function formatPhone(phone) {
  if (!phone) return ''
  
  // Limpiar el teléfono de caracteres no numéricos
  const cleaned = phone.replace(/\D/g, '')
  
  // Si empieza con 54, quitarlo (código de país)
  const withoutCountry = cleaned.startsWith('54') ? cleaned.slice(2) : cleaned
  
  // Formatear según longitud
  if (withoutCountry.length === 10) {
    // Formato: (351) 123-4567
    return `(${withoutCountry.slice(0, 3)}) ${withoutCountry.slice(3, 6)}-${withoutCountry.slice(6)}`
  }
  
  // Si no tiene el formato esperado, devolver tal cual
  return phone
}

/**
 * Formatear número de pedido
 * @param {number} orderNumber - Número de pedido
 * @returns {string} Número formateado (ej: "#00123")
 */
export function formatOrderNumber(orderNumber) {
  return `#${String(orderNumber).padStart(5, '0')}`
}
