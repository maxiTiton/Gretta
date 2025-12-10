/**
 * useCategories Hook
 * Custom hook para gestión de categorías
 * 
 * TODO: Implementar:
 * - Fetch de categorías
 * - Cache en memoria
 * - Loading y error states
 */

import { useState, useEffect } from 'react'

export function useCategories() {
  // TODO: Implementar hook de categorías
  return {
    categories: [],
    loading: false,
    error: null,
  }
}
