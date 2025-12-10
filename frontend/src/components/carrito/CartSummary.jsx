import { Truck, Tag } from 'lucide-react'
import { clsx } from 'clsx'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { formatPrice } from '@/utils/formatters'

/**
 * CartSummary Component
 * Resumen del pedido con totales y envío
 * 
 * @param {Object} props
 * @param {Array} props.items - Items del carrito
 * @param {number} props.subtotal - Subtotal del carrito
 * @param {Function} [props.onCheckout] - Función al hacer checkout
 * @param {boolean} [props.sticky] - Si debe ser sticky en desktop
 */
export default function CartSummary({ items, subtotal, onCheckout, sticky = true }) {
  const itemCount = items.reduce((count, item) => count + item.cantidad, 0)
  const freeShippingThreshold = 5000
  const shippingCost = subtotal >= freeShippingThreshold ? 0 : 1000
  const total = subtotal + shippingCost
  
  return (
    <Card
      padding="md"
      className={clsx(
        'bg-white',
        sticky && 'lg:sticky lg:top-24'
      )}
    >
      {/* Header */}
      <div className="border-b border-gray-200 pb-3 mb-4">
        <h2 className="text-xl font-bold text-navy">Resumen del pedido</h2>
      </div>
      
      {/* Items count */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Productos ({itemCount})</span>
          <span className="font-medium text-navy">{formatPrice(subtotal)}</span>
        </div>
        
        {/* Shipping */}
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <Truck className="w-4 h-4" />
            <span>Envío</span>
          </div>
          <span className={clsx(
            'font-medium',
            shippingCost === 0 ? 'text-green-600' : 'text-navy'
          )}>
            {shippingCost === 0 ? '¡Gratis!' : formatPrice(shippingCost)}
          </span>
        </div>
        
        {/* Progress to free shipping */}
        {subtotal < freeShippingThreshold && (
          <div className="bg-blue/10 rounded-lg p-3">
            <p className="text-xs text-blue font-medium mb-2">
              ¡Estás cerca del envío gratis!
            </p>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
              <div
                className="h-full bg-blue transition-all duration-300"
                style={{ width: `${(subtotal / freeShippingThreshold) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-600">
              Te faltan {formatPrice(freeShippingThreshold - subtotal)} para envío gratis
            </p>
          </div>
        )}
      </div>
      
      {/* Total */}
      <div className="border-t border-gray-200 pt-4 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-navy">Total</span>
          <span className="text-2xl font-bold text-pink">{formatPrice(total)}</span>
        </div>
      </div>
      
      {/* Checkout button */}
      {onCheckout && (
        <Button
          variant="primary"
          size="lg"
          onClick={onCheckout}
          className="w-full mb-3"
        >
          Continuar con el pedido
        </Button>
      )}
      
      {/* Info notes */}
      <div className="space-y-2">
        <div className="flex items-start gap-2 text-xs text-gray-600">
          <Tag className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>Los impuestos se calcularán en el checkout según tu ubicación</p>
        </div>
        <div className="flex items-start gap-2 text-xs text-gray-600">
          <Truck className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>Envío gratis en compras superiores a {formatPrice(freeShippingThreshold)}</p>
        </div>
      </div>
    </Card>
  )
}
