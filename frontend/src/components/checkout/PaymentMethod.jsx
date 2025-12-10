import { Banknote, CreditCard, Wallet } from 'lucide-react'
import { clsx } from 'clsx'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

/**
 * PaymentMethod Component
 * Opciones de métodos de pago
 * 
 * @param {Object} props
 * @param {string} props.value - 'efectivo' | 'transferencia' | 'mercadopago'
 * @param {Function} props.onChange - Función al seleccionar opción
 */
export default function PaymentMethod({ value, onChange }) {
  const methods = [
    {
      id: 'efectivo',
      icon: Banknote,
      title: 'Efectivo',
      description: 'Pagá al recibir tu pedido',
      note: 'Indicá si necesitás cambio',
      disabled: false
    },
    {
      id: 'transferencia',
      icon: CreditCard,
      title: 'Transferencia Bancaria',
      description: 'Te enviamos los datos por WhatsApp',
      note: 'Alias: GRETTA.GO',
      disabled: false
    },
    {
      id: 'mercadopago',
      icon: Wallet,
      title: 'MercadoPago',
      description: 'Pagá con tarjeta de crédito/débito',
      note: 'Próximamente disponible',
      disabled: true,
      badge: 'Próximamente'
    }
  ]
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-navy mb-3">
        Método de Pago
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {methods.map((method) => {
          const Icon = method.icon
          const isSelected = value === method.id
          const isDisabled = method.disabled
          
          return (
            <Card
              key={method.id}
              padding="md"
              hover={!isDisabled}
              className={clsx(
                'transition-all duration-200',
                'border-2',
                isDisabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer',
                isSelected && !isDisabled
                  ? 'border-blue bg-blue/5'
                  : 'border-gray-200 hover:border-gray-300'
              )}
              onClick={(e) => {
                if (!isDisabled) {
                  e.preventDefault()
                  e.stopPropagation()
                  onChange(method.id)
                }
              }}
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className={clsx(
                  'w-14 h-14 rounded-full flex items-center justify-center mb-3',
                  isSelected && !isDisabled ? 'bg-blue text-white' : 'bg-gray-100 text-gray-600'
                )}>
                  <Icon className="w-7 h-7" />
                </div>
                
                {/* Title with badge */}
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-navy">
                    {method.title}
                  </h4>
                  {method.badge && (
                    <Badge variant="warning" size="sm">
                      {method.badge}
                    </Badge>
                  )}
                </div>
                
                {/* Description */}
                <p className="text-sm text-gray-600 mb-2">
                  {method.description}
                </p>
                
                {/* Note */}
                <p className="text-xs text-gray-500">
                  {method.note}
                </p>
              </div>
              
              {/* Radio indicator */}
              {!isDisabled && (
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
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
