/**
 * OrderStatusBadge Component
 * Badge de estado de pedido con colores según estado
 */

const estadoConfig = {
  pendiente: { 
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
    label: 'Pendiente' 
  },
  preparando: { 
    color: 'bg-blue-100 text-blue-800 border-blue-200', 
    label: 'En Preparación' 
  },
  listo: { 
    color: 'bg-green-100 text-green-800 border-green-200', 
    label: 'Listo' 
  },
  entregado: { 
    color: 'bg-gray-100 text-gray-800 border-gray-200', 
    label: 'Entregado' 
  },
  cancelado: { 
    color: 'bg-red-100 text-red-800 border-red-200', 
    label: 'Cancelado' 
  }
}

export default function OrderStatusBadge({ estado, className = '' }) {
  const config = estadoConfig[estado] || estadoConfig.pendiente

  return (
    <span 
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border
        ${config.color} ${className}
      `}
    >
      {config.label}
    </span>
  )
}
