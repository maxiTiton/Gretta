/**
 * StatsCard Component
 * Card de estadísticas para el dashboard admin
 */

const colorClasses = {
  orange: 'bg-orange-100 text-orange-600',
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  pink: 'bg-pink-pastel-100 text-pink'
}

export default function StatsCard({ title, value, icon: Icon, color = 'blue', loading = false }) {
  return (
    <div className="bg-white rounded-xl shadow-soft p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center gap-4">
        {/* Icono */}
        <div className={`w-14 h-14 rounded-lg ${colorClasses[color]} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-7 h-7" />
        </div>

        {/* Contenido */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-600 mb-1 truncate">{title}</p>
          
          {loading ? (
            <div className="h-8 w-20 bg-gray-200 animate-pulse rounded" />
          ) : (
            <p className="text-3xl font-bold text-navy">
              {typeof value === 'number' && value >= 1000 
                ? value.toLocaleString('es-AR')
                : value
              }
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
