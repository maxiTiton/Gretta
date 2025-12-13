import { useEffect } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { Clock, AlertCircle, RefreshCw } from 'lucide-react'
import { recuperarPedidoPendiente, limpiarPedidoPendiente } from '@/services/mercadopago.service'
import Button from '@/components/ui/Button'

/**
 * CheckoutPending Page
 * Página de retorno cuando el pago con MercadoPago está pendiente
 * (ej: boleto, Rapipago, Pago Fácil, etc.)
 */
export default function CheckoutPending() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const paymentId = searchParams.get('payment_id')
  const externalReference = searchParams.get('external_reference')

  useEffect(() => {
    console.log('⏳ Pago pendiente:', { paymentId, externalReference })
    
    // Guardar pedido como pendiente
    // En producción, aquí podrías crear el pedido con estado "pendiente_pago"
    const pedidoData = recuperarPedidoPendiente()
    if (pedidoData) {
      console.log('💾 Pedido pendiente guardado para seguimiento')
    }
  }, [])

  const handleVolver = () => {
    limpiarPedidoPendiente()
    navigate('/productos')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream to-yellow-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        {/* Icono de pendiente */}
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Clock className="w-12 h-12 text-yellow-600" />
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-navy text-center mb-3">
          Pago Pendiente
        </h2>

        {/* Mensaje principal */}
        <p className="text-gray-600 text-center mb-6">
          Tu pago está siendo procesado
        </p>

        {/* Info del pago */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-800 mb-2">
                ¿Qué significa esto?
              </p>
              <p className="text-sm text-yellow-700 mb-3">
                El pago está pendiente de acreditación. Esto puede ocurrir cuando:
              </p>
              <ul className="space-y-1 text-sm text-yellow-700">
                <li>• Pagaste con efectivo (Rapipago, Pago Fácil, etc.)</li>
                <li>• El banco está procesando la transacción</li>
                <li>• Hay una demora en la verificación</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ID de referencia */}
        {externalReference && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Referencia del pedido</p>
            <p className="font-mono text-navy font-bold text-center text-lg">
              {externalReference}
            </p>
            <p className="text-xs text-gray-500 text-center mt-2">
              Guardá este número para hacer seguimiento
            </p>
          </div>
        )}

        {/* Próximos pasos */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <h3 className="font-bold text-navy mb-2 text-sm flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            ¿Qué sigue?
          </h3>
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue">1.</span>
              <span>Te enviaremos un email cuando se confirme el pago</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue">2.</span>
              <span>Podés verificar el estado en "Mis Pedidos"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue">3.</span>
              <span>Preparamos tu pedido una vez acreditado el pago</span>
            </li>
          </ol>
        </div>

        {/* Tiempo de acreditación */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 mb-6 text-center">
          <p className="text-sm text-gray-700 mb-1">
            <strong className="text-navy">Tiempo de acreditación:</strong>
          </p>
          <p className="text-xs text-gray-600">
            Efectivo: hasta 1 día hábil • Transferencia: instantáneo
          </p>
        </div>

        {/* Acciones */}
        <div className="space-y-3">
          <Link to="/mis-pedidos">
            <Button className="w-full">
              Ver Mis Pedidos
            </Button>
          </Link>

          <button
            onClick={handleVolver}
            className="w-full px-6 py-3 text-gray-600 hover:text-navy hover:bg-gray-50 rounded-lg transition-colors font-medium"
          >
            Volver a Productos
          </button>
        </div>

        {/* Contacto */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600 mb-2">
            ¿Tenés dudas sobre tu pago?
          </p>
          <Link 
            to="/info"
            className="text-blue hover:text-blue-700 font-medium text-sm transition-colors"
          >
            Contactanos →
          </Link>
        </div>

        {/* Nota sobre MercadoPago */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            💳 Pago procesado por MercadoPago
          </p>
        </div>
      </div>
    </div>
  )
}
