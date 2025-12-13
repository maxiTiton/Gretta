import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react'
import { crearPedido } from '@/services/pedidos.service'
import { recuperarPedidoPendiente, limpiarPedidoPendiente } from '@/services/mercadopago.service'
import { useCartStore } from '@/store/cartStore'
import Button from '@/components/ui/Button'

/**
 * CheckoutSuccess Page
 * Página de retorno cuando el pago con MercadoPago fue exitoso
 */
export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const clearCart = useCartStore(state => state.clearCart)
  
  const [procesando, setProcesando] = useState(true)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [numeroPedido, setNumeroPedido] = useState(null)

  useEffect(() => {
    procesarPago()
  }, [])

  const procesarPago = async () => {
    try {
      // Obtener parámetros de retorno de MercadoPago
      const paymentId = searchParams.get('payment_id')
      const status = searchParams.get('status')
      const externalReference = searchParams.get('external_reference')
      const merchantOrderId = searchParams.get('merchant_order_id')
      
      // También buscar parámetros alternativos que MP puede enviar
      const collectionId = searchParams.get('collection_id')
      const collectionStatus = searchParams.get('collection_status')
      const preferenceId = searchParams.get('preference_id')

      console.log('📥 Datos de retorno MP:', { 
        paymentId, 
        status, 
        externalReference,
        merchantOrderId,
        collectionId,
        collectionStatus,
        preferenceId,
        allParams: Object.fromEntries(searchParams.entries())
      })

      // Verificar que el pago fue aprobado
      const pagoAprobado = status === 'approved' || collectionStatus === 'approved'
      
      if (!pagoAprobado) {
        console.warn('⚠️ Pago no aprobado:', status || collectionStatus)
        setError(true)
        setErrorMsg('El pago no fue aprobado')
        setProcesando(false)
        return
      }

      // Recuperar datos del pedido del localStorage
      const pedidoData = recuperarPedidoPendiente()
      
      if (!pedidoData) {
        console.error('❌ No se encontraron datos del pedido pendiente')
        console.log('📦 Verificando localStorage...')
        console.log('Keys en localStorage:', Object.keys(localStorage))
        setError(true)
        setErrorMsg('No se encontraron los datos del pedido')
        setProcesando(false)
        return
      }

      console.log('📦 Datos del pedido recuperados:', pedidoData)

      // Actualizar datos del pedido con información de MercadoPago
      const finalPaymentId = paymentId || collectionId
      pedidoData.metodoPago = 'mercadopago'
      pedidoData.pagado = true
      pedidoData.mp_payment_id = finalPaymentId
      pedidoData.mp_merchant_order_id = merchantOrderId
      pedidoData.notas = pedidoData.notas 
        ? `${pedidoData.notas}\n[Pago MP: ${finalPaymentId}]` 
        : `Pago con MercadoPago - ID: ${finalPaymentId}`

      // Crear pedido en Supabase
      console.log('💾 Creando pedido en Supabase...')
      const { data: pedido, error: pedidoError } = await crearPedido(pedidoData)

      if (pedidoError) {
        console.error('❌ Error al crear pedido:', pedidoError)
        setError(true)
        setErrorMsg('Error al guardar el pedido')
        setProcesando(false)
        return
      }

      console.log('✅ Pedido creado exitosamente:', pedido)

      // Limpiar localStorage
      limpiarPedidoPendiente()
      
      // Limpiar carrito
      clearCart()

      setNumeroPedido(pedido.numero_pedido)

      // Redirigir a confirmación después de 2 segundos
      setTimeout(() => {
        navigate(`/confirmacion?numero=${pedido.numero_pedido}&pagado=true`)
      }, 2000)

    } catch (err) {
      console.error('❌ Error procesando pago:', err)
      setError(true)
      setErrorMsg(err.message || 'Error desconocido')
      setProcesando(false)
    }
  }

  if (procesando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream to-green-pastel-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Loader2 className="w-10 h-10 text-blue animate-spin" />
          </div>
          
          <h2 className="text-2xl font-bold text-navy mb-3">
            Procesando tu pago
          </h2>
          <p className="text-gray-600 mb-4">
            Estamos confirmando tu pago con MercadoPago
          </p>
          <p className="text-sm text-gray-500">
            Por favor no cierres esta ventana
          </p>

          <div className="mt-6 space-y-2 text-sm text-left text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Verificando pago...</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full" />
              <span>Guardando pedido...</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full" />
              <span>Enviando confirmación...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream to-red-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">❌</span>
          </div>
          
          <h2 className="text-2xl font-bold text-navy mb-3">
            Error al procesar el pago
          </h2>
          <p className="text-gray-600 mb-2">
            Hubo un problema al procesar tu pago
          </p>
          <p className="text-sm text-red-600 mb-6">
            {errorMsg}
          </p>
          
          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/checkout')}
              className="w-full"
            >
              Volver al Checkout
            </Button>
            <Link 
              to="/productos"
              className="block text-sm text-gray-600 hover:text-navy transition-colors"
            >
              Ir a Productos
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream to-green-pastel-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-navy mb-3">
          ¡Pago exitoso!
        </h2>
        <p className="text-gray-600 mb-6">
          Tu pago fue procesado correctamente
        </p>

        {numeroPedido && (
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Número de pedido</p>
            <p className="text-xl font-bold text-navy">{numeroPedido}</p>
          </div>
        )}

        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Redirigiendo a confirmación...</span>
        </div>
      </div>
    </div>
  )
}
