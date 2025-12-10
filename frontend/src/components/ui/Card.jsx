/**
 * Card Component
 * Tarjeta contenedora reutilizable
 * 
 * TODO:
 * - Props: children, className, padding variants
 * - Aplicar estilos de sombra suave
 * - Soporte para hover effects
 */

export default function Card({ children, ...props }) {
  return (
    <div {...props}>
      {children}
    </div>
  )
}
