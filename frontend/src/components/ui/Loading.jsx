import { Loader2 } from 'lucide-react'
import { clsx } from 'clsx'

/**
 * Loading Component
 * Indicador de carga reutilizable con spinner animado
 * 
 * @param {Object} props
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Tamaño del spinner
 * @param {boolean} [props.fullScreen=false] - Muestra loading en pantalla completa
 * @param {string} [props.text] - Texto opcional debajo del spinner
 * @param {string} [props.className] - Clases CSS adicionales
 * 
 * @example
 * // Inline loading
 * <Loading size="sm" text="Cargando productos..." />
 * 
 * @example
 * // Fullscreen loading
 * <Loading fullScreen text="Procesando pago..." />
 */
export default function Loading({
  size = 'md',
  fullScreen = false,
  text,
  className = ''
}) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }
  
  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }
  
  const spinner = (
    <div className={clsx('flex flex-col items-center justify-center gap-3', className)}>
      <Loader2
        className={clsx(
          sizeClasses[size],
          'animate-spin text-blue'
        )}
      />
      {text && (
        <p className={clsx(textSizeClasses[size], 'text-navy/70 font-medium')}>
          {text}
        </p>
      )}
    </div>
  )
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-cream/80 backdrop-blur-sm">
        {spinner}
      </div>
    )
  }
  
  return spinner
}
