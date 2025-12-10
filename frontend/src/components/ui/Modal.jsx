/**
 * Modal Component
 * Modal/Dialog reutilizable
 * 
 * TODO:
 * - Props: isOpen, onClose, title, children, size
 * - Overlay con backdrop blur
 * - Animaciones de entrada/salida (Framer Motion)
 * - Cerrar con ESC o click fuera
 * - Trap focus dentro del modal
 */

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null
  
  return (
    <div>
      {/* TODO: Implementar modal */}
    </div>
  )
}
