import ProductCard from './ProductCard'
import Loading from '@/components/ui/Loading'
import Button from '@/components/ui/Button'
import { Package } from 'lucide-react'

/**
 * ProductGrid Component
 * Grilla responsive de productos con estados de loading y empty
 * 
 * @param {Object} props
 * @param {Array} props.productos - Array de productos
 * @param {Function} [props.onViewDetail] - Función para ver detalle
 * @param {boolean} [props.loading] - Estado de carga
 */
export default function ProductGrid({ productos, onViewDetail, loading = false }) {
  // Loading state
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-soft overflow-hidden animate-pulse"
          >
            <div className="aspect-[4/3] bg-gray-200" />
            <div className="p-4 space-y-3">
              <div className="h-3 bg-gray-200 rounded w-1/3" />
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
              <div className="flex justify-between items-center">
                <div className="h-8 bg-gray-200 rounded w-1/3" />
                <div className="h-9 bg-gray-200 rounded w-1/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  // Empty state
  if (!productos || productos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
          <Package className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-navy mb-2">
          No se encontraron productos
        </h3>
        <p className="text-gray-600 mb-6">
          Intentá con otros filtros o buscá algo diferente
        </p>
        <Button
          variant="outline"
          onClick={() => window.location.href = '/productos'}
        >
          Ver todos los productos
        </Button>
      </div>
    )
  }
  
  // Products grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          producto={producto}
          onViewDetail={onViewDetail}
        />
      ))}
    </div>
  )
}
