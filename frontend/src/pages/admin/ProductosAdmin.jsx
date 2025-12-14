import { useState, useEffect } from 'react'
import { Package, Plus, Search, Filter, Eye, EyeOff, Edit2, Trash2 } from 'lucide-react'
import { getProductos, getCategorias, eliminarProducto } from '@/services/productos.service'
import ProductForm from '@/components/admin/ProductForm'
import Sidebar from '@/components/admin/Sidebar'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Loading from '@/components/ui/Loading'

/**
 * ProductosAdmin
 * Página de gestión de productos en el panel admin
 */
export default function ProductosAdmin() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Filtros
  const [filtroCategoria, setFiltroCategoria] = useState('todos')
  const [soloDisponibles, setSoloDisponibles] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  
  // Modal
  const [modalAbierto, setModalAbierto] = useState(false)
  const [productoEditar, setProductoEditar] = useState(null)

  useEffect(() => {
    cargarDatos()
  }, [soloDisponibles])

  const cargarDatos = async () => {
    setLoading(true)
    
    // Cargar productos
    const filters = {}
    if (soloDisponibles) filters.disponible = true
    
    const { data: prods } = await getProductos(filters)
    if (prods) setProductos(prods)
    
    // Cargar categorías
    const { data: cats } = await getCategorias()
    if (cats) setCategorias(cats)
    
    setLoading(false)
  }

  const handleNuevoProducto = () => {
    setProductoEditar(null)
    setModalAbierto(true)
  }

  const handleEditarProducto = (producto) => {
    setProductoEditar(producto)
    setModalAbierto(true)
  }

  const handleEliminarProducto = async (id, nombre) => {
    if (!window.confirm(`¿Estás seguro de eliminar "${nombre}"?`)) return
    
    const { error } = await eliminarProducto(id)
    
    if (!error) {
      alert('Producto eliminado correctamente')
      cargarDatos()
    } else {
      alert('Error al eliminar producto')
    }
  }

  const handleGuardado = () => {
    setModalAbierto(false)
    setProductoEditar(null)
    cargarDatos()
  }

  // Filtrado local
  const productosFiltrados = productos
    .filter(p => 
      filtroCategoria === 'todos' || 
      p.categoria?.id === parseInt(filtroCategoria)
    )
    .filter(p => 
      !busqueda || 
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    )

  // Stats
  const stats = {
    total: productos.length,
    activos: productos.filter(p => p.disponible).length,
    agotados: productos.filter(p => !p.disponible).length
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center transition-all duration-300" style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
          <Loading size="lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 transition-all duration-300" style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-sans font-bold text-navy mb-2 flex items-center gap-3">
              <Package className="w-8 h-8" />
              Gestión de Productos
            </h1>
            <p className="text-gray-600">
              Administrá el catálogo completo de productos
            </p>
          </div>
          <Button
            onClick={handleNuevoProducto}
            className="bg-blue hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nuevo Producto
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Productos</p>
                <p className="text-3xl font-bold text-navy">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-blue" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Activos</p>
                <p className="text-3xl font-bold text-green-600">{stats.activos}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Agotados</p>
                <p className="text-3xl font-bold text-red-600">{stats.agotados}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <EyeOff className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-soft p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar producto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue"
              />
            </div>

            {/* Filtro Categoría */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue appearance-none"
              >
                <option value="todos">Todas las categorías</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Toggle Solo Disponibles */}
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={soloDisponibles}
                  onChange={(e) => setSoloDisponibles(e.target.checked)}
                  className="w-5 h-5 text-blue border-gray-300 rounded focus:ring-blue"
                />
                <span className="ml-2 text-gray-700">Solo disponibles</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Productos - Desktop */}
      <div className="hidden lg:block bg-white rounded-xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destacados
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No se encontraron productos
                  </td>
                </tr>
              ) : (
                productosFiltrados.map((producto) => (
                  <tr key={producto.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0">
                          {producto.imagen_url ? (
                            <img
                              src={producto.imagen_url}
                              alt={producto.nombre}
                              className="h-12 w-12 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                              <Package className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {producto.nombre}
                          </div>
                          {producto.descripcion && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {producto.descripcion}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="default">
                        {producto.categoria?.nombre || 'Sin categoría'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${producto.precio?.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={producto.disponible ? 'success' : 'error'}>
                        {producto.disponible ? 'Disponible' : 'Agotado'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        {producto.destacado && (
                          <Badge variant="warning">Destacado</Badge>
                        )}
                        {producto.mas_vendido && (
                          <Badge variant="info">Más vendido</Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditarProducto(producto)}
                          className="text-blue hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEliminarProducto(producto.id, producto.nombre)}
                          className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cards - Mobile */}
      <div className="lg:hidden space-y-4">
        {productosFiltrados.length === 0 ? (
          <div className="bg-white rounded-xl shadow-soft p-8 text-center text-gray-500">
            No se encontraron productos
          </div>
        ) : (
          productosFiltrados.map((producto) => (
            <div key={producto.id} className="bg-white rounded-xl shadow-soft p-4">
              <div className="flex gap-4">
                {/* Imagen */}
                <div className="flex-shrink-0">
                  {producto.imagen_url ? (
                    <img
                      src={producto.imagen_url}
                      alt={producto.nombre}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="h-20 w-20 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-navy mb-1 truncate">
                    {producto.nombre}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {producto.categoria?.nombre}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant={producto.disponible ? 'success' : 'error'}>
                      {producto.disponible ? 'Disponible' : 'Agotado'}
                    </Badge>
                    {producto.destacado && (
                      <Badge variant="warning">Destacado</Badge>
                    )}
                    {producto.mas_vendido && (
                      <Badge variant="info">Más vendido</Badge>
                    )}
                  </div>
                  <p className="text-lg font-bold text-navy">
                    ${producto.precio?.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                <Button
                  onClick={() => handleEditarProducto(producto)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button
                  onClick={() => handleEliminarProducto(producto.id, producto.nombre)}
                  variant="outline"
                  size="sm"
                  className="flex-1 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Formulario */}
      <Modal
        isOpen={modalAbierto}
        onClose={() => {
          setModalAbierto(false)
          setProductoEditar(null)
        }}
        title={productoEditar ? 'Editar Producto' : 'Nuevo Producto'}
        size="xl"
      >
        <ProductForm
          producto={productoEditar}
          categorias={categorias}
          onSuccess={handleGuardado}
          onCancel={() => {
            setModalAbierto(false)
            setProductoEditar(null)
          }}
        />
      </Modal>
      </div>
    </div>
  )
}
