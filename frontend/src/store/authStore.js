/**
 * Auth Store (Zustand)
 * Estado global de autenticación de administradores
 * 
 * TODO: Implementar las siguientes funcionalidades:
 * - user: usuario autenticado (null si no está logueado)
 * - isAuthenticated: boolean
 * - login(email, password): iniciar sesión
 * - logout(): cerrar sesión
 * - checkAuth(): verificar si hay sesión activa
 * - Integrar con Supabase Auth
 */

import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  // TODO: Implementar funciones de autenticación
}))

export default useAuthStore
