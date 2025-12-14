import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { 
  crearPromocion, 
  actualizarPromocion,
  subirImagenPromocion
} from '@/services/promociones.service'
import { getCategorias } from '@/services/categorias.service'
import { getProductos } from '@/services/productos.service'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

// Validación con Zod
const promoSchema = z.object({
  titulo: z.string().min(5, 'Mínimo 5 caracteres').max(200, 'Máximo 200 caracteres'),
  descripcion: z.string().optional(),
  tipo: z.enum(['2x1', '3x2', 'descuento_porcentaje', 'descuento_fijo', 'regalo']),
  valor: z.string().optional(),
  fecha_inicio: z.string().optional(),
  fecha_fin: z.string().optional(),
  terminos: z.string().optional(),
  activa: z.boolean()
}).refine((data) => {
  // Si es descuento, valor es requerido
  if (['descuento_porcentaje', 'descuento_fijo'].includes(data.tipo)) {
    return data.valor && !isNaN(parseFloat(data.valor)) && parseFloat(data.valor) > 0
  }
  return true
}, {
  message: 'El valor es requerido para descuentos',
  path: ['valor']
})

/**
 * PromocionForm
 * Formulario para crear/editar promociones
 */
export default function PromocionForm({ promocion, onSuccess, onCancel }) {
  const [imagenFile, setImagenFile] = useState(null)
  const [imagenPreview, setImagenPreview] = useState(promocion?.imagen_url || null)
  const [subiendoImagen, setSubiendoImagen] = useState(false)
  const [guardando, setGuardando] = useState(false)
  
  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])
  const [aplicaA, setAplicaA] = useState('todos') // 'todos', 'categoria', 'productos'
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(promocion?.categoria_aplicable || '')
  const [productosSeleccionados, setProductosSeleccionados] = useState(promocion?.productos_aplicables || [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm({
    resolver: zodResolver(promoSchema),
    defaultValues: {
      titulo: promocion?.titulo || '',
      descripcion: promocion?.descripcion || '',
      tipo: promocion?.tipo || '2x1',
      valor: promocion?.valor?.toString() || '',
      fecha_inicio: promocion?.fecha_inicio || '',
      fecha_fin: promocion?.fecha_fin || '',
      terminos: promocion?.terminos || '',
      activa: promocion?.activa ?? true
    }
  })

  const tipoSeleccionado = watch('tipo')

  useEffect(() => {
    cargarDatos()
    
    // Determinar aplicaA inicial
    if (promocion) {
      if (promocion.categoria_aplicable) {
        setAplicaA('categoria')
      } else if (promocion.productos_aplicables?.length > 0) {
        setAplicaA('productos')
      }
    }
  }, [])

  const cargarDatos = async () => {
    const { data: cats } = await getCategorias()
    if (cats) setCategorias(cats)
    
    const { data: prods } = await getProductos()
    if (prods) setProductos(prods)
  }

  const onSubmit = async (data) => {
    setGuardando(true)

    try {
      let imagenUrl = promocion?.imagen_url

      // Si hay nueva imagen, subirla primero
      if (imagenFile) {
        setSubiendoImagen(true)
        const tempId = promocion?.id || Date.now()
        const { url, error: uploadError } = await subirImagenPromocion(imagenFile, tempId)
        
        if (uploadError) {
          alert('Error al subir imagen')
          setGuardando(false)
          setSubiendoImagen(false)
          return
        }
        
        imagenUrl = url
        setSubiendoImagen(false)
      }

      // Preparar datos
      const promoData = {
        titulo: data.titulo,
        descripcion: data.descripcion || null,
        tipo: data.tipo,
        valor: data.valor ? parseFloat(data.valor) : null,
        imagen_url: imagenUrl,
        fecha_inicio: data.fecha_inicio || null,
        fecha_fin: data.fecha_fin || null,
        terminos: data.terminos || null,
        activa: data.activa,
        categoria_aplicable: aplicaA === 'categoria' ? categoriaSeleccionada : null,
        productos_aplicables: aplicaA === 'productos' ? productosSeleccionados : null
      }

      // Crear o actualizar
      const { error } = promocion
        ? await actualizarPromocion(promocion.id, promoData)
        : await crearPromocion(promoData)

      if (error) {
        console.error('Error al guardar:', error)
        alert('Error al guardar promoción: ' + (error.message || 'Error desconocido'))
      } else {
        alert(promocion ? 'Promoción actualizada correctamente' : 'Promoción creada correctamente')
        onSuccess()
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al guardar promoción')
    } finally {
      setGuardando(false)
      setSubiendoImagen(false)
    }
  }

  const handleImagenChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tamaño (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen debe ser menor a 5MB')
      return
    }

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      alert('El archivo debe ser una imagen')
      return
    }

    setImagenFile(file)
    
    // Preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagenPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoverImagen = () => {
    setImagenFile(null)
    setImagenPreview(promocion?.imagen_url || null)
  }

  const handleProductoToggle = (productoId) => {
    setProductosSeleccionados(prev => 
      prev.includes(productoId.toString())
        ? prev.filter(id => id !== productoId.toString())
        : [...prev, productoId.toString()]
    )
  }

  const mostrarCampoValor = ['descuento_porcentaje', 'descuento_fijo'].includes(tipoSeleccionado)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Columna Izquierda */}
        <div className="space-y-4">
          {/* Título */}
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
              Título *
            </label>
            <Input
              id="titulo"
              {...register('titulo')}
              placeholder="Ej: 3x2 en Helados"
              error={errors.titulo?.message}
            />
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              id="descripcion"
              {...register('descripcion')}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-transparent"
              placeholder="Descripción de la promoción..."
            />
          </div>

          {/* Tipo */}
          <div>
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Promoción *
            </label>
            <select
              id="tipo"
              {...register('tipo')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-transparent"
            >
              <option value="2x1">2x1</option>
              <option value="3x2">3x2</option>
              <option value="descuento_porcentaje">Descuento Porcentaje</option>
              <option value="descuento_fijo">Descuento Fijo $</option>
              <option value="regalo">Regalo</option>
            </select>
          </div>

          {/* Valor (solo para descuentos) */}
          {mostrarCampoValor && (
            <div>
              <label htmlFor="valor" className="block text-sm font-medium text-gray-700 mb-1">
                Valor {tipoSeleccionado === 'descuento_porcentaje' ? '(%)' : '($)'} *
              </label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                {...register('valor')}
                placeholder={tipoSeleccionado === 'descuento_porcentaje' ? '10' : '500'}
                error={errors.valor?.message}
              />
            </div>
          )}

          {/* Fechas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="fecha_inicio" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha Inicio
              </label>
              <Input
                id="fecha_inicio"
                type="date"
                {...register('fecha_inicio')}
              />
            </div>
            <div>
              <label htmlFor="fecha_fin" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha Fin
              </label>
              <Input
                id="fecha_fin"
                type="date"
                {...register('fecha_fin')}
              />
            </div>
          </div>

          {/* Términos */}
          <div>
            <label htmlFor="terminos" className="block text-sm font-medium text-gray-700 mb-1">
              Términos y Condiciones
            </label>
            <textarea
              id="terminos"
              {...register('terminos')}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-transparent"
              placeholder="Válido solo para... No acumulable con..."
            />
          </div>

          {/* Activa */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="activa"
              {...register('activa')}
              className="w-4 h-4 text-blue border-gray-300 rounded focus:ring-blue"
            />
            <label htmlFor="activa" className="text-sm font-medium text-gray-700">
              Promoción activa
            </label>
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="space-y-4">
          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen
            </label>
            
            {imagenPreview ? (
              <div className="relative">
                <img
                  src={imagenPreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleRemoverImagen}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 text-gray-400 mb-3" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click para subir</span> o arrastrá
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImagenChange}
                />
              </label>
            )}
          </div>

          {/* Aplicabilidad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aplica a
            </label>
            
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={aplicaA === 'todos'}
                  onChange={() => setAplicaA('todos')}
                  className="w-4 h-4 text-blue border-gray-300"
                />
                <span className="text-sm text-gray-700">Toda la tienda</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={aplicaA === 'categoria'}
                  onChange={() => setAplicaA('categoria')}
                  className="w-4 h-4 text-blue border-gray-300"
                />
                <span className="text-sm text-gray-700">Categoría específica</span>
              </label>

              {aplicaA === 'categoria' && (
                <select
                  value={categoriaSeleccionada}
                  onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-transparent ml-6"
                >
                  <option value="">Seleccionar categoría</option>
                  {categorias.map(cat => (
                    <option key={cat.id} value={cat.nombre}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              )}

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={aplicaA === 'productos'}
                  onChange={() => setAplicaA('productos')}
                  className="w-4 h-4 text-blue border-gray-300"
                />
                <span className="text-sm text-gray-700">Productos específicos</span>
              </label>

              {aplicaA === 'productos' && (
                <div className="ml-6 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3 space-y-2">
                  {productos.map(prod => (
                    <label key={prod.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={productosSeleccionados.includes(prod.id.toString())}
                        onChange={() => handleProductoToggle(prod.id)}
                        className="w-4 h-4 text-blue border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{prod.nombre}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={guardando}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={guardando || subiendoImagen}
        >
          {guardando || subiendoImagen ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              {subiendoImagen ? 'Subiendo imagen...' : 'Guardando...'}
            </>
          ) : (
            promocion ? 'Actualizar' : 'Crear Promoción'
          )}
        </Button>
      </div>
    </form>
  )
}
