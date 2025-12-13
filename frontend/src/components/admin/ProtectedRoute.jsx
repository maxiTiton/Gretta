import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import Loading from '@/components/ui/Loading'

/**
 * ProtectedRoute
 * Protege rutas que requieren autenticación
 * Si no está autenticado, redirige a login
 */
export default function ProtectedRoute({ children }) {
  const { user, loading, initialize } = useAuthStore()
  const location = useLocation()

  // Inicializar auth al montar
  useEffect(() => {
    initialize()
  }, [initialize])

  // Mientras carga, mostrar loading
  if (loading) {
    return <Loading fullScreen text="Verificando sesión..." />
  }

  // Si no está autenticado, redirigir a login
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  // Si está autenticado, mostrar el contenido
  return children
}
