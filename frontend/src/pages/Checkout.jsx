import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { initMercadoPago } from '@mercadopago/sdk-react'
import { useCartStore } from '@/store/cartStore'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import OrderSummary from '@/components/checkout/OrderSummary'
import MercadoPagoButton from '@/components/checkout/MercadoPagoButton'
import { crearPedido } from '@/services/pedidos.service'
import { crearPreferenciaPago, guardarPedidoPendiente } from '@/services/mercadopago.service'
import { ChevronRight, ShoppingBag } from 'lucide-react'

/**
 * Checkout Page
 * Página de finalización de compra con formulario y resumen
 * Soporta pago con efectivo, transferencia y MercadoPago
 */
export default function Checkout() {
  const navigate = useNavigate()
  const { items, getTotal, clearCart } = useCartStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    tipoEntrega: 'retiro',
    metodoPago: 'efectivo'
  })
  
  // Estados para MercadoPago
  const [mpPreferenceId, setMpPreferenceId] = useState(null)
  const [preparandoMP, setPreparandoMP] = useState(false)
  
  // Inicializar MercadoPago SDK
  useEffect(() => {
    const mpPublicKey = import.meta.env.VITE_MP_PUBLIC_KEY
    
    if (mpPublicKey) {
      try {
        initMercadoPago(mpPublicKey, {
          locale: 'es-AR'
        })
        console.log('✅ MercadoPago SDK inicializado')
      } catch (error) {
        console.error('❌ Error al inicializar MercadoPago:', error)
      }
    } else {
      console.warn('⚠️ VITE_MP_PUBLIC_KEY no configurada')
    }
  }, [])
  
  // Scroll to top al montar el componente
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
  
  // Guard: redirigir si el carrito está vacío SOLO en mount inicial
  useEffect(() => {
    if (items.length === 0 && !isSubmitting) {
      navigate('/carrito', { replace: true })
    }
  }, []) // Solo ejecutar en mount, no cuando items cambie
  
  // Calcular subtotal
  const subtotal = getTotal()
  
  // Handler del formulario
  const handleFormSubmit = async (data) => {
    setIsSubmitting(true)
    
    try {
      console.log('📦 Procesando pedido...', data)
      
      // Calcular envío y total
      const envio = data.tipoEntrega === 'delivery' && subtotal < 5000 ? 500 : 0
      const total = subtotal + envio
      
      // Construir objeto de pedido
      const pedidoData = {
        cliente: {
          nombre: data.nombre,
          telefono: data.telefono,
          email: data.email || null
        },
        items: items.map(item => ({
          productoId: item.producto.id,
          nombre: item.producto.nombre,
          cantidad: item.cantidad,
          precioUnitario: item.producto.precio
        })),
        tipoEntrega: data.tipoEntrega,
        direccion: data.tipoEntrega === 'delivery' ? data.direccion : null,
        referencia: data.referencia || null,
        metodoPago: data.metodoPago,
        notas: data.notas || null,
        subtotal: subtotal,
        envio: envio,
        total: total
      }
      
      // Si el método es MercadoPago, crear preferencia y mostrar botón
      if (data.metodoPago === 'mercadopago') {
        console.log('💳 Iniciando flujo de pago con MercadoPago...')
        setPreparandoMP(true)
        
        // Crear preferencia de pago
        const { preferenceId, error } = await crearPreferenciaPago(pedidoData)
        
        if (error) {
          console.error('❌ Error al crear preferencia MP:', error)
          const errorMsg = error.message || 'Error desconocido'
          alert(`Error al iniciar pago con MercadoPago:\n\n${errorMsg}\n\nRevisá la consola del navegador (F12) para más detalles.`)
          setIsSubmitting(false)
          setPreparandoMP(false)
          return
        }
        
        console.log('✅ Preferencia creada:', preferenceId)
        
        // Guardar datos del pedido temporalmente
        guardarPedidoPendiente(pedidoData)
        
        // Mostrar botón de MercadoPago
        setMpPreferenceId(preferenceId)
        setPreparandoMP(false)
        setIsSubmitting(false)
        
        // Scroll al botón de MP
        setTimeout(() => {
          document.getElementById('mp-button')?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          })
        }, 100)
        
        return
      }
      
      // Si es efectivo o transferencia (flujo normal)
      const { data: pedidoCreado, error } = await crearPedido(pedidoData)
      
      if (error) {
        console.error('❌ Error al crear pedido:', error)
        alert('Error al crear el pedido. Por favor, intentá de nuevo.')
        setIsSubmitting(false)
        return
      }
      
      console.log('✅ Pedido creado exitosamente:', pedidoCreado)
      
      // Limpiar carrito
      clearCart()
      
      // Navegar a confirmación
      navigate(`/confirmacion?numero=${pedidoCreado.numero_pedido}`)
      
    } catch (error) {
      console.error('❌ Error inesperado:', error)
      alert('Error al procesar el pedido. Por favor, intentá de nuevo.')
      setIsSubmitting(false)
      setPreparandoMP(false)
    }
  }
  
  // No renderizar nada si el carrito está vacío (el useEffect redirige)
  if (items.length === 0) {
    return null
  }
  
  return (
    <div className="min-h-screen bg-cream">
      {/* Header con breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-4 px-4 lg:px-6">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Link to="/" className="hover:text-blue transition-colors">
              Inicio
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/carrito" className="hover:text-blue transition-colors">
              Carrito
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-navy font-medium">Checkout</span>
          </nav>
          
          <h1 className="text-3xl font-bold text-navy flex items-center gap-2">
            <ShoppingBag className="w-8 h-8" />
            Finalizar Compra
          </h1>
        </div>
      </div>
      
      {/* Contenido principal: 2 columnas */}
      <div className="container-custom py-8 px-4 lg:px-6">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Columna izquierda: Formulario (8/12) */}
          <div className="lg:col-span-8">
            <CheckoutForm
              onSubmit={handleFormSubmit}
              isSubmitting={isSubmitting || preparandoMP}
              subtotal={subtotal}
            />
            
            {/* Botón de MercadoPago (solo si seleccionó MP y ya hay preferencia) */}
            {mpPreferenceId && (
              <div id="mp-button" className="mt-8 space-y-4">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-navy mb-4">
                    Completá tu pago
                  </h3>
                  <MercadoPagoButton
                    preferenceId={mpPreferenceId}
                    disabled={isSubmitting}
                    onReady={() => console.log('✅ Botón MP listo')}
                    onError={(error) => {
                      console.error('❌ Error en botón MP:', error)
                      alert('Error al cargar MercadoPago. Por favor, recargá la página.')
                    }}
                  />
                </div>
                
                {/* Instrucciones para desarrollo */}
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                  <p className="text-sm text-yellow-800 font-medium mb-2">
                    ℹ️ Instrucciones de prueba
                  </p>
                  <p className="text-xs text-yellow-700">
                    Después de pagar, si no aparece el botón "Volver al sitio", 
                    buscá en la URL de MercadoPago una dirección que empiece con 
                    <code className="bg-yellow-100 px-1 rounded">localhost:5173/checkout/success</code>
                    , copiala y pegala en tu navegador.
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Columna derecha: Resumen (4/12) */}
          <div className="lg:col-span-4">
            <OrderSummary
              items={items}
              tipoEntrega={formData.tipoEntrega}
              metodoPago={formData.metodoPago}
              sticky
            />
          </div>
        </div>
      </div>
    </div>
  )
}
