/**
 * Formatters
 * Funciones para formatear datos
 */

import { format } from 'date-fns'
import { es } from 'date-fns/locale'

/**
 * Formatear precio en pesos argentinos
 * @param {number} price - Precio a formatear
 * @returns {string} Precio formateado (ej: "$1.234,56")
 */
export function formatPrice(price) {
  // TODO: Implementar formateo de precio con separadores de miles
  return `$${price}`
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
 * @returns {string} Teléfono formateado
 */
export function formatPhone(phone) {
  // TODO: Formatear teléfono (ej: +54 9 11 1234-5678)
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
