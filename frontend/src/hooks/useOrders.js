/**
 * useOrders Hook
 * Custom hook para gestión de pedidos
 * 
 * TODO: Implementar:
 * - Fetch de pedidos (admin)
 * - Filtros por estado
 * - Actualizar estado de pedido
 * - Real-time updates con Supabase subscriptions (opcional)
 */

import { useState, useEffect } from 'react'

export function useOrders() {
  // TODO: Implementar hook de pedidos
  return {
    orders: [],
    loading: false,
    error: null,
  }
}
