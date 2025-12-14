/**
 * Categorías Service
 * Servicios para gestión de categorías
 */

import { supabase } from './supabase'

/**
 * Obtener todas las categorías
 */
export async function getCategorias() {
  try {
    const { data, error } = await supabase
      .from('categorias')
      .select('*')
      .order('nombre', { ascending: true })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error al obtener categorías:', error)
    return { data: null, error }
  }
}

/**
 * Obtener categoría por ID
 */
export async function getCategoriaById(id) {
  try {
    const { data, error } = await supabase
      .from('categorias')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error al obtener categoría:', error)
    return { data: null, error }
  }
}
