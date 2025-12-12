import { useEffect, useState } from 'react'
import { Search, RefreshCw, Filter, Truck, Store } from 'lucide-react'
import Sidebar from '@/components/admin/Sidebar'
import OrderStatusBadge from '@/components/admin/OrderStatusBadge'
import OrderDetail from '@/components/admin/OrderDetail'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { getPedidos } from '@/services/pedidos.service'
import { formatCurrency } from '@/utils/formatters'

/**
 * Admin Pedidos Page
 * Gestión completa de pedidos con filtros y búsqueda
 */

export default function PedidosAdmin() {
  const [pedidos, setPedidos] = useState([])
  const [filtroEstado, setFiltroEstado] = useState('todos')
  const [busqueda, setBusqueda] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedPedido, setSelectedPedido] = useState(null)

  useEffect(() => {
    cargarPedidos()
  }, [filtroEstado])

  const cargarPedidos = async () => {
    setLoading(true)
    try {
      const filters = filtroEstado !== 'todos' ? { estado: filtroEstado } : {}
      const { data } = await getPedidos(filters)
      if (data) {
        setPedidos(data)
      }
    } catch (error) {
      console.error('Error al cargar pedidos:', error)
    } finally {
      setLoading(false)
    }
  }

  const pedidosFiltrados = pedidos
    .filter(p => {
      if (!busqueda) return true
      const query = busqueda.toLowerCase()
      return (
        (p.numero_pedido || '').toLowerCase().includes(query) ||
        p.cliente_nombre.toLowerCase().includes(query) ||
        p.cliente_telefono.includes(query)
      )
    })
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

  const handleUpdateEstado = (pedidoActualizado) => {
    setPedidos(prev => 
      prev.map(p => p.id === pedidoActualizado.id ? pedidoActualizado : p)
    )
    setSelectedPedido(null)
  }

  return (
    <div className="min-h-screen bg-cream flex">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-navy mb-2">Gestión de Pedidos</h1>
            <p className="text-gray-600">
              Administra y actualiza el estado de todos los pedidos
            </p>
          </div>

          {/* Filtros y Búsqueda */}
          <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Filtro Estado */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Filter className="w-4 h-4 inline mr-1" />
                  Filtrar por Estado
                </label>
                <select
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                >
                  <option value="todos">Todos los estados</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="preparando">En Preparación</option>
                  <option value="listo">Listo</option>
                  <option value="entregado">Entregado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>

              {/* Búsqueda */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Search className="w-4 h-4 inline mr-1" />
                  Buscar Pedido
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar por número, cliente o teléfono..."
                    className="w-full px-4 py-2 pl-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Botón Actualizar */}
            <div className="mt-4 flex justify-end">
              <Button
                onClick={cargarPedidos}
                disabled={loading}
                variant="outline"
                size="sm"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Actualizar
              </Button>
            </div>
          </div>

          {/* Contador de Resultados */}
          <div className="mb-4">
            <p className="text-gray-600">
              Mostrando <span className="font-semibold text-navy">{pedidosFiltrados.length}</span> pedidos
              {busqueda && <span> para "{busqueda}"</span>}
            </p>
          </div>

          {/* Tabla/Lista de Pedidos */}
          <div className="bg-white rounded-xl shadow-soft overflow-hidden">
            {loading ? (
              <div className="p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy mx-auto" />
                <p className="text-gray-600 mt-4">Cargando pedidos...</p>
              </div>
            ) : pedidosFiltrados.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-600">No se encontraron pedidos</p>
              </div>
            ) : (
              <>
                {/* Vista Desktop - Tabla */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-navy text-white">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                          Pedido
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                          Cliente
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                          Fecha/Hora
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                          Items
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                          Entrega
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                          Estado
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pedidosFiltrados.map((pedido) => (
                        <tr 
                          key={pedido.id}
                          onClick={() => setSelectedPedido(pedido)}
                          className="hover:bg-blue-50 cursor-pointer transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-bold text-navy">
                              {pedido.numero_pedido || `#GRT-${pedido.id}`}
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
                            <div>
                              {new Date(pedido.created_at).toLocaleDateString('es-AR')}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(pedido.created_at).toLocaleTimeString('es-AR', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {pedido.items?.length || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-bold text-navy">
                              {formatCurrency(pedido.total)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {pedido.tipo_entrega === 'delivery' ? (
                              <Badge variant="default" className="bg-blue-100 text-blue-800">
                                <Truck className="w-3 h-3" />
                                Delivery
                              </Badge>
                            ) : (
                              <Badge variant="default" className="bg-green-100 text-green-800">
                                <Store className="w-3 h-3" />
                                Retiro
                              </Badge>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <OrderStatusBadge estado={pedido.estado} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Vista Mobile - Cards */}
                <div className="md:hidden divide-y divide-gray-200">
                  {pedidosFiltrados.map((pedido) => (
                    <div
                      key={pedido.id}
                      onClick={() => setSelectedPedido(pedido)}
                      className="p-4 hover:bg-blue-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-bold text-navy">
                            {pedido.numero_pedido || `#GRT-${pedido.id}`}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(pedido.created_at).toLocaleDateString('es-AR', {
                              day: '2-digit',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <OrderStatusBadge estado={pedido.estado} />
                      </div>

                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-600">Cliente: </span>
                          <span className="font-medium text-navy">{pedido.cliente_nombre}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-gray-600">Total: </span>
                            <span className="font-bold text-navy">{formatCurrency(pedido.total)}</span>
                          </div>
                          {pedido.tipo_entrega === 'delivery' ? (
                            <Badge variant="default" className="bg-blue-100 text-blue-800 text-xs">
                              <Truck className="w-3 h-3" />
                              Delivery
                            </Badge>
                          ) : (
                            <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
                              <Store className="w-3 h-3" />
                              Retiro
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Modal de Detalle */}
      {selectedPedido && (
        <OrderDetail
          pedido={selectedPedido}
          onClose={() => setSelectedPedido(null)}
          onUpdateEstado={handleUpdateEstado}
        />
      )}
    </div>
  )
}
