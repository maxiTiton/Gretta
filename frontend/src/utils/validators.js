/**
 * Validators
 * Funciones de validación personalizadas
 */

/**
 * Validar email
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validar teléfono argentino
 * @param {string} phone
 * @returns {boolean}
 */
export function isValidPhone(phone) {
  // TODO: Validar formato de teléfono argentino
  const phoneRegex = /^(\+54)?[\s\-]?9?[\s\-]?(\d{2,4})[\s\-]?(\d{6,8})$/
  return phoneRegex.test(phone)
}

/**
 * Validar stock disponible
 * @param {number} quantity - Cantidad solicitada
 * @param {number} stock - Stock disponible
 * @returns {boolean}
 */
export function hasStock(quantity, stock) {
  return stock >= quantity && stock > 0
}

/**
 * Validar rango de precio
 * @param {number} price
 * @returns {boolean}
 */
export function isValidPrice(price) {
  return price > 0 && !isNaN(price)
}
