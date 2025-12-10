import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCartStore } from '@/store/cartStore'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import OrderSummary from '@/components/checkout/OrderSummary'
import { ChevronRight, ShoppingBag } from 'lucide-react'

/**
 * Checkout Page
 * Página de finalización de compra con formulario y resumen
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
      // Simular llamada a API (1.5 segundos)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Construir objeto de pedido
      const pedido = {
        id: `ORD-${Date.now()}`,
        fecha: new Date().toISOString(),
        cliente: {
          nombre: data.nombre,
          telefono: data.telefono,
          email: data.email || null
        },
        items: items.map(item => ({
          productoId: item.producto.id,
          nombre: item.producto.nombre,
          cantidad: item.cantidad,
          precio: item.producto.precio,
          imagen: item.producto.imagen_url
        })),
        entrega: {
          tipo: data.tipoEntrega,
          direccion: data.direccion || null,
          referencia: data.referencia || null
        },
        pago: {
          metodo: data.metodoPago
        },
        notas: data.notas || null,
        subtotal: subtotal,
        envio: data.tipoEntrega === 'delivery' && subtotal < 5000 ? 500 : 0,
        total: data.tipoEntrega === 'delivery' && subtotal < 5000 ? subtotal + 500 : subtotal,
        estado: 'pendiente'
      }
      
      // TODO: Aquí iría la llamada real a la API
      // const response = await crearPedido(pedido)
      
      // Guardar pedido en localStorage (temporal, hasta integrar backend)
      localStorage.setItem('ultimo-pedido', JSON.stringify(pedido))
      
      // Limpiar carrito
      clearCart()
      
      // Navegar a confirmación
      navigate(`/confirmacion?id=${pedido.id}`)
      
    } catch (error) {
      console.error('Error al procesar pedido:', error)
      alert('Hubo un error al procesar tu pedido. Por favor intentá de nuevo.')
    } finally {
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
