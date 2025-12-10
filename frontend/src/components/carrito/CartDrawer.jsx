import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, ShoppingBag, ShoppingCart, Truck } from 'lucide-react'
import { clsx } from 'clsx'
import { useCartStore } from '@/store/cartStore'
import CartItem from './CartItem'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { formatPrice } from '@/utils/formatters'

/**
 * CartDrawer Component
 * Drawer lateral del carrito con animación slide-in
 */
export default function CartDrawer() {
  const navigate = useNavigate()
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    getTotal,
    getItemCount,
  } = useCartStore()
  
  const total = getTotal()
  const itemCount = getItemCount()
  const hasItems = items.length > 0
  const freeShipping = total >= 5000
  
  // Cerrar con ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeCart])
  
  // Bloquear scroll del body cuando está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])
  
  const handleCheckout = () => {
    closeCart()
    navigate('/checkout')
  }
  
  const handleViewProducts = () => {
    closeCart()
    navigate('/productos')
  }
  
  const handleClearCart = () => {
    if (window.confirm('¿Estás seguro de vaciar el carrito?')) {
      clearCart()
    }
  }
  
  if (!isOpen) return null
  
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />
      
      {/* Drawer */}
      <div
        className={clsx(
          'fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50',
          'flex flex-col shadow-2xl',
          'transform transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-navy text-white">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6" />
            <h2 className="text-xl font-bold">Tu Carrito</h2>
            {itemCount > 0 && (
              <Badge variant="default" className="bg-pink">
                {itemCount}
              </Badge>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Cerrar carrito"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Body - Scrolleable */}
        <div className="flex-1 overflow-y-auto p-4">
          {!hasItems ? (
            // Empty state
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-navy mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-gray-600 mb-6">
                ¡Agregá productos y empezá a comprar!
              </p>
              <Button
                variant="primary"
                onClick={handleViewProducts}
              >
                Ver productos
              </Button>
            </div>
          ) : (
            // Items list
            <div className="space-y-2">
              {items.map((item) => (
                <CartItem
                  key={item.producto.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
              
              {/* Clear cart link */}
              <div className="pt-4 text-center">
                <button
                  onClick={handleClearCart}
                  className="text-sm text-red-500 hover:text-red-700 transition-colors"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer - Sticky */}
        {hasItems && (
          <div className="border-t border-gray-200 p-4 bg-cream">
            {/* Envío info */}
            <div className="flex items-center gap-2 mb-3 text-sm">
              <Truck className={clsx('w-5 h-5', freeShipping ? 'text-green-600' : 'text-gray-400')} />
              <span className={clsx('font-medium', freeShipping ? 'text-green-600' : 'text-gray-600')}>
                {freeShipping
                  ? '¡Envío gratis!'
                  : `Envío gratis en compras +${formatPrice(5000)}`
                }
              </span>
            </div>
            
            {/* Progress bar para envío gratis */}
            {!freeShipping && (
              <div className="mb-4">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue transition-all duration-300"
                    style={{ width: `${Math.min((total / 5000) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Te faltan {formatPrice(5000 - total)} para envío gratis
                </p>
              </div>
            )}
            
            {/* Total */}
            <div className="flex items-center justify-between mb-4 text-lg">
              <span className="font-semibold text-navy">Subtotal:</span>
              <span className="font-bold text-pink text-2xl">{formatPrice(total)}</span>
            </div>
            
            {/* Checkout button */}
            <Button
              variant="primary"
              size="lg"
              onClick={handleCheckout}
              className="w-full mb-2"
            >
              Ir al Checkout
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              Los impuestos y el envío se calculan en el checkout
            </p>
          </div>
        )}
      </div>
    </>
  )
}
