import { Store, Truck } from 'lucide-react'
import { clsx } from 'clsx'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { formatPrice } from '@/utils/formatters'

/**
 * DeliveryOptions Component
 * Opciones de entrega: Retiro en local o Delivery
 * 
 * @param {Object} props
 * @param {string} props.value - 'retiro' | 'delivery'
 * @param {Function} props.onChange - Función al seleccionar opción
 * @param {number} props.subtotal - Subtotal del carrito para calcular envío
 */
export default function DeliveryOptions({ value, onChange, subtotal }) {
  const FREE_SHIPPING_THRESHOLD = 5000
  const SHIPPING_COST = 500
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD
  
  const options = [
    {
      id: 'retiro',
      icon: Store,
      title: 'Retiro en Local',
      description: 'Gretta - Río Cuarto, Córdoba',
      detail: 'Lun a Sáb: 9:00 - 20:00',
      cost: 'Gratis',
      badgeVariant: 'success'
    },
    {
      id: 'delivery',
      icon: Truck,
      title: 'Delivery a Domicilio',
      description: 'Recibí tu pedido en el día',
      detail: 'Tiempo estimado: 30-60 min',
      cost: isFreeShipping ? 'Gratis' : formatPrice(SHIPPING_COST),
      badgeVariant: isFreeShipping ? 'success' : 'default'
    }
  ]
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-navy mb-3">
        Tipo de Entrega
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => {
          const Icon = option.icon
          const isSelected = value === option.id
          
          return (
            <Card
              key={option.id}
              padding="md"
              hover
              className={clsx(
                'cursor-pointer transition-all duration-200',
                'border-2',
                isSelected
                  ? 'border-blue bg-blue/5'
                  : 'border-gray-200 hover:border-gray-300'
              )}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onChange(option.id)
              }}
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className={clsx(
                  'w-16 h-16 rounded-full flex items-center justify-center mb-3',
                  isSelected ? 'bg-blue text-white' : 'bg-gray-100 text-gray-600'
                )}>
                  <Icon className="w-8 h-8" />
                </div>
                
                {/* Title */}
                <h4 className="font-bold text-navy mb-1">
                  {option.title}
                </h4>
                
                {/* Description */}
                <p className="text-sm text-gray-600 mb-2">
                  {option.description}
                </p>
                
                {/* Detail */}
                <p className="text-xs text-gray-500 mb-3">
                  {option.detail}
                </p>
                
                {/* Cost Badge */}
                <Badge
                  variant={option.badgeVariant}
                  size="md"
                >
                  {option.cost}
                </Badge>
              </div>
              
              {/* Radio indicator */}
              <div className="mt-4 flex justify-center">
                <div className={clsx(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                  isSelected ? 'border-blue' : 'border-gray-300'
                )}>
                  {isSelected && (
                    <div className="w-3 h-3 rounded-full bg-blue" />
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
      
      {/* Free shipping note */}
      {!isFreeShipping && (
        <p className="text-sm text-gray-600 text-center">
          ¡Agregá {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} más para envío gratis!
        </p>
      )}
    </div>
  )
}
