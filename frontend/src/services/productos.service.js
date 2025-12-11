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

