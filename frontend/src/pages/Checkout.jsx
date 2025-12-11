import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCartStore } from '@/store/cartStore'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import OrderSummary from '@/components/checkout/OrderSummary'
import { crearPedido } from '@/services/pedidos.service'
import { ChevronRight, ShoppingBag } from 'lucide-react'

/**
 * Checkout Page
 * Página de finalización de compra con formulario y resumen
 * Conectado con Supabase para guardar pedidos
 */
export default function Checkout() {
  const navigate = useNavigate()
  const { items, getTotal, clearCart } = useCartStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    tipoEntrega: 'retiro',
    metodoPago: 'efectivo'
  })
  
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
      
      // Construir objeto de pedido para Supabase
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
      
      // Guardar en Supabase
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
      
      // Navegar a confirmación con número real de Supabase
      navigate(`/confirmacion?numero=${pedidoCreado.numero_pedido}`)
      
    } catch (error) {
      console.error('❌ Error inesperado:', error)
      alert('Error al procesar el pedido. Por favor, intentá de nuevo.')
      setIsSubmitting(false)
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
              isSubmitting={isSubmitting}
              subtotal={subtotal}
            />
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
