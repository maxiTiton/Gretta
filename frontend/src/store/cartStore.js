/**
 * Cart Store (Zustand)
 * Estado global del carrito de compras con persistencia en localStorage
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      /**
       * Agregar producto al carrito (o incrementar cantidad si ya existe)
       * @param {Object} producto - Objeto producto con id, nombre, precio, imagen_url
       */
      addItem: (producto) => set((state) => {
        const existingItem = state.items.find(item => item.producto.id === producto.id)
        
        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.producto.id === producto.id
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
            )
          }
        }
        
        return { 
          items: [...state.items, { producto, cantidad: 1 }] 
        }
      }),
      
      /**
       * Eliminar producto del carrito completamente
       * @param {number} productoId - ID del producto a eliminar
       */
      removeItem: (productoId) => set((state) => ({
        items: state.items.filter(item => item.producto.id !== productoId)
      })),
      
      /**
       * Actualizar cantidad de un producto (mínimo 1)
       * @param {number} productoId - ID del producto
       * @param {number} cantidad - Nueva cantidad
       */
      updateQuantity: (productoId, cantidad) => set((state) => ({
        items: state.items.map(item =>
          item.producto.id === productoId
            ? { ...item, cantidad: Math.max(1, cantidad) }
            : item
        )
      })),
      
      /**
       * Vaciar carrito completamente
       */
      clearCart: () => set({ items: [] }),
      
      /**
       * Toggle drawer del carrito (abrir/cerrar)
       */
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      
      /**
       * Cerrar drawer del carrito
       */
      closeCart: () => set({ isOpen: false }),
      
      /**
       * Abrir drawer del carrito
       */
      openCart: () => set({ isOpen: true }),
      
      /**
       * Calcular total del carrito
       * @returns {number} Total en pesos
       */
      getTotal: () => {
        const { items } = get()
        return items.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0)
      },
      
      /**
       * Contar cantidad total de items (suma de cantidades)
       * @returns {number} Cantidad total de items
       */
      getItemCount: () => {
        const { items } = get()
        return items.reduce((count, item) => count + item.cantidad, 0)
      }
    }),
    {
      name: 'gretta-cart-storage', // Key para localStorage
      version: 1,
    }
  )
)
