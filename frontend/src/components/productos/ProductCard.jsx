import { ShoppingCart, Eye } from 'lucide-react'
import { clsx } from 'clsx'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { formatPrice } from '@/utils/formatters'

/**
 * ProductCard Component
 * Tarjeta de producto para grillas con overlay y badges
 * 
 * @param {Object} props
 * @param {Object} props.producto - Datos del producto
 * @param {number} props.producto.id - ID del producto
 * @param {string} props.producto.nombre - Nombre del producto
 * @param {string} props.producto.descripcion - Descripción del producto
 * @param {number} props.producto.precio - Precio del producto
 * @param {string} props.producto.imagen_url - URL de la imagen
 * @param {string} props.producto.categoria - Categoría del producto
 * @param {boolean} props.producto.disponible - Si está disponible
 * @param {boolean} [props.producto.masVendido] - Si es más vendido
 * @param {Function} [props.onAddToCart] - Función para agregar al carrito
 * @param {Function} [props.onViewDetail] - Función al ver detalle
 * @param {string} [props.className] - Clases CSS adicionales
 */
export default function ProductCard({
  producto,
  onAddToCart,
  onViewDetail,
  className = ''
}) {
  const { id, nombre, descripcion, precio, imagen_url, categoria, disponible, masVendido } = producto
  
  // Mapear nombre de categoría
  const categoryNames = {
    'heladeria': 'Heladería',
    'pasteleria': 'Pastelería',
    'laminados': 'Laminados',
    'panificacion': 'Panificación',
    'team-dulce': 'Team Dulce',
    'especiales': 'Especiales',
  }
  
  const handleAddToCart = (e) => {
    e.stopPropagation()
    if (disponible && onAddToCart) {
      onAddToCart(producto)
    }
  }
  
  const handleClick = () => {
    if (onViewDetail) {
      onViewDetail(producto)
    }
  }
  
  return (
    <Card
      padding="none"
      hover={disponible}
      className={clsx(
        'group overflow-hidden cursor-pointer relative',
        { 'opacity-75': !disponible },
        className
      )}
      onClick={handleClick}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gray-100">
        <img
          src={imagen_url}
          alt={nombre}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay "Ver más" en hover */}
        <div className="absolute inset-0 bg-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white font-medium flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Ver más
          </span>
        </div>
        
        {/* Badge Más Vendido */}
        {masVendido && disponible && (
          <div className="absolute top-3 right-3">
            <Badge variant="error" size="md">
              Más vendido
            </Badge>
          </div>
        )}
        
        {/* Badge Agotado */}
        {!disponible && (
          <div className="absolute top-3 right-3">
            <Badge variant="default" size="md">
              Agotado
            </Badge>
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        {/* Categoría */}
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          {categoryNames[categoria] || categoria}
        </p>
        
        {/* Nombre */}
        <h3 className="font-semibold text-lg text-navy mb-2 group-hover:text-blue transition-colors">
          {nombre}
        </h3>
        
        {/* Descripción */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
          {descripcion}
        </p>
        
        {/* Precio y Botón */}
        <div className="flex items-center justify-between gap-3">
          <span className="text-2xl font-bold text-pink">
            {formatPrice(precio)}
          </span>
          
          <Button
            size="sm"
            variant={disponible ? "primary" : "ghost"}
            onClick={handleAddToCart}
            disabled={!disponible}
            className="flex items-center gap-2"
            aria-label={disponible ? `Agregar ${nombre} al carrito` : 'Producto agotado'}
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">
              {disponible ? 'Agregar' : 'Agotado'}
            </span>
          </Button>
        </div>
      </div>
    </Card>
  )
}
