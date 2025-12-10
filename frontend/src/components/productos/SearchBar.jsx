import { Search, X } from 'lucide-react'
import { clsx } from 'clsx'

/**
 * SearchBar Component
 * Barra de búsqueda con botón clear
 * 
 * @param {Object} props
 * @param {string} props.value - Valor actual del input
 * @param {Function} props.onChange - Función al cambiar valor
 * @param {string} [props.placeholder] - Placeholder del input
 * @param {string} [props.className] - Clases CSS adicionales
 */
export default function SearchBar({
  value,
  onChange,
  placeholder = 'Buscar productos...',
  className = ''
}) {
  const handleClear = () => {
    onChange('')
  }
  
  return (
    <div className={clsx('relative w-full max-w-md', className)}>
      {/* Search Icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <Search className="w-5 h-5" />
      </div>
      
      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={clsx(
          'w-full pl-12 pr-12 py-3 rounded-lg',
          'border-2 border-gray-300',
          'focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent',
          'transition-all duration-200',
          'placeholder:text-gray-400'
        )}
      />
      
      {/* Clear Button */}
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy transition-colors"
          aria-label="Limpiar búsqueda"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
