import { clsx } from 'clsx'

/**
 * Card Component
 * Tarjeta contenedora reutilizable con estilos elegantes
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido de la tarjeta
 * @param {string} [props.className] - Clases CSS adicionales
 * @param {Function} [props.onClick] - Función onClick (hace la card clickeable)
 * @param {boolean} [props.hover=false] - Activa efectos hover
 * @param {'none'|'sm'|'md'|'lg'} [props.padding='md'] - Tamaño del padding interno
 * 
 * @example
 * <Card hover onClick={handleClick}>
 *   <h3>Título</h3>
 *   <p>Contenido de la tarjeta</p>
 * </Card>
 * 
 * @example
 * <Card padding="lg" className="border-2 border-pink">
 *   <ProductInfo />
 * </Card>
 */
export default function Card({
  children,
  className = '',
  onClick,
  hover = false,
  padding = 'md',
  ...props
}) {
  const isClickable = Boolean(onClick)
  
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  const cardClasses = clsx(
    'bg-white rounded-xl shadow-soft transition-all duration-300',
    paddingClasses[padding],
    {
      'hover:shadow-lg transform hover:-translate-y-1': hover || isClickable,
      'cursor-pointer': isClickable,
    },
    className
  )
  
  const CardElement = isClickable ? 'button' : 'div'
  
  return (
    <CardElement
      className={cardClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </CardElement>
  )
}
