import { Loader2 } from 'lucide-react'
import { clsx } from 'clsx'

/**
 * Button Component
 * Botón reutilizable con múltiples variantes, tamaños y estados
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido del botón
 * @param {'primary'|'secondary'|'outline'|'ghost'} [props.variant='primary'] - Variante de estilo
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Tamaño del botón
 * @param {boolean} [props.disabled=false] - Estado deshabilitado
 * @param {boolean} [props.loading=false] - Estado de carga
 * @param {string} [props.className] - Clases CSS adicionales
 * @param {'button'|'submit'|'reset'} [props.type='button'] - Tipo de botón
 * @param {Function} [props.onClick] - Función onClick
 * 
 * @example
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Agregar al carrito
 * </Button>
 * 
 * @example
 * <Button variant="outline" loading disabled>
 *   Procesando...
 * </Button>
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  type = 'button',
  onClick,
  leftIcon,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-blue text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md',
    secondary: 'bg-pink text-white hover:bg-pink-600 focus:ring-pink-500 shadow-sm hover:shadow-md',
    outline: 'border-2 border-blue text-blue bg-transparent hover:bg-blue hover:text-white focus:ring-blue-500',
    ghost: 'text-navy hover:bg-cream focus:ring-gray-300'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2'
  }
  
  const buttonClasses = clsx(
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className
  )
  
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <Loader2 className="w-4 h-4 animate-spin" />
      )}
      {!loading && leftIcon && leftIcon}
      {children}
    </button>
  )
}
