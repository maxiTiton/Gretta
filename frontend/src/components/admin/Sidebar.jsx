import { Link, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Tag, 
  Settings,
  Home,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

/**
 * Sidebar de Administración
 * Navegación lateral para el panel admin
 */

const navItems = [
  {
    path: '/admin',
    label: 'Dashboard',
    icon: LayoutDashboard,
    exact: true
  },
  {
    path: '/admin/pedidos',
    label: 'Pedidos',
    icon: ShoppingBag
  },
  {
    path: '/admin/productos',
    label: 'Productos',
    icon: Package
  },
  {
    path: '/admin/promociones',
    label: 'Promociones',
    icon: Tag
  },
  {
    path: '/admin/configuracion',
    label: 'Configuración',
    icon: Settings
  }
]

export default function Sidebar() {
  const location = useLocation()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { signOut, user } = useAuthStore()

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  // Actualizar variable CSS cuando cambie el estado
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sidebar-width',
      isCollapsed ? '80px' : '256px'
    )
  }, [isCollapsed])

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-navy text-white rounded-lg shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-navy text-white z-50
          flex flex-col shadow-2xl
          transition-all duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
        `}
        style={{ width: isMobileOpen ? '256px' : undefined }}
      >
        {/* Close button (mobile only) */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className={`p-6 border-b border-white/10 transition-all duration-300 ${isCollapsed ? 'lg:px-3' : ''}`}>
          <div className="flex items-center justify-between">
            {!isCollapsed ? (
              <div>
                <h1 className="text-2xl font-bold text-pink">Gretta</h1>
                <p className="text-sm text-gray-300 mt-1">Panel Admin</p>
              </div>
            ) : (
              <h1 className="hidden lg:block text-2xl font-bold text-pink text-center w-full">G</h1>
            )}
            
            {/* Desktop Toggle Button - Dentro de la sidebar */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex items-center justify-center w-8 h-8 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 overflow-y-auto">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path, item.exact)
              
              if (item.disabled) {
                return (
                  <li key={item.path}>
                    <div className={`
                      flex items-center gap-3 px-4 py-3 text-gray-500 cursor-not-allowed opacity-50
                      ${isCollapsed ? 'lg:justify-center' : ''}
                    `}>
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <>
                          <span className="font-medium">{item.label}</span>
                          <span className="ml-auto text-xs bg-gray-700 px-2 py-0.5 rounded whitespace-nowrap">
                            Próximamente
                          </span>
                        </>
                      )}
                    </div>
                  </li>
                )
              }

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg
                      transition-all duration-200 font-medium
                      ${isCollapsed ? 'lg:justify-center lg:px-2' : ''}
                      ${active 
                        ? 'bg-pink text-white shadow-lg' 
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }
                    `}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10">
          {/* User info */}
          <div className={`px-4 py-3 border-b border-white/10 ${isCollapsed ? 'lg:px-2' : ''}`}>
            {!isCollapsed ? (
              <>
                <div className="text-xs text-blue-200 mb-1">
                  Conectado como:
                </div>
                <div className="text-sm text-white font-medium truncate mb-3">
                  {user?.email || 'admin@gretta.com'}
                </div>
                
                <button
                  onClick={() => {
                    signOut()
                    setIsMobileOpen(false)
                  }}
                  className="flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors w-full px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  signOut()
                  setIsMobileOpen(false)
                }}
                className="hidden lg:flex items-center justify-center text-blue-200 hover:text-white transition-colors w-full py-2 rounded-lg hover:bg-white/10"
                title="Cerrar Sesión"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Volver al sitio */}
          <div className={`p-4 ${isCollapsed ? 'lg:px-2' : ''}`}>
            <Link
              to="/"
              onClick={() => setIsMobileOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all
                ${isCollapsed ? 'lg:justify-center lg:px-2' : ''}
              `}
              title={isCollapsed ? 'Volver al Sitio' : undefined}
            >
              <Home className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm">Volver al Sitio</span>}
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
