/**
 * Productos Service
 * Servicios para gestión de productos con Supabase
 */

import { supabase } from './supabase'

/**
 * Obtener todos los productos con su categoría
 * @param {Object} filters - Filtros opcionales
 * @param {string} filters.categoria - Filtrar por categoría
 * @param {boolean} filters.disponible - Solo disponibles
 * @returns {Promise<{data, error}>}
 */
export async function getProductos(filters = {}) {
  try {
    let query = supabase
      .from('productos')
      .select(`
        *,
        categoria:categorias(id, nombre)
      `)
      .order('created_at', { ascending: false })

    // Aplicar filtros
    if (filters.categoria) {
      query = query.eq('categoria.nombre', filters.categoria)
    }

    if (filters.disponible !== undefined) {
      query = query.eq('disponible', filters.disponible)
    }

    const { data, error } = await query

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Error al obtener productos:', error)
    return { data: null, error }
  }
}

/**
 * Obtener un producto por ID
 * @param {string|number} id - ID del producto
 * @returns {Promise<{data, error}>}
 */
export async function getProductoById(id) {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select(`
        *,
        categoria:categorias(id, nombre)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error al obtener producto:', error)
    return { data: null, error }
  }
}

/**
 * Obtener todas las categorías activas
 * @returns {Promise<{data, error}>}
 */
export async function getCategorias() {
  try {
    const { data, error } = await supabase
      .from('categorias')
      .select('*')
      .eq('activa', true)
      .order('orden', { ascending: true })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error al obtener categorías:', error)
    return { data: null, error }
  }
}

/**
 * Crear nuevo producto
 * @param {Object} productoData - Datos del producto
 * @returns {Promise<{data, error}>}
 */
export async function crearProducto(productoData) {
  try {
    const { data, error } = await supabase
      .from('productos')
      .insert([productoData])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error al crear producto:', error)
    return { data: null, error }
  }
}

/**
 * Actualizar producto existente
 * @param {string|number} id - ID del producto
 * @param {Object} productoData - Datos a actualizar
 * @returns {Promise<{data, error}>}
 */
export async function actualizarProducto(id, productoData) {
  try {
    const { data, error } = await supabase
      .from('productos')
      .update({
        ...productoData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error al actualizar producto:', error)
    return { data: null, error }
  }
}

/**
 * Eliminar producto (hard delete)
 * @param {string|number} id - ID del producto
 * @returns {Promise<{data, error}>}
 */
export async function eliminarProducto(id) {
  try {
    const { data, error } = await supabase
      .from('productos')
      .delete()
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error al eliminar producto:', error)
    return { data: null, error }
  }
}

/**
 * Subir imagen a Supabase Storage
 * @param {File} file - Archivo de imagen
 * @param {string|number} productoId - ID del producto
 * @returns {Promise<{url, error}>}
 */
export async function subirImagenProducto(file, productoId) {
  try {
    // Generar nombre único
    const fileExt = file.name.split('.').pop()
    const fileName = `${productoId}-${Date.now()}.${fileExt}`
    const filePath = `productos/${fileName}`

    // Subir a storage
    const { data, error } = await supabase.storage
      .from('imagenes')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    // Obtener URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('imagenes')
      .getPublicUrl(filePath)

    return { url: publicUrl, error: null }
  } catch (error) {
    console.error('Error al subir imagen:', error)
    return { url: null, error }
  }
}
