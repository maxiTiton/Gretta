/**
 * Badge Component
 * Insignia para mostrar estados o categorías
 * 
 * TODO:
 * - Props: variant (success, warning, error, info), children
 * - Tamaños pequeño y normal
 * - Colores según estado de pedido
 */

export default function Badge({ children, variant = 'default' }) {
  return (
    <span>
      {children}
    </span>
  )
}
