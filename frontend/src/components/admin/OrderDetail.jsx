import { X, User, Phone, Mail, MapPin, Package as PackageIcon, DollarSign, Truck, Store, CreditCard, MessageSquare, Clock, ChefHat, CheckCircle, Ban } from 'lucide-react'
import { useState } from 'react'
import OrderStatusBadge from './OrderStatusBadge'
import Button from '../ui/Button'
import { formatCurrency } from '@/utils/formatters'
import { actualizarEstadoPedido } from '@/services/pedidos.service'

/**
 * OrderDetail Component
 * Modal con detalle completo del pedido y cambio de estados
 */

export default function OrderDetail({ pedido, onClose, onUpdateEstado }) {
  const [loading, setLoading] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  if (!pedido) return null

  const handleUpdateEstado = async (nuevoEstado) => {
    // Confirmación para cancelar
    if (nuevoEstado === 'cancelado' && !showCancelConfirm) {
      setShowCancelConfirm(true)
      return
    }

    setLoading(true)
    try {
      const { data, error } = await actualizarEstadoPedido(pedido.id, nuevoEstado)
      
      if (error) {
        alert('Error al actualizar el estado del pedido')
        console.error(error)
      } else {
        onUpdateEstado?.(data)
        if (nuevoEstado !== 'cancelado') {
          onClose()
        }
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al actualizar el estado')
    } finally {
      setLoading(false)
      setShowCancelConfirm(false)
    }
  }

  const getNextAction = () => {
    switch (pedido.estado) {
      case 'pendiente':
        return {
          label: 'Marcar como En Preparación',
          estado: 'preparando',
          icon: ChefHat,
          color: 'bg-blue hover:bg-blue-600'
        }
      case 'preparando':
        return {
          label: 'Marcar como Listo',
          estado: 'listo',
          icon: CheckCircle,
          color: 'bg-green-600 hover:bg-green-700'
        }
      case 'listo':
        return {
          label: 'Marcar como Entregado',
          estado: 'entregado',
          icon: Truck,
          color: 'bg-gray-600 hover:bg-gray-700'
        }
      default:
        return null
    }
  }

  const nextAction = getNextAction()

  return (
    <>
      {/* Overlay */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50 animate-fadeIn"
      />

      {/* Modal */}
      <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl z-50 overflow-y-auto animate-slideInRight">
        {/* Header */}
        <div className="sticky top-0 bg-navy text-white p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold">
              {pedido.numero_pedido || `#GRT-${pedido.id}`}
            </h2>
            <p className="text-sm text-gray-300 mt-1">
              {new Date(pedido.created_at).toLocaleString('es-AR', {
                dateStyle: 'long',
                timeStyle: 'short'
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <OrderStatusBadge estado={pedido.estado} />
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Sección Cliente */}
          <section className="bg-cream rounded-xl p-6">
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Información del Cliente
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Nombre</p>
                  <p className="font-medium text-navy">{pedido.cliente_nombre}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Teléfono</p>
                  <a 
                    href={`tel:${pedido.cliente_telefono}`}
                    className="font-medium text-blue hover:underline"
                  >
                    {pedido.cliente_telefono}
                  </a>
                </div>
              </div>
              {pedido.cliente_email && (
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <a 
                      href={`mailto:${pedido.cliente_email}`}
                      className="font-medium text-blue hover:underline"
                    >
                      {pedido.cliente_email}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Sección Entrega */}
          <section className="bg-cream rounded-xl p-6">
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
              {pedido.tipo_entrega === 'delivery' ? (
                <Truck className="w-5 h-5" />
              ) : (
                <Store className="w-5 h-5" />
              )}
              Información de Entrega
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <PackageIcon className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Tipo de Entrega</p>
                  <p className="font-medium text-navy capitalize">
                    {pedido.tipo_entrega === 'delivery' ? 'Delivery' : 'Retiro en Local'}
                  </p>
                </div>
              </div>

              {pedido.tipo_entrega === 'delivery' && (
                <>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Dirección</p>
                      <p className="font-medium text-navy">{pedido.direccion_entrega}</p>
                      {pedido.referencia_entrega && (
                        <p className="text-sm text-gray-600 mt-1">
                          Ref: {pedido.referencia_entrega}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Método de Pago</p>
                  <p className="font-medium text-navy capitalize">
                    {pedido.metodo_pago === 'efectivo' ? 'Efectivo' : pedido.metodo_pago}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sección Productos */}
          <section className="bg-cream rounded-xl p-6">
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
              <PackageIcon className="w-5 h-5" />
              Productos ({pedido.items?.length || 0})
            </h3>
            <div className="space-y-3">
              {pedido.items?.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between bg-white rounded-lg p-4"
                >
                  <div className="flex-1">
                    <p className="font-medium text-navy">{item.nombre}</p>
                    <p className="text-sm text-gray-600">
                      {item.cantidad} × {formatCurrency(item.precio_unitario)}
                    </p>
                  </div>
                  <p className="font-bold text-navy">
                    {formatCurrency(item.cantidad * item.precio_unitario)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Sección Totales */}
          <section className="bg-cream rounded-xl p-6">
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Resumen de Pago
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatCurrency(pedido.subtotal || 0)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span>{formatCurrency(pedido.costo_envio || 0)}</span>
              </div>
              <div className="h-px bg-gray-300 my-3" />
              <div className="flex justify-between text-xl font-bold text-navy">
                <span>Total</span>
                <span>{formatCurrency(pedido.total)}</span>
              </div>
            </div>
          </section>

          {/* Sección Notas */}
          {pedido.notas && (
            <section className="bg-cream rounded-xl p-6">
              <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Notas del Cliente
              </h3>
              <p className="text-gray-700 whitespace-pre-wrap">{pedido.notas}</p>
            </section>
          )}

          {/* Acciones */}
          {pedido.estado !== 'entregado' && pedido.estado !== 'cancelado' && (
            <section className="space-y-3">
              {!showCancelConfirm && nextAction && (
                <Button
                  onClick={() => handleUpdateEstado(nextAction.estado)}
                  disabled={loading}
                  leftIcon={<nextAction.icon className="w-5 h-5" />}
                  className={`w-full ${nextAction.color} text-white py-4 text-lg font-medium`}
                >
                  {loading ? 'Actualizando...' : nextAction.label}
                </Button>
              )}

              {!showCancelConfirm ? (
                <Button
                  onClick={() => setShowCancelConfirm(true)}
                  variant="outline"
                  leftIcon={<Ban className="w-5 h-5" />}
                  className="w-full border-red-300 text-red-600 hover:bg-red-50"
                >
                  Cancelar Pedido
                </Button>
              ) : (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 space-y-3">
                  <p className="text-red-800 font-medium text-center">
                    ¿Estás seguro de cancelar este pedido?
                  </p>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setShowCancelConfirm(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      No, volver
                    </Button>
                    <Button
                      onClick={() => handleUpdateEstado('cancelado')}
                      disabled={loading}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    >
                      Sí, cancelar
                    </Button>
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </>
  )
}
