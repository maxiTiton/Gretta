import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '@/services/supabase'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      session: null,
      loading: true,

      setAuth: (user, session) => set({ user, session, loading: false }),

      clearAuth: () => set({ user: null, session: null, loading: false }),

      // Inicializar sesión al cargar la app
      initialize: async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession()
          
          if (session) {
            set({ 
              user: session.user, 
              session, 
              loading: false 
            })
          } else {
            set({ loading: false })
          }

          // Listener para cambios en auth
          supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
              set({ 
                user: session.user, 
                session, 
                loading: false 
              })
            } else {
              set({ 
                user: null, 
                session: null, 
                loading: false 
              })
            }
          })
        } catch (error) {
          console.error('Error initializing auth:', error)
          set({ loading: false })
        }
      },

      // Login
      signIn: async (email, password) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          })

          if (error) throw error

          set({ 
            user: data.user, 
            session: data.session 
          })

          return { data, error: null }
        } catch (error) {
          console.error('Login error:', error)
          return { data: null, error }
        }
      },

      // Logout
      signOut: async () => {
        try {
          await supabase.auth.signOut()
          set({ user: null, session: null })
        } catch (error) {
          console.error('Logout error:', error)
        }
      }
    }),
    {
      name: 'gretta-auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        session: state.session 
      })
    }
  )
)
