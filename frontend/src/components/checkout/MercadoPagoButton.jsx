import { useState, useEffect } from 'react'
import { Wallet } from '@mercadopago/sdk-react'
import { Loader2, CreditCard } from 'lucide-react'

/**
 * MercadoPagoButton Component
 * Botón para iniciar el flujo de pago con MercadoPago
 * Usa el componente Wallet oficial del SDK de MP
 * 
 * @param {Object} props
 * @param {string} props.preferenceId - ID de preferencia de MercadoPago
 * @param {boolean} props.disabled - Deshabilitar botón
 * @param {Function} props.onReady - Callback cuando el botón está listo
 * @param {Function} props.onError - Callback cuando hay error
 */
export default function MercadoPagoButton({ 
  preferenceId, 
  disabled = false,
  onReady,
  onError 
}) {
  const [loading, setLoading] = useState(true)

  if (!preferenceId) {
    return (
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
        <Loader2 className="w-8 h-8 text-blue animate-spin mx-auto mb-3" />
        <p className="text-blue font-medium">Preparando checkout de MercadoPago...</p>
        <p className="text-sm text-gray-600 mt-1">Por favor esperá un momento</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Información */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue rounded-lg flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-navy mb-1">Pago Seguro con MercadoPago</h3>
            <p className="text-sm text-gray-700">
              Pagá con tarjeta de crédito, débito o dinero en cuenta de MercadoPago
            </p>
            <ul className="mt-2 space-y-1 text-xs text-gray-600">
              <li>✓ Pago 100% seguro y encriptado</li>
              <li>✓ Hasta 12 cuotas sin interés</li>
              <li>✓ Comprobante instantáneo</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Botón de MercadoPago */}
      <div className={`relative ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
        <Wallet
          initialization={{ 
            preferenceId,
            redirectMode: 'self' // Usar 'self' para redirect completo (no modal)
          }}
          customization={{
            texts: {
              action: 'pay',
              valueProp: 'security_safety'
            },
            visual: {
              buttonBackground: 'blue',
              borderRadius: '8px',
              valuePropColor: 'grey'
            }
          }}
          onReady={() => {
            setLoading(false)
            onReady?.()
            console.log('✅ MercadoPago Wallet listo')
          }}
          onError={(error) => {
            console.error('❌ Error en MercadoPago Wallet:', error)
            setLoading(false)
            onError?.(error)
          }}
          onSubmit={() => {
            console.log('📤 Iniciando pago con MercadoPago')
          }}
        />
        
        {loading && (
          <div className="absolute inset-0 bg-white/80 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-6 h-6 animate-spin text-blue mx-auto mb-2" />
              <span className="text-sm text-gray-600">Cargando MercadoPago...</span>
            </div>
          </div>
        )}
      </div>

      {/* Nota de seguridad */}
      <p className="text-xs text-center text-gray-500">
        🔒 Tu información está protegida por MercadoPago
      </p>
    </div>
  )
}
