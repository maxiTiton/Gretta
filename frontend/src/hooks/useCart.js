/**
 * useCart Hook
 * Custom hook para gestión del carrito
 * 
 * TODO: Implementar:
 * - Usar cartStore
 * - Funciones helper: addToCart, removeFromCart, updateQuantity
 * - Calcular totales
 * - Validaciones de stock
 */

import useCartStore from '@/store/cartStore'

export function useCart() {
  // TODO: Implementar hook del carrito
  return {
    items: [],
    itemCount: 0,
    total: 0,
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {},
    clearCart: () => {},
  }
}
