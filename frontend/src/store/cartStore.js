/**
 * Cart Store (Zustand)
 * Estado global del carrito de compras
 * 
 * TODO: Implementar las siguientes funcionalidades:
 * - items: array de productos en el carrito
 * - addItem(producto, cantidad): agregar producto al carrito
 * - removeItem(productoId): eliminar producto
 * - updateQuantity(productoId, cantidad): actualizar cantidad
 * - clearCart(): vaciar carrito
 * - getTotal(): calcular total del carrito
 * - getItemCount(): contar items totales
 * - Persistir en localStorage
 */

import { create } from 'zustand'

const useCartStore = create((set) => ({
  items: [],
  // TODO: Implementar funciones del carrito
}))

export default useCartStore
