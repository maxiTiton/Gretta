import { Minus, Plus, Trash2 } from 'lucide-react'
import { clsx } from 'clsx'
import { formatPrice } from '@/utils/formatters'
import Button from '@/components/ui/Button'

/**
 * CartItem Component
 * Item individual del carrito con controles de cantidad
 * 
 * @param {Object} props
 * @param {Object} props.item - { producto, cantidad }
 * @param {Function} props.onUpdateQuantity - Función para actualizar cantidad
 * @param {Function} props.onRemove - Función para eliminar item
 */
export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const { producto, cantidad } = item
  const subtotal = producto.precio * cantidad
  
  const handleDecrease = () => {
    if (cantidad > 1) {
      onUpdateQuantity(producto.id, cantidad - 1)
    }
  }
  
  const handleIncrease = () => {
    onUpdateQuantity(producto.id, cantidad + 1)
  }
  
  return (
    <div className="flex gap-4 py-4 border-b border-gray-200 last:border-0">
      {/* Imagen */}
      <div className="flex-shrink-0">
        <img
          src={producto.imagen_url}
          alt={producto.nombre}
          className="w-20 h-20 object-cover rounded-lg"
        />
      </div>
      
      {/* Info y controles */}
      <div className="flex-1 min-w-0">
        {/* Nombre y precio unitario */}
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-medium text-navy text-sm line-clamp-2">
            {producto.nombre}
          </h3>
          <button
            onClick={() => onRemove(producto.id)}
            className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
            aria-label={`Eliminar ${producto.nombre}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-sm text-gray-600 mb-2">
          {formatPrice(producto.precio)}
        </p>
        
        {/* Controles de cantidad y subtotal */}
        <div className="flex justify-between items-center">
          {/* Quantity controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrease}
              disabled={cantidad <= 1}
              className={clsx(
                'w-7 h-7 rounded-md border-2 flex items-center justify-center transition-colors',
                cantidad <= 1
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-blue text-blue hover:bg-blue hover:text-white'
              )}
              aria-label="Disminuir cantidad"
            >
              <Minus className="w-4 h-4" />
            </button>
            
            <span className="w-8 text-center font-semibold text-navy">
              {cantidad}
            </span>
            
            <button
              onClick={handleIncrease}
              className="w-7 h-7 rounded-md border-2 border-blue text-blue hover:bg-blue hover:text-white flex items-center justify-center transition-colors"
              aria-label="Aumentar cantidad"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          {/* Subtotal */}
          <span className="font-bold text-pink">
            {formatPrice(subtotal)}
          </span>
        </div>
      </div>
    </div>
  )
}
