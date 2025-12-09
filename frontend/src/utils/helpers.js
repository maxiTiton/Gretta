/**
 * Helpers
 * Funciones auxiliares generales
 */

import clsx from 'clsx'

/**
 * Combinar clases CSS de forma condicional
 * Re-exportar clsx para uso consistente
 */
export { clsx }

/**
 * Generar slug desde texto
 * @param {string} text
 * @returns {string} slug
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Calcular subtotal de item
 * @param {number} price - Precio unitario
 * @param {number} quantity - Cantidad
 * @returns {number}
 */
export function calculateSubtotal(price, quantity) {
  return price * quantity
}

/**
 * Calcular total del carrito
 * @param {Array} items - Items del carrito
 * @returns {number}
 */
export function calculateCartTotal(items) {
  return items.reduce((total, item) => {
    return total + calculateSubtotal(item.price, item.quantity)
  }, 0)
}

/**
 * Truncar texto
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export function truncate(text, maxLength = 100) {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

/**
 * Sleep/delay para testing
 * @param {number} ms - Milisegundos
 * @returns {Promise}
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
