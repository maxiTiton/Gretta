/**
 * Promociones Service
 * Servicios para gestión de promociones
 */

import { supabase } from './supabase'

/**
 * Obtener todas las promociones
 */
export async function getPromociones(filtros = {}) {
  try {
    let query = supabase
      .from('promociones')
      .select('*')
      .order('created_at', { ascending: false })

    if (filtros.activa !== undefined) {
      query = query.eq('activa', filtros.activa)
    }

    const { data, error } = await query

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error al obtener promociones:', error)
    return { data: null, error }
  }
}

/**
 * Obtener promo por ID
 */
export async function getPromocionById(id) {
  try {
    const { data, error } = await supabase
      .from('promociones')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error al obtener promoción:', error)
    return { data: null, error }
  }
}

/**
 * Crear promoción
 */
export async function crearPromocion(promoData) {
  try {
    const { data, error } = await supabase
      .from('promociones')
      .insert([promoData])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error al crear promoción:', error)
    return { data: null, error }
  }
}

/**
 * Actualizar promoción
 */
export async function actualizarPromocion(id, promoData) {
  try {
    const { data, error } = await supabase
      .from('promociones')
      .update({
        ...promoData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error al actualizar promoción:', error)
    return { data: null, error }
  }
}

/**
 * Eliminar promoción
 */
export async function eliminarPromocion(id) {
  try {
    const { data, error } = await supabase
      .from('promociones')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error al eliminar promoción:', error)
    return { data: null, error }
  }
}

/**
 * Activar/Desactivar promoción
 */
export async function togglePromocion(id, activa) {
  try {
    const { data, error } = await supabase
      .from('promociones')
      .update({ 
        activa,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error al toggle promoción:', error)
    return { data: null, error }
  }
}

/**
 * Subir imagen de promoción
 */
export async function subirImagenPromocion(file, promoId) {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `promo_${promoId}_${Date.now()}.${fileExt}`
    const filePath = `promociones/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('imagenes')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      })

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('imagenes')
      .getPublicUrl(filePath)

    return { url: publicUrl, error: null }
  } catch (error) {
    console.error('Error al subir imagen:', error)
    return { url: null, error }
  }
}
