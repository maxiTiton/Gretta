import { ShoppingCart } from 'lucide-react'
import { clsx } from 'clsx'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

/**
 * ProductCard Component
 * Tarjeta de producto para mostrar en grillas
 * 
 * @param {Object} props
 * @param {Object} props.producto - Datos del producto
 * @param {string} props.producto.id - ID del producto
 * @param {string} props.producto.nombre - Nombre del producto
 * @param {number} props.producto.precio - Precio del producto
 * @param {string} props.producto.imagen - URL de la imagen
 * @param {string} [props.producto.badge] - Badge opcional (Destacado, Nuevo, etc)
 * @param {Function} [props.onAddToCart] - Función para agregar al carrito
 * @param {Function} [props.onClick] - Función al hacer click en la card
 * @param {string} [props.className] - Clases CSS adicionales
 * 
 * @example
 * <ProductCard
 *   producto={{
 *     id: 1,
 *     nombre: "Café Espresso",
 *     precio: 1200,
 *     imagen: "/cafe.jpg",
 *     badge: "Destacado"
 *   }}
 *   onAddToCart={handleAddToCart}
 * />
 */
export default function ProductCard({
  producto,
  onAddToCart,
  onClick,
  className = ''
}) {
  const { id, nombre, precio, imagen, badge } = producto
  
  // Formatear precio con separador de miles
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price)
  }
  
  const handleAddToCart = (e) => {
    e.stopPropagation()
    if (onAddToCart) {
      onAddToCart(producto)
    }
  }
  
  return (
    <Card
      padding="none"
      hover
      className={clsx('group overflow-hidden cursor-pointer', className)}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gray-100">
        <img
          src={imagen}
          alt={nombre}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badge */}
        {badge && (
          <div className="absolute top-3 right-3">
            <Badge
              variant={badge === 'Nuevo' ? 'info' : badge === 'Destacado' ? 'warning' : 'default'}
              size="md"
            >
              {badge}
            </Badge>
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-navy mb-2 line-clamp-2 group-hover:text-blue transition-colors">
          {nombre}
        </h3>
        
        <div className="flex items-center justify-between gap-3">
          <span className="text-2xl font-bold text-pink">
            {formatPrice(precio)}
          </span>
          
          <Button
            size="sm"
            variant="primary"
            onClick={handleAddToCart}
            className="flex items-center gap-2"
            aria-label={`Agregar ${nombre} al carrito`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Agregar</span>
          </Button>
        </div>
      </div>
    </Card>
  )
}
