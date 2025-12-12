import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, ChefHat, CheckCircle, DollarSign, ArrowRight, ShieldCheck } from 'lucide-react'
import Sidebar from '@/components/admin/Sidebar'
import StatsCard from '@/components/admin/StatsCard'
import OrderStatusBadge from '@/components/admin/OrderStatusBadge'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { getPedidos } from '@/services/pedidos.service'
import { formatCurrency } from '@/utils/formatters'

/**
 * Admin Dashboard Page
 * Panel principal de administración con estadísticas y pedidos recientes
 */

export default function Dashboard() {
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargarPedidos()
    
    // Auto-refresh cada 30 segundos
    const interval = setInterval(cargarPedidos, 30000)
    return () => clearInterval(interval)
  }, [])

  const cargarPedidos = async () => {
    const { data } = await getPedidos()
    if (data) {
      setPedidos(data)
    }
    setLoading(false)
  }

  // Calcular estadísticas
  const pendientes = pedidos.filter(p => p.estado === 'pendiente').length
  const preparando = pedidos.filter(p => p.estado === 'preparando').length
  const listos = pedidos.filter(p => p.estado === 'listo').length
  
  const hoy = new Date().toISOString().split('T')[0]
  const ventasHoy = pedidos
    .filter(p => p.created_at?.startsWith(hoy))
    .reduce((sum, p) => sum + parseFloat(p.total || 0), 0)

  // Últimos 10 pedidos
  const pedidosRecientes = [...pedidos]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 10)

  return (
    <div className="min-h-screen bg-cream flex">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-navy">Panel de Administración</h1>
              <Badge className="bg-pink text-white">
                <ShieldCheck className="w-4 h-4" />
                Administrador
              </Badge>
            </div>
            <p className="text-gray-600">
              Gestiona pedidos y monitorea las ventas en tiempo real
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Pedidos Pendientes"
              value={pendientes}
              icon={Clock}
              color="orange"
              loading={loading}
            />
            <StatsCard
              title="En Preparación"
              value={preparando}
              icon={ChefHat}
              color="blue"
              loading={loading}
            />
            <StatsCard
              title="Listos para Entregar"
              value={listos}
              icon={CheckCircle}
              color="green"
              loading={loading}
            />
            <StatsCard
              title="Ventas del Día"
              value={formatCurrency(ventasHoy)}
              icon={DollarSign}
              color="pink"
              loading={loading}
            />
          </div>

          {/* Pedidos Recientes */}
          <div className="bg-white rounded-xl shadow-soft overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-navy">Pedidos Recientes</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Últimos {pedidosRecientes.length} pedidos recibidos
                </p>
              </div>
              <Link to="/admin/pedidos">
                <Button variant="outline" size="sm">
                  Ver todos
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy mx-auto" />
                <p className="text-gray-600 mt-4">Cargando pedidos...</p>
              </div>
            ) : pedidosRecientes.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-600">No hay pedidos recientes</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Pedido
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pedidosRecientes.map((pedido) => (
                      <tr 
                        key={pedido.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-navy">
                            {pedido.numero_pedido || `#GRT-${pedido.id}`}
                          </div>
                          <div className="text-xs text-gray-500">
                            {pedido.items?.length || 0} items
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-navy">
                            {pedido.cliente_nombre}
                          </div>
                          <div className="text-xs text-gray-500">
                            {pedido.cliente_telefono}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(pedido.created_at).toLocaleDateString('es-AR', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-navy">
                            {formatCurrency(pedido.total)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <OrderStatusBadge estado={pedido.estado} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
