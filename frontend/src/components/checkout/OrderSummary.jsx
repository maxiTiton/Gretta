import { ShoppingBag, Truck } from 'lucide-react'
import { clsx } from 'clsx'
import Card from '@/components/ui/Card'
import { formatPrice } from '@/utils/formatters'

/**
 * OrderSummary Component
 * Resumen del pedido para checkout
 * 
 * @param {Object} props
 * @param {Array} props.items - Items del carrito
 * @param {string} props.tipoEntrega - 'retiro' | 'delivery'
 * @param {string} props.metodoPago - 'efectivo' | 'transferencia' | 'mercadopago'
 * @param {boolean} [props.sticky] - Si debe ser sticky en desktop
 */
export default function OrderSummary({ items, tipoEntrega, metodoPago, sticky = true }) {
  const FREE_SHIPPING_THRESHOLD = 5000
  const SHIPPING_COST = 500
  
  // Calcular subtotal
  const subtotal = items.reduce((sum, item) => sum + (item.producto.precio * item.cantidad), 0)
  
  // Calcular envío
  const shipping = tipoEntrega === 'delivery' && subtotal < FREE_SHIPPING_THRESHOLD
    ? SHIPPING_COST
    : 0
  
  // Total
  const total = subtotal + shipping
  
  // Mapear nombres
  const deliveryNames = {
    retiro: 'Retiro en local',
    delivery: 'Delivery a domicilio'
  }
  
  const paymentNames = {
    efectivo: 'Efectivo',
    transferencia: 'Transferencia',
    mercadopago: 'MercadoPago'
  }
  
  return (
    <Card
      padding="md"
      className={clsx(
        'bg-white',
        sticky && 'lg:sticky lg:top-24'
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-3 mb-4">
        <ShoppingBag className="w-5 h-5 text-blue" />
        <h2 className="text-xl font-bold text-navy">Resumen del Pedido</h2>
      </div>
      
      {/* Items list */}
      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={item.producto.id} className="flex gap-3">
            {/* Miniatura */}
            <img
              src={item.producto.imagen_url}
              alt={item.producto.nombre}
              className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
            />
            
            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-navy line-clamp-1">
                {item.producto.nombre}
              </h4>
              <p className="text-xs text-gray-600">
                {item.cantidad} × {formatPrice(item.producto.precio)}
              </p>
            </div>
            
            {/* Subtotal */}
            <span className="text-sm font-semibold text-navy flex-shrink-0">
              {formatPrice(item.producto.precio * item.cantidad)}
            </span>
          </div>
        ))}
      </div>
      
      {/* Delivery & Payment info */}
      <div className="bg-cream rounded-lg p-3 mb-4 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Truck className="w-4 h-4 text-gray-600" />
          <span className="text-gray-600">Entrega:</span>
          <span className="font-medium text-navy ml-auto">
            {deliveryNames[tipoEntrega]}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Pago:</span>
          <span className="font-medium text-navy ml-auto">
            {paymentNames[metodoPago]}
          </span>
        </div>
      </div>
      
      {/* Calculations */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({items.length} items)</span>
          <span className="font-medium text-navy">{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Envío</span>
          <span className={clsx(
            'font-medium',
            shipping === 0 ? 'text-green-600' : 'text-navy'
          )}>
            {shipping === 0 ? '¡Gratis!' : formatPrice(shipping)}
          </span>
        </div>
      </div>
      
      {/* Total */}
      <div className="border-t border-gray-200 pt-4 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-navy">Total</span>
          <span className="text-2xl font-bold text-pink">{formatPrice(total)}</span>
        </div>
      </div>
      
      {/* Footer note */}
      <div className="text-xs text-gray-500 text-center">
        <p className="mb-1">Al confirmar aceptás nuestros</p>
        <a href="/terminos" className="text-blue hover:underline">
          Términos y condiciones
        </a>
      </div>
    </Card>
  )
}
