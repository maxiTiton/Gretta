import { clsx } from 'clsx'

/**
 * Badge Component
 * Insignia para mostrar estados, categorías o etiquetas
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido del badge
 * @param {'default'|'success'|'warning'|'error'|'info'} [props.variant='default'] - Variante de color
 * @param {'sm'|'md'} [props.size='sm'] - Tamaño del badge
 * @param {string} [props.className] - Clases CSS adicionales
 * 
 * @example
 * <Badge variant="success">Entregado</Badge>
 * 
 * @example
 * <Badge variant="warning" size="md">Stock bajo</Badge>
 * 
 * @example
 * <Badge variant="info">Cafetería</Badge>
 */
export default function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className = ''
}) {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    error: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700'
  }
  
  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
  }
  
  const badgeClasses = clsx(
    'inline-flex items-center font-medium rounded-full',
    'transition-all duration-200',
    variants[variant],
    sizes[size],
    className
  )
  
  return (
    <span className={badgeClasses}>
      {children}
    </span>
  )
}
