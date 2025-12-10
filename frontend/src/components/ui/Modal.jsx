import { useEffect } from 'react'
import { X } from 'lucide-react'
import { clsx } from 'clsx'

/**
 * Modal Component
 * Modal/Dialog reutilizable con overlay y animaciones
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Controla si el modal está abierto
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {string} [props.title] - Título del modal
 * @param {React.ReactNode} props.children - Contenido del modal
 * @param {boolean} [props.showCloseButton=true] - Muestra el botón X de cerrar
 * @param {'sm'|'md'|'lg'|'xl'} [props.size='md'] - Tamaño del modal
 * 
 * @example
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirmar acción"
 *   size="md"
 * >
 *   <p>¿Estás seguro de continuar?</p>
 *   <div className="flex gap-3 mt-6">
 *     <Button onClick={handleConfirm}>Confirmar</Button>
 *     <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancelar</Button>
 *   </div>
 * </Modal>
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  size = 'md'
}) {
  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])
  
  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  
  if (!isOpen) return null
  
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  }
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-navy/50 backdrop-blur-sm" />
      
      {/* Modal */}
      <div
        className={clsx(
          'relative bg-white rounded-xl shadow-2xl w-full transform transition-all',
          sizeClasses[size]
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            {title && (
              <h2
                id="modal-title"
                className="text-xl font-semibold text-navy font-display"
              >
                {title}
              </h2>
            )}
            
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-navy transition-colors rounded-lg hover:bg-gray-100"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="px-6 py-6">
          {children}
        </div>
      </div>
    </div>
  )
}
