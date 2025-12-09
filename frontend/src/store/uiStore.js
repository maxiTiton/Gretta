/**
 * UI Store (Zustand)
 * Estado global de la interfaz (modales, loading, toasts)
 * 
 * TODO: Implementar las siguientes funcionalidades:
 * - isCartOpen: boolean para CartDrawer
 * - isLoading: boolean para loading global
 * - modal: { isOpen, content, title } para modales genéricos
 * - toggleCart(): abrir/cerrar carrito
 * - showModal(content, title): mostrar modal
 * - hideModal(): cerrar modal
 * - setLoading(boolean): activar/desactivar loading
 */

import { create } from 'zustand'

const useUIStore = create((set) => ({
  isCartOpen: false,
  isLoading: false,
  modal: { isOpen: false, content: null, title: '' },
  // TODO: Implementar funciones de UI
}))

export default useUIStore
