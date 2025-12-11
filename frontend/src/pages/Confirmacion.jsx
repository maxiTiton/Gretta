import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { getPedidoByNumero } from '@/services/pedidos.service'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { 
  CheckCircle2, 
  Package, 
  MapPin, 
  CreditCard, 
  Phone, 
  Home,
  ShoppingBag,
  Loader2
} from 'lucide-react'
import { formatPrice, formatOrderNumber, formatPhone } from '@/utils/formatters'
import { clsx } from 'clsx'

/**
 * Confirmacion Page
 * Página de confirmación post-compra con detalles del pedido
 * Conectado con Supabase para obtener pedidos reales
 */
export default function Confirmacion() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [pedido, setPedido] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    cargarPedido()
  }, [searchParams])
  
  /**
   * Cargar pedido desde Supabase por número
   */
  const cargarPedido = async () => {
    const numeroPedido = searchParams.get('numero')
    
    if (!numeroPedido) {
      console.warn('⚠️ No se proporcionó número de pedido')
      navigate('/', { replace: true })
      return
    }
    
    console.log('📦 Cargando pedido:', numeroPedido)
    
    try {
      const { data, error } = await getPedidoByNumero(numeroPedido)
      
      if (error) {
        console.error('❌ Error al cargar pedido:', error)
        setError('No se pudo cargar el pedido')
        setLoading(false)
        return
      }
      
      if (!data) {
        console.warn('⚠️ Pedido no encontrado:', numeroPedido)
        setError('Pedido no encontrado')
        setLoading(false)
        return
      }
      
      console.log('✅ Pedido cargado:', data)
      setPedido(data)
      
    } catch (err) {
      console.error('❌ Error inesperado:', err)
      setError('Error al cargar el pedido')
    } finally {
      setLoading(false)
    }
  }
  
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue mx-auto mb-4" />
          <p className="text-gray-600">Cargando pedido...</p>
        </div>
      </div>
    )
  }
  
  // Error state
  if (error || !pedido) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Card padding="lg" className="max-w-md text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-navy mb-2">
            {error || 'Pedido no encontrado'}
          </h2>
          <p className="text-gray-600 mb-6">
            No pudimos encontrar la información del pedido
          </p>
          <Button
            as={Link}
            to="/"
            variant="primary"
            size="lg"
            fullWidth
          >
            Volver al Inicio
          </Button>
        </Card>
      </div>
    )
  }
  
  // Mapear nombres
  const deliveryNames = {
    retiro: 'Retiro en local',
    delivery: 'Delivery a domicilio'
  }
  
  const paymentNames = {
    efectivo: 'Efectivo',
    transferencia: 'Transferencia bancaria',
    mercadopago: 'MercadoPago'
  }
  
  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container-custom max-w-3xl px-4 lg:px-6 mx-auto">
        {/* Header de éxito */}
        <div className="text-center mb-8 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-navy mb-2">
            ¡Pedido Confirmado!
          </h1>
          
          <p className="text-lg text-gray-600">
            Gracias por tu compra, <span className="font-semibold text-navy">{pedido.cliente_nombre}</span>
          </p>
          
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue/10 rounded-lg">
            <Package className="w-5 h-5 text-blue" />
            <span className="text-sm font-medium text-blue">
              Número de pedido: {pedido.numero_pedido}
            </span>
          </div>
        </div>
        
        {/* Detalles del pedido */}
        <Card padding="lg" className="mb-6">
          <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Resumen del Pedido
          </h2>
          
          {/* Items */}
          <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
            {pedido.items?.map((item, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-navy line-clamp-1">
                    {item.producto_nombre}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {item.cantidad} × {formatPrice(item.precio_unitario)}
                  </p>
                </div>
                <span className="font-semibold text-navy">
                  {formatPrice(item.subtotal)}
                </span>
              </div>
            ))}
          </div>
          
          {/* Totales */}
          <div className="space-y-2 mb-6 pb-6 border-b border-gray-200">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatPrice(pedido.subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Envío</span>
              <span className={clsx(pedido.envio === 0 && 'text-green-600 font-medium')}>
                {pedido.envio === 0 ? '¡Gratis!' : formatPrice(pedido.envio)}
              </span>
            </div>
            <div className="flex justify-between text-xl font-bold text-navy pt-2 border-t border-gray-200">
              <span>Total</span>
              <span className="text-pink">{formatPrice(pedido.total)}</span>
            </div>
          </div>
          
          {/* Info de entrega */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-navy">Entrega</h3>
                <p className="text-gray-600">{deliveryNames[pedido.tipo_entrega]}</p>
                {pedido.cliente_direccion && (
                  <p className="text-sm text-gray-500 mt-1">{pedido.cliente_direccion}</p>
                )}
                {pedido.cliente_referencia && (
                  <p className="text-xs text-gray-400 mt-1">{pedido.cliente_referencia}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-blue flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-navy">Método de pago</h3>
                <p className="text-gray-600">{paymentNames[pedido.metodo_pago]}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-blue flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-navy">Contacto</h3>
                <p className="text-gray-600">{formatPhone(pedido.cliente_telefono)}</p>
                {pedido.cliente_email && (
                  <p className="text-sm text-gray-500">{pedido.cliente_email}</p>
                )}
              </div>
            </div>
          </div>
        </Card>
        
        {/* Próximos pasos */}
        <Card padding="md" className="mb-6 bg-blue/5 border-blue/20">
          <h3 className="font-bold text-navy mb-3">Próximos pasos</h3>
          
          {pedido.tipo_entrega === 'retiro' ? (
            <div className="space-y-2 text-sm text-gray-700">
              <p>✓ Te contactaremos por WhatsApp para confirmar tu pedido</p>
              <p>✓ Te avisaremos cuando esté listo para retirar</p>
              <p>✓ Podés pasar a buscarlo por nuestro local</p>
              <p className="text-xs text-gray-500 mt-3">
                📍 Dirección del local: [Agregar dirección]
              </p>
            </div>
          ) : (
            <div className="space-y-2 text-sm text-gray-700">
              <p>✓ Te contactaremos por WhatsApp para confirmar tu pedido</p>
              <p>✓ Coordinaremos el horario de entrega</p>
              <p>✓ Recibirás tu pedido en la dirección indicada</p>
            </div>
          )}
        </Card>
        
        {/* Nota de contacto */}
        <Card padding="md" className="mb-8">
          <p className="text-sm text-gray-600 text-center">
            Si tenés alguna consulta, contactanos por{' '}
            <a 
              href={`https://wa.me/54${pedido.cliente_telefono.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue hover:underline font-medium"
            >
              WhatsApp
            </a>
          </p>
        </Card>
        
        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/" className="flex-1">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              leftIcon={<Home className="w-5 h-5" />}
            >
              Volver al Inicio
            </Button>
          </Link>
          
          <Link to="/productos" className="flex-1">
            <Button
              variant="outline"
              size="lg"
              fullWidth
              leftIcon={<ShoppingBag className="w-5 h-5" />}
            >
              Seguir Comprando
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
