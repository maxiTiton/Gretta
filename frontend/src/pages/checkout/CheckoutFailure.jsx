import { useEffect } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { XCircle, AlertCircle, ArrowLeft } from 'lucide-react'
import { limpiarPedidoPendiente } from '@/services/mercadopago.service'
import Button from '@/components/ui/Button'

/**
 * CheckoutFailure Page
 * Página de retorno cuando el pago con MercadoPago fue rechazado
 */
export default function CheckoutFailure() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const status = searchParams.get('status')
  const statusDetail = searchParams.get('status_detail')

  useEffect(() => {
    console.log('❌ Pago rechazado:', { status, statusDetail })
    // No limpiamos el pedido pendiente aquí por si quieren reintentar
  }, [])

  const getMensajeError = () => {
    switch (statusDetail) {
      case 'cc_rejected_insufficient_amount':
        return 'Fondos insuficientes en la tarjeta'
      case 'cc_rejected_bad_filled_security_code':
        return 'Código de seguridad incorrecto'
      case 'cc_rejected_bad_filled_date':
        return 'Fecha de vencimiento incorrecta'
      case 'cc_rejected_bad_filled_other':
        return 'Error en los datos de la tarjeta'
      case 'cc_rejected_blacklist':
        return 'Tarjeta rechazada por seguridad'
      case 'cc_rejected_call_for_authorize':
        return 'Debes autorizar el pago con tu banco'
      case 'cc_rejected_card_disabled':
        return 'Tarjeta deshabilitada'
      case 'cc_rejected_duplicated_payment':
        return 'Pago duplicado detectado'
      case 'cc_rejected_high_risk':
        return 'Pago rechazado por riesgo'
      case 'cc_rejected_max_attempts':
        return 'Superaste el máximo de intentos'
      default:
        return 'El pago fue rechazado'
    }
  }

  const handleReintentar = () => {
    // Mantener el pedido pendiente para que puedan reintentar
    navigate('/checkout')
  }

  const handleCancelar = () => {
    // Limpiar pedido pendiente y volver a productos
    limpiarPedidoPendiente()
    navigate('/productos')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream to-red-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        {/* Icono de error */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-12 h-12 text-red-600" />
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-navy text-center mb-3">
          Pago Rechazado
        </h2>

        {/* Mensaje de error */}
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-800 mb-1">
                {getMensajeError()}
              </p>
              <p className="text-sm text-red-700">
                Por favor verificá los datos de tu tarjeta e intentá nuevamente
              </p>
            </div>
          </div>
        </div>

        {/* Sugerencias */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <h3 className="font-bold text-navy mb-2 text-sm">
            ¿Qué puedo hacer?
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue">•</span>
              <span>Verificá que los datos de tu tarjeta sean correctos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue">•</span>
              <span>Asegurate de tener fondos suficientes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue">•</span>
              <span>Intentá con otra tarjeta o método de pago</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue">•</span>
              <span>Contactá a tu banco si el problema persiste</span>
            </li>
          </ul>
        </div>

        {/* Acciones */}
        <div className="space-y-3">
          <Button 
            onClick={handleReintentar}
            className="w-full"
          >
            <ArrowLeft className="w-5 h-5" />
            Reintentar Pago
          </Button>

          <button
            onClick={handleCancelar}
            className="w-full px-6 py-3 text-gray-600 hover:text-navy hover:bg-gray-50 rounded-lg transition-colors font-medium"
          >
            Cancelar y volver
          </button>
        </div>

        {/* Métodos alternativos */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600 mb-3">
            También podés pagar con:
          </p>
          <div className="flex items-center justify-center gap-4 text-xs">
            <span className="px-3 py-1 bg-blue-50 text-blue rounded-full">
              💵 Efectivo
            </span>
            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full">
              🏦 Transferencia
            </span>
          </div>
        </div>

        {/* Link a ayuda */}
        <div className="mt-6 text-center">
          <Link 
            to="/info"
            className="text-sm text-gray-500 hover:text-navy transition-colors"
          >
            ¿Necesitás ayuda? Contactanos
          </Link>
        </div>
      </div>
    </div>
  )
}
