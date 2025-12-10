import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { clsx } from 'clsx'
import Sidebar from './Sidebar'
import CartButton from '@/components/carrito/CartButton'
import CartDrawer from '@/components/carrito/CartDrawer'

/**
 * Navbar Component
 * Barra de navegación principal con logo, menú y carrito
 * 
 * @example
 * <Navbar />
 */
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  
  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/productos', label: 'Productos' },
    { path: '/beneficios', label: 'Beneficios' },
    { path: '/info', label: 'Info' },
    { path: '/promos', label: 'Promos' },
    { path: '/cumpleanos', label: 'Tu Cumple' },
  ]
  
  const isActiveLink = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }
  
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-navy shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Brand */}
            <Link
              to="/"
              className="flex items-center gap-2 text-white hover:text-pink transition-colors"
            >
              <img
                src="/logo.png"
                alt="Gretta Logo"
                className="h-10 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
              <span className="text-2xl font-display font-bold">Gretta</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={clsx(
                    'relative py-2 text-sm font-medium transition-all duration-300',
                    'hover:text-pink',
                    isActiveLink(link.path)
                      ? 'text-pink'
                      : 'text-white'
                  )}
                >
                  {link.label}
                  {isActiveLink(link.path) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink rounded-full" />
                  )}
                </Link>
              ))}
            </div>
            
            {/* Cart & Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Cart Button */}
              <CartButton />
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 text-white hover:text-pink transition-colors"
                aria-label="Abrir menú"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Sidebar */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
      
      {/* Cart Drawer */}
      <CartDrawer />
    </>
  )
}
