import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { X } from 'lucide-react'
import { clsx } from 'clsx'

/**
 * Sidebar Component
 * Menú lateral mobile con navegación y backdrop
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Controla si el sidebar está abierto
 * @param {Function} props.onClose - Función para cerrar el sidebar
 * @param {Array} props.navLinks - Array de objetos con path y label
 * 
 * @example
 * <Sidebar
 *   isOpen={isMobileMenuOpen}
 *   onClose={() => setIsMobileMenuOpen(false)}
 *   navLinks={[{ path: '/', label: 'Inicio' }]}
 * />
 */
export default function Sidebar({ isOpen, onClose, navLinks }) {
  const location = useLocation()
  
  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])
  
  // Prevenir scroll cuando está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  
  // Cerrar al navegar
  useEffect(() => {
    onClose()
  }, [location.pathname, onClose])
  
  if (!isOpen) return null
  
  const isActiveLink = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }
  
  return (
    <div
      className="fixed inset-0 z-50 md:hidden"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy/50 backdrop-blur-sm animate-fade-in" />
      
      {/* Sidebar */}
      <aside
        className={clsx(
          'absolute left-0 top-0 bottom-0 w-4/5 max-w-xs bg-white shadow-2xl',
          'transform transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={onClose}
          >
            <img
              src="/logo.png"
              alt="Gretta Logo"
              className="h-8 w-auto"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
            <span className="text-xl font-display font-bold text-navy">
              Gretta
            </span>
          </Link>
          
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-navy transition-colors rounded-lg hover:bg-gray-100"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Navigation Links */}
        <nav className="px-4 py-6">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={clsx(
                    'block px-4 py-3 rounded-lg font-medium transition-all duration-200',
                    isActiveLink(link.path)
                      ? 'bg-pink text-white'
                      : 'text-navy hover:bg-cream'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            Cafetería, heladería y<br />pastelería de autor
          </p>
        </div>
      </aside>
    </div>
  )
}
