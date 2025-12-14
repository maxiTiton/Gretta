import { useState, useEffect } from 'react'
import { Settings, Save, Loader2 } from 'lucide-react'
import { 
  getConfiguraciones, 
  actualizarConfiguraciones 
} from '@/services/configuracion.service'
import Sidebar from '@/components/admin/Sidebar'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Loading from '@/components/ui/Loading'

/**
 * ConfiguracionAdmin
 * Página de configuración del local en el panel admin
 */
export default function ConfiguracionAdmin() {
  const [config, setConfig] = useState({})
  const [loading, setLoading] = useState(true)
  const [guardando, setGuardando] = useState(false)

  useEffect(() => {
    cargarConfig()
  }, [])

  const cargarConfig = async () => {
    setLoading(true)
    const { data } = await getConfiguraciones()
    
    if (data) {
      // Convertir array a objeto { clave: valor }
      const configObj = data.reduce((acc, item) => {
        acc[item.clave] = item.valor
        return acc
      }, {})
      setConfig(configObj)
    }
    
    setLoading(false)
  }

  const handleChange = (clave, valor) => {
    setConfig(prev => ({ ...prev, [clave]: valor }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setGuardando(true)

    const { error } = await actualizarConfiguraciones(config)

    if (!error) {
      alert('Configuración guardada correctamente')
    } else {
      alert('Error al guardar configuración')
    }

    setGuardando(false)
  }

  const handleCancelar = () => {
    cargarConfig()
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
      
      <div className="flex-1 transition-all duration-300" style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
        <div className="p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-navy flex items-center gap-3">
                <Settings className="w-8 h-8" />
                Configuración
              </h1>
              <p className="text-gray-600 mt-2">
                Administrá la información y configuraciones del local
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Card 1 - Información del Local */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-navy mb-4">
                  Información del Local
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Nombre del Local"
                    value={config.local_nombre || ''}
                    onChange={(e) => handleChange('local_nombre', e.target.value)}
                  />
                  <Input
                    label="Dirección"
                    value={config.local_direccion || ''}
                    onChange={(e) => handleChange('local_direccion', e.target.value)}
                  />
                  <Input
                    label="Teléfono/WhatsApp"
                    type="tel"
                    value={config.local_telefono || ''}
                    onChange={(e) => handleChange('local_telefono', e.target.value)}
                    placeholder="+54 9 358 XXX-XXXX"
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={config.local_email || ''}
                    onChange={(e) => handleChange('local_email', e.target.value)}
                    placeholder="info@gretta.com"
                  />
                  <Input
                    label="Instagram (usuario)"
                    value={config.local_instagram || ''}
                    onChange={(e) => handleChange('local_instagram', e.target.value)}
                    placeholder="grettago_"
                  />
                </div>
              </div>

              {/* Card 2 - Horarios */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-navy mb-4">
                  Horarios de Atención
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Lunes a Viernes"
                    value={config.horario_lunes_viernes || ''}
                    onChange={(e) => handleChange('horario_lunes_viernes', e.target.value)}
                    placeholder="09:00 - 20:00"
                  />
                  <Input
                    label="Sábados"
                    value={config.horario_sabados || ''}
                    onChange={(e) => handleChange('horario_sabados', e.target.value)}
                    placeholder="10:00 - 20:00"
                  />
                  <Input
                    label="Domingos"
                    value={config.horario_domingos || ''}
                    onChange={(e) => handleChange('horario_domingos', e.target.value)}
                    placeholder="Cerrado"
                  />
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      💡 <strong>Nota:</strong> Los horarios en feriados pueden variar. 
                      Recordá actualizar tus redes sociales.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 - Delivery */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-navy mb-4">
                  Configuración de Delivery
                </h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.delivery_activo === 'true'}
                      onChange={(e) => handleChange('delivery_activo', e.target.checked ? 'true' : 'false')}
                      className="w-5 h-5 text-blue border-gray-300 rounded focus:ring-blue"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        Delivery habilitado
                      </span>
                      <p className="text-xs text-gray-600">
                        Los clientes podrán solicitar envío a domicilio
                      </p>
                    </div>
                  </label>

                  {config.delivery_activo === 'true' && (
                    <>
                      <Input
                        label="Costo de Envío ($)"
                        type="number"
                        step="0.01"
                        value={config.delivery_costo || ''}
                        onChange={(e) => handleChange('delivery_costo', e.target.value)}
                        placeholder="500"
                      />
                      <Input
                        label="Envío Gratis desde ($)"
                        type="number"
                        step="0.01"
                        value={config.delivery_gratis_desde || ''}
                        onChange={(e) => handleChange('delivery_gratis_desde', e.target.value)}
                        placeholder="5000"
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Zonas de Cobertura
                        </label>
                        <textarea
                          value={config.delivery_zonas || ''}
                          onChange={(e) => handleChange('delivery_zonas', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-transparent"
                          placeholder="Ej: Toda Río Cuarto, Banda Norte, Centro..."
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Card 4 - Pedidos */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-navy mb-4">
                  Configuración de Pedidos
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Pedido Mínimo ($)"
                    type="number"
                    step="0.01"
                    value={config.pedido_minimo || ''}
                    onChange={(e) => handleChange('pedido_minimo', e.target.value)}
                    placeholder="1000"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Métodos de Pago Aceptados
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.aceptar_efectivo === 'true'}
                          onChange={(e) => handleChange('aceptar_efectivo', e.target.checked ? 'true' : 'false')}
                          className="w-4 h-4 text-blue border-gray-300 rounded focus:ring-blue"
                        />
                        <span className="text-sm text-gray-700">Efectivo</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.aceptar_transferencia === 'true'}
                          onChange={(e) => handleChange('aceptar_transferencia', e.target.checked ? 'true' : 'false')}
                          className="w-4 h-4 text-blue border-gray-300 rounded focus:ring-blue"
                        />
                        <span className="text-sm text-gray-700">Transferencia Bancaria</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.aceptar_mercadopago === 'true'}
                          onChange={(e) => handleChange('aceptar_mercadopago', e.target.checked ? 'true' : 'false')}
                          className="w-4 h-4 text-blue border-gray-300 rounded focus:ring-blue"
                        />
                        <span className="text-sm text-gray-700">MercadoPago</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelar}
                  disabled={guardando}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={guardando}
                >
                  {guardando ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Cambios
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
