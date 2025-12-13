import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Tag, 
  Settings,
  Home,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'
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
    icon: Package,
    disabled: true
  },
  {
    path: '/admin/promociones',
    label: 'Promociones',
    icon: Tag,
    disabled: true
  },
  {
    path: '/admin/configuracion',
    label: 'Configuración',
    icon: Settings,
    disabled: true
  }
]

export default function Sidebar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const { signOut, user } = useAuthStore()

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-navy text-white rounded-lg shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-navy text-white z-50
          flex flex-col shadow-2xl
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Close button (mobile only) */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold text-pink">Gretta</h1>
          <p className="text-sm text-gray-300 mt-1">Panel Admin</p>
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
                    <div className="flex items-center gap-3 px-4 py-3 text-gray-500 cursor-not-allowed opacity-50">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                      <span className="ml-auto text-xs bg-gray-700 px-2 py-0.5 rounded">
                        Próximamente
                      </span>
                    </div>
                  </li>
                )
              }

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg
                      transition-all duration-200 font-medium
                      ${active 
                        ? 'bg-pink text-white shadow-lg' 
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10">
          {/* User info */}
          <div className="px-4 py-3 border-b border-white/10">
            <div className="text-xs text-blue-200 mb-1">
              Conectado como:
            </div>
            <div className="text-sm text-white font-medium truncate mb-3">
              {user?.email || 'admin@gretta.com'}
            </div>
            
            <button
              onClick={() => {
                signOut()
                setIsOpen(false)
              }}
              className="flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors w-full px-3 py-2 rounded-lg hover:bg-white/10"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </button>
          </div>

          {/* Volver al sitio */}
          <div className="p-4">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              <Home className="w-5 h-5" />
              <span className="text-sm">Volver al Sitio</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
