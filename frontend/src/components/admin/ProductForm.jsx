import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { crearProducto, actualizarProducto, subirImagenProducto } from '@/services/productos.service'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

// Validación con Zod
const productoSchema = z.object({
  nombre: z.string().min(3, 'Mínimo 3 caracteres').max(200, 'Máximo 200 caracteres'),
  descripcion: z.string().optional(),
  precio: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
    message: 'El precio debe ser un número positivo'
  }),
  categoria_id: z.string().refine(val => !isNaN(parseInt(val)) && parseInt(val) > 0, {
    message: 'Seleccioná una categoría'
  }),
  disponible: z.boolean(),
  destacado: z.boolean(),
  mas_vendido: z.boolean()
})

/**
 * ProductForm
 * Formulario para crear/editar productos
 */
export default function ProductForm({ producto, categorias, onSuccess, onCancel }) {
  const [imagenFile, setImagenFile] = useState(null)
  const [imagenPreview, setImagenPreview] = useState(producto?.imagen_url || null)
  const [subiendoImagen, setSubiendoImagen] = useState(false)
  const [guardando, setGuardando] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(productoSchema),
    defaultValues: {
      nombre: producto?.nombre || '',
      descripcion: producto?.descripcion || '',
      precio: producto?.precio?.toString() || '',
      categoria_id: producto?.categoria_id?.toString() || '',
      disponible: producto?.disponible ?? true,
      destacado: producto?.destacado ?? false,
      mas_vendido: producto?.mas_vendido ?? false
    }
  })

  const onSubmit = async (data) => {
    setGuardando(true)

    try {
      let imagenUrl = producto?.imagen_url

      // Si hay nueva imagen, subirla primero
      if (imagenFile) {
        setSubiendoImagen(true)
        const tempId = producto?.id || Date.now()
        const { url, error: uploadError } = await subirImagenProducto(imagenFile, tempId)
        
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
      const productoData = {
        nombre: data.nombre,
        descripcion: data.descripcion || null,
        precio: parseFloat(data.precio),
        categoria_id: parseInt(data.categoria_id),
        imagen_url: imagenUrl,
        disponible: data.disponible,
        destacado: data.destacado,
        mas_vendido: data.mas_vendido
      }

      // Crear o actualizar
      const { error } = producto
        ? await actualizarProducto(producto.id, productoData)
        : await crearProducto(productoData)

      if (error) {
        console.error('Error al guardar:', error)
        alert('Error al guardar producto: ' + (error.message || 'Error desconocido'))
      } else {
        alert(producto ? 'Producto actualizado correctamente' : 'Producto creado correctamente')
        onSuccess()
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al guardar producto')
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
    setImagenPreview(producto?.imagen_url || null)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Columna Izquierda - Datos del Producto */}
        <div className="space-y-4">
          {/* Nombre */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Producto *
            </label>
            <Input
              id="nombre"
              type="text"
              {...register('nombre')}
              placeholder="Ej: Cookie de Chocolate"
              error={errors.nombre?.message}
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
              placeholder="Descripción del producto..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue"
            />
          </div>

          {/* Precio */}
          <div>
            <label htmlFor="precio" className="block text-sm font-medium text-gray-700 mb-1">
              Precio *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <Input
                id="precio"
                type="number"
                step="0.01"
                {...register('precio')}
                placeholder="0.00"
                className="pl-8"
                error={errors.precio?.message}
              />
            </div>
          </div>

          {/* Categoría */}
          <div>
            <label htmlFor="categoria_id" className="block text-sm font-medium text-gray-700 mb-1">
              Categoría *
            </label>
            <select
              id="categoria_id"
              {...register('categoria_id')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue"
            >
              <option value="">Seleccionar categoría</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
            {errors.categoria_id && (
              <p className="mt-1 text-sm text-red-600">{errors.categoria_id.message}</p>
            )}
          </div>
        </div>

        {/* Columna Derecha - Imagen y Opciones */}
        <div className="space-y-4">
          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen del Producto
            </label>
            
            {/* Preview */}
            <div className="mb-3">
              {imagenPreview ? (
                <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={imagenPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  {imagenFile && (
                    <button
                      type="button"
                      onClick={handleRemoverImagen}
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Sin imagen</p>
                  </div>
                </div>
              )}
            </div>

            {/* Upload Button */}
            <label className="block">
              <input
                type="file"
                accept="image/*"
                onChange={handleImagenChange}
                className="hidden"
              />
              <div className="w-full px-4 py-2 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-50 hover:border-blue transition-colors">
                <Upload className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                <span className="text-sm text-gray-600">
                  {imagenFile ? 'Cambiar imagen' : 'Subir imagen'}
                </span>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG hasta 5MB
                </p>
              </div>
            </label>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            {/* Disponible */}
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                {...register('disponible')}
                className="w-5 h-5 text-blue border-gray-300 rounded focus:ring-blue"
              />
              <span className="ml-2 text-sm text-gray-700">
                Disponible para la venta
              </span>
            </label>

            {/* Destacado */}
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                {...register('destacado')}
                className="w-5 h-5 text-blue border-gray-300 rounded focus:ring-blue"
              />
              <span className="ml-2 text-sm text-gray-700">
                Producto destacado
              </span>
            </label>

            {/* Más Vendido */}
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                {...register('mas_vendido')}
                className="w-5 h-5 text-blue border-gray-300 rounded focus:ring-blue"
              />
              <span className="ml-2 text-sm text-gray-700">
                Más vendido
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex gap-3 pt-6 border-t border-gray-200">
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          className="flex-1"
          disabled={guardando || subiendoImagen}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-blue hover:bg-blue-700"
          disabled={guardando || subiendoImagen}
        >
          {guardando || subiendoImagen ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              {subiendoImagen ? 'Subiendo imagen...' : 'Guardando...'}
            </>
          ) : (
            producto ? 'Actualizar Producto' : 'Crear Producto'
          )}
        </Button>
      </div>
    </form>
  )
}
