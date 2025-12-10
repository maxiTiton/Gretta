/**
 * Button Component
 * Botón reutilizable con variantes y tamaños
 * 
 * TODO:
 * - Props: variant (primary, secondary, outline, ghost), size (sm, md, lg)
 * - Soporte para icono izquierdo/derecho
 * - Estados: loading, disabled
 * - Usar clsx para manejar clases condicionales
 */

export default function Button({ children, ...props }) {
  return (
    <button {...props}>
      {children}
    </button>
  )
}
