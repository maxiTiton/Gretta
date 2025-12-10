import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { clsx } from 'clsx'

/**
 * CartButton Component
 * Botón del carrito en navbar con badge de cantidad
 */
export default function CartButton() {
  const itemCount = useCartStore(state => state.getItemCount())
  const toggleCart = useCartStore(state => state.toggleCart)
  
  return (
    <button
      onClick={toggleCart}
      className="relative p-2 text-white hover:text-gray-200 transition-colors"
      aria-label={`Carrito de compras (${itemCount} items)`}
    >
      <ShoppingCart className="w-6 h-6" />
      
      {/* Badge con cantidad */}
      {itemCount > 0 && (
        <span
          className={clsx(
            'absolute -top-1 -right-1',
            'min-w-[20px] h-5 px-1.5',
            'flex items-center justify-center',
            'bg-pink text-white text-xs font-bold rounded-full',
            'animate-bounce'
          )}
        >
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  )
}
