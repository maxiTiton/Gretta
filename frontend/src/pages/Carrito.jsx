import { useNavigate } from 'react-router-dom'
import { ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import CartItem from '@/components/carrito/CartItem'
import CartSummary from '@/components/carrito/CartSummary'
import Button from '@/components/ui/Button'
import { formatPrice } from '@/utils/formatters'

/**
 * Carrito Page
 * Página completa del carrito de compras con layout de 2 columnas
 */
export default function Carrito() {
  const navigate = useNavigate()
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getTotal,
  } = useCartStore()
  
  const total = getTotal()
  const hasItems = items.length > 0
  
  const handleClearCart = () => {
    if (window.confirm('¿Estás seguro de que querés vaciar el carrito?')) {
      clearCart()
    }
  }
  
  const handleCheckout = () => {
    navigate('/checkout')
  }
  
  const handleContinueShopping = () => {
    navigate('/productos')
  }
  
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-navy text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-300 mb-3">
            <a href="/" className="hover:text-white transition-colors">Inicio</a>
            <span className="mx-2">/</span>
            <span className="text-white">Carrito</span>
          </nav>
          
          {/* Title */}
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-8 h-8" />
            <h1 className="text-3xl font-serif font-bold">Carrito de Compras</h1>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!hasItems ? (
          // Empty state
          <div className="max-w-md mx-auto text-center py-16">
            <div className="w-32 h-32 mx-auto rounded-full bg-white flex items-center justify-center mb-6 shadow-soft">
              <ShoppingCart className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-navy mb-3">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-600 mb-8">
              ¡Descubrí nuestros productos y empezá a llenar tu carrito con cosas deliciosas!
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={handleContinueShopping}
              className="inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Ver productos
            </Button>
          </div>
        ) : (
          // Cart with items - 2 columns layout
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left column - Items list */}
            <div className="lg:col-span-8">
              {/* Items count header */}
              <div className="bg-white rounded-xl shadow-soft p-4 mb-4">
                <h2 className="text-lg font-semibold text-navy">
                  Productos en tu carrito ({items.length})
                </h2>
              </div>
              
              {/* Items list */}
              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartItem
                      key={item.producto.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </div>
                
                {/* Clear cart button */}
                <div className="pt-6 mt-6 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={handleClearCart}
                    className="text-red-500 border-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Vaciar carrito
                  </Button>
                </div>
              </div>
              
              {/* Continue shopping link */}
              <div className="mt-6">
                <button
                  onClick={handleContinueShopping}
                  className="inline-flex items-center gap-2 text-blue hover:text-navy transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="font-medium">Seguir comprando</span>
                </button>
              </div>
            </div>
            
            {/* Right column - Summary */}
            <div className="lg:col-span-4">
              <CartSummary
                items={items}
                subtotal={total}
                onCheckout={handleCheckout}
                sticky={true}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Trust badges / Additional info section */}
      {hasItems && (
        <div className="bg-white border-t border-gray-200 py-8 mt-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">🔒</div>
                <h3 className="font-semibold text-navy mb-1">Pago Seguro</h3>
                <p className="text-sm text-gray-600">
                  Tus datos están protegidos
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">🚚</div>
                <h3 className="font-semibold text-navy mb-1">Envío Rápido</h3>
                <p className="text-sm text-gray-600">
                  Recibí tu pedido en el día
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">❤️</div>
                <h3 className="font-semibold text-navy mb-1">Productos Artesanales</h3>
                <p className="text-sm text-gray-600">
                  Hechos con amor y dedicación
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
