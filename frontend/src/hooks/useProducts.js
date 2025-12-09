/**
 * useProducts Hook
 * Custom hook para gestión de productos
 * 
 * TODO: Implementar:
 * - Usar react-query o estado local
 * - Funciones: fetchProducts, fetchProductById
 * - Manejo de loading, error, data
 * - Filters y búsqueda
 * - Cache de productos
 */

import { useState, useEffect } from 'react'

export function useProducts() {
  // TODO: Implementar hook de productos
  return {
    products: [],
    loading: false,
    error: null,
  }
}
