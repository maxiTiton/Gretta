import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { clsx } from 'clsx'

/**
 * Alert Component
 * Componente para mostrar alertas, notificaciones y mensajes
 * 
 * @param {Object} props
 * @param {'success'|'error'|'warning'|'info'} props.type - Tipo de alerta
 * @param {string} [props.title] - Título opcional de la alerta
 * @param {React.ReactNode} props.children - Mensaje de la alerta
 * @param {Function} [props.onClose] - Función para cerrar (muestra botón X)
 * @param {string} [props.className] - Clases CSS adicionales
 * 
 * @example
 * <Alert type="success" title="¡Éxito!">
 *   El producto se agregó al carrito correctamente.
 * </Alert>
 * 
 * @example
 * <Alert
 *   type="error"
 *   onClose={() => setShowAlert(false)}
 * >
 *   Ocurrió un error al procesar tu solicitud.
 * </Alert>
 * 
 * @example
 * <Alert type="warning">
 *   Stock limitado. Quedan solo 3 unidades.
 * </Alert>
 */
export default function Alert({
  type,
  title,
  children,
  onClose,
  className = ''
}) {
  const configs = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-400',
      textColor: 'text-green-800',
      iconColor: 'text-green-600'
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-400',
      textColor: 'text-red-800',
      iconColor: 'text-red-600'
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-400',
      textColor: 'text-yellow-800',
      iconColor: 'text-yellow-600'
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-400',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-600'
    }
  }
  
  const config = configs[type]
  const Icon = config.icon
  
  const alertClasses = clsx(
    'p-4 rounded-lg border-l-4 shadow-sm',
    config.bgColor,
    config.borderColor,
    className
  )
  
  return (
    <div className={alertClasses} role="alert">
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={clsx('flex-shrink-0 mt-0.5', config.iconColor)}>
          <Icon className="w-5 h-5" />
        </div>
        
        {/* Content */}
        <div className={clsx('flex-1', config.textColor)}>
          {title && (
            <h3 className="font-semibold mb-1">
              {title}
            </h3>
          )}
          <div className={title ? 'text-sm' : 'text-base'}>
            {children}
          </div>
        </div>
        
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className={clsx(
              'flex-shrink-0 p-1 rounded-lg hover:bg-white/50 transition-colors',
              config.textColor
            )}
            aria-label="Cerrar alerta"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
