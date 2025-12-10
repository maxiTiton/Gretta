import { clsx } from 'clsx'
import Badge from '@/components/ui/Badge'

/**
 * CategoryFilter Component
 * Filtro de categorías con scroll horizontal en mobile
 * 
 * @param {Object} props
 * @param {string} props.selectedCategory - Categoría seleccionada
 * @param {Function} props.onSelectCategory - Función al seleccionar categoría
 * @param {Array} props.categories - Array de { id, nombre, count }
 */
export default function CategoryFilter({ selectedCategory, onSelectCategory, categories }) {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
          {categories.map((category) => {
            const isActive = selectedCategory === category.id
            
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={clsx(
                  'flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200',
                  'border-2 flex-shrink-0',
                  isActive
                    ? 'bg-blue text-white border-blue'
                    : 'bg-white text-navy border-gray-300 hover:bg-cream hover:border-gray-400'
                )}
              >
                <span>{category.nombre}</span>
                <Badge
                  variant={isActive ? 'default' : 'info'}
                  size="sm"
                  className={isActive ? 'bg-white/20 text-white' : ''}
                >
                  {category.count}
                </Badge>
              </button>
            )
          })}
        </div>
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
