/**
 * useAuth Hook
 * Custom hook para gestión de autenticación
 * 
 * TODO: Implementar:
 * - Usar authStore
 * - Verificar sesión al montar
 * - Funciones: login, logout
 * - Redirect si no está autenticado
 */

import { useEffect } from 'react'
import useAuthStore from '@/store/authStore'

export function useAuth() {
  // TODO: Implementar hook de autenticación
  return {
    user: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
  }
}
