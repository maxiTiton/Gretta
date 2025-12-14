import { useState, useEffect } from 'react'
import { 
  Tag, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar,
  AlertCircle
} from 'lucide-react'
import { 
  getPromociones, 
  eliminarPromocion, 
  togglePromocion 
} from '@/services/promociones.service'
import PromocionForm from '@/components/admin/PromocionForm'
import Sidebar from '@/components/admin/Sidebar'
import Modal from '@/components/ui/Modal'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Loading from '@/components/ui/Loading'
import StatsCard from '@/components/admin/StatsCard'

/**
 * PromocionesAdmin
 * Página de gestión de promociones en el panel admin
 */
export default function PromocionesAdmin() {
  const [promociones, setPromociones] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [soloActivas, setSoloActivas] = useState(false)
  const [modalAbierto, setModalAbierto] = useState(false)
  const [promoEditar, setPromoEditar] = useState(null)

  useEffect(() => {
    cargarPromociones()
  }, [soloActivas])

  const cargarPromociones = async () => {
    setLoading(true)
    setError(null)
    const filtros = soloActivas ? { activa: true } : {}
    const { data, error: err } = await getPromociones(filtros)
    
    if (err) {
      console.error('Error cargando promociones:', err)
      setError(err.message || 'Error al cargar promociones')
    } else if (data) {
      setPromociones(data)
    }
    
    setLoading(false)
  }

  const handleNuevaPromo = () => {
    setPromoEditar(null)
    setModalAbierto(true)
  }

  const handleEditarPromo = (promo) => {
    setPromoEditar(promo)
    setModalAbierto(true)
  }

  const handleEliminarPromo = async (id, titulo) => {
    if (!window.confirm(`¿Eliminar la promoción "${titulo}"?`)) return
    
    const { error } = await eliminarPromocion(id)
    if (!error) {
      alert('Promoción eliminada')
      cargarPromociones()
    } else {
      alert('Error al eliminar promoción')
    }
  }

  const handleToggleActiva = async (id, activa) => {
    const { error } = await togglePromocion(id, !activa)
    if (!error) {
      cargarPromociones()
    } else {
      alert('Error al actualizar estado')
    }
  }

  const handleGuardado = () => {
    setModalAbierto(false)
    setPromoEditar(null)
    cargarPromociones()
  }

  const getTipoBadge = (tipo) => {
    const tipos = {
      '2x1': { color: 'bg-blue-100 text-blue-800', label: '2x1' },
      '3x2': { color: 'bg-green-100 text-green-800', label: '3x2' },
      'descuento_porcentaje': { color: 'bg-pink-100 text-pink-800', label: '% OFF' },
      'descuento_fijo': { color: 'bg-orange-100 text-orange-800', label: '$ OFF' },
      'regalo': { color: 'bg-purple-100 text-purple-800', label: 'Regalo' }
    }
    return tipos[tipo] || { color: 'bg-gray-100 text-gray-800', label: tipo }
  }

  const esProximaAVencer = (fechaFin) => {
    if (!fechaFin) return false
    const fin = new Date(fechaFin)
    const hoy = new Date()
    const diasRestantes = Math.ceil((fin - hoy) / (1000 * 60 * 60 * 24))
    return diasRestantes <= 7 && diasRestantes > 0
  }

  const estaVencida = (fechaFin) => {
    if (!fechaFin) return false
    return new Date(fechaFin) < new Date()
  }

  // Stats
  const stats = {
    total: promociones.length,
    activas: promociones.filter(p => p.activa).length,
    proximasVencer: promociones.filter(p => esProximaAVencer(p.fecha_fin)).length
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

  // Mostrar error si hay problema con la BD
  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 transition-all duration-300" style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
          <div className="p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-red-900 mb-2">
                      Error al cargar promociones
                    </h3>
                    <p className="text-red-700 mb-4">
                      {error}
                    </p>
                    <div className="bg-red-100 p-4 rounded-lg mb-4">
                      <p className="text-sm text-red-900 font-medium mb-2">
                        ¿Ejecutaste el SQL en Supabase?
                      </p>
                      <p className="text-sm text-red-800">
                        Necesitás crear la tabla <code className="bg-red-200 px-2 py-1 rounded">promociones</code> en Supabase SQL Editor.
                      </p>
                    </div>
                    <Button onClick={cargarPromociones} variant="outline">
                      Reintentar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 transition-all duration-300" style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-navy flex items-center gap-3">
                  <Tag className="w-8 h-8" />
                  Gestión de Promociones
                </h1>
                <p className="text-gray-600 mt-2">
                  Administrá las ofertas y promociones especiales
                </p>
              </div>
              <Button onClick={handleNuevaPromo} variant="primary">
                <Plus className="w-5 h-5 mr-2" />
                Nueva Promoción
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <StatsCard
                title="Total Promociones"
                value={stats.total}
                icon={Tag}
                color="blue"
              />
              <StatsCard
                title="Activas"
                value={stats.activas}
                icon={Tag}
                color="green"
              />
              <StatsCard
                title="Próximas a vencer"
                value={stats.proximasVencer}
                icon={Calendar}
                color="orange"
              />
            </div>

            {/* Filtros */}
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={soloActivas}
                  onChange={(e) => setSoloActivas(e.target.checked)}
                  className="w-4 h-4 text-blue border-gray-300 rounded focus:ring-blue"
                />
                <span className="text-sm text-gray-700">Solo activas</span>
              </label>
            </div>
          </div>

          {/* Lista de Promociones */}
          {promociones.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No hay promociones
              </h3>
              <p className="text-gray-600 mb-6">
                {soloActivas 
                  ? 'No hay promociones activas en este momento'
                  : 'Comenzá creando tu primera promoción'
                }
              </p>
              {!soloActivas && (
                <Button onClick={handleNuevaPromo} variant="primary">
                  <Plus className="w-5 h-5 mr-2" />
                  Nueva Promoción
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {promociones.map((promo) => {
                const tipoBadge = getTipoBadge(promo.tipo)
                const vencida = estaVencida(promo.fecha_fin)
                const proximaVencer = esProximaAVencer(promo.fecha_fin)

                return (
                  <div
                    key={promo.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={promo.activa ? 'success' : 'secondary'}>
                              {promo.activa ? 'Activa' : 'Inactiva'}
                            </Badge>
                            <Badge className={tipoBadge.color}>
                              {tipoBadge.label}
                            </Badge>
                            {vencida && (
                              <Badge variant="danger">Vencida</Badge>
                            )}
                            {proximaVencer && !vencida && (
                              <Badge variant="warning">Por vencer</Badge>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-navy">
                            {promo.titulo}
                          </h3>
                        </div>
                      </div>

                      {/* Descripción */}
                      {promo.descripcion && (
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {promo.descripcion}
                        </p>
                      )}

                      {/* Valor */}
                      {promo.valor && (
                        <div className="mb-4">
                          <span className="text-2xl font-bold text-blue">
                            {promo.tipo === 'descuento_porcentaje' && `${promo.valor}% OFF`}
                            {promo.tipo === 'descuento_fijo' && `$${promo.valor} OFF`}
                          </span>
                        </div>
                      )}

                      {/* Vigencia */}
                      {(promo.fecha_inicio || promo.fecha_fin) && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {promo.fecha_inicio && new Date(promo.fecha_inicio).toLocaleDateString('es-AR')}
                            {' - '}
                            {promo.fecha_fin ? new Date(promo.fecha_fin).toLocaleDateString('es-AR') : 'Sin fin'}
                          </span>
                        </div>
                      )}

                      {/* Aplicabilidad */}
                      {promo.categoria_aplicable && (
                        <div className="text-sm text-gray-600 mb-4">
                          <span className="font-medium">Categoría:</span> {promo.categoria_aplicable}
                        </div>
                      )}

                      {/* Acciones */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={promo.activa}
                            onChange={() => handleToggleActiva(promo.id, promo.activa)}
                            className="w-4 h-4 text-blue border-gray-300 rounded focus:ring-blue"
                          />
                          <span className="text-sm text-gray-700">
                            {promo.activa ? 'Desactivar' : 'Activar'}
                          </span>
                        </label>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditarPromo(promo)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEliminarPromo(promo.id, promo.titulo)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modal Formulario */}
      <Modal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        title={promoEditar ? 'Editar Promoción' : 'Nueva Promoción'}
        size="xl"
      >
        <PromocionForm
          promocion={promoEditar}
          onSuccess={handleGuardado}
          onCancel={() => setModalAbierto(false)}
        />
      </Modal>
    </div>
  )
}
