/**
 * Order Store (Zustand) - Opcional
 * Estado global de pedidos
 * 
 * TODO: Implementar si se requiere cache local de pedidos:
 * - orders: array de pedidos
 * - currentOrder: pedido en proceso
 * - fetchOrders(): obtener pedidos
 * - createOrder(orderData): crear nuevo pedido
 * - updateOrderStatus(orderId, status): actualizar estado
 */

import { create } from 'zustand'

const useOrderStore = create((set) => ({
  orders: [],
  currentOrder: null,
  // TODO: Implementar funciones de pedidos (opcional)
}))

export default useOrderStore
