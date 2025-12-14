/**
 * Configuración Service
 * Servicios para gestionar configuración del sistema
 */

import { supabase } from './supabase'

/**
 * Obtener todas las configuraciones
 */
export async function getConfiguraciones() {
  try {
    const { data, error } = await supabase
      .from('configuracion')
      .select('*')
      .order('clave', { ascending: true })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error al obtener configuraciones:', error)
    return { data: null, error }
  }
}

/**
 * Obtener una configuración específica por clave
 */
export async function getConfiguracion(clave) {
  try {
    const { data, error } = await supabase
      .from('configuracion')
      .select('valor')
      .eq('clave', clave)
      .single()

    if (error) throw error
    return { data: data?.valor, error: null }
  } catch (error) {
    console.error(`Error al obtener configuración ${clave}:`, error)
    return { data: null, error }
  }
}

/**
 * Actualizar configuraciones (recibe objeto con clave-valor)
 */
export async function actualizarConfiguraciones(configuraciones) {
  try {
    // Convertir objeto a array de updates
    const updates = Object.entries(configuraciones).map(([clave, valor]) => ({
      clave,
      valor: String(valor),
      updated_at: new Date().toISOString()
    }))

    // Actualizar cada configuración
    const promises = updates.map(config =>
      supabase
        .from('configuracion')
        .update({ 
          valor: config.valor, 
          updated_at: config.updated_at 
        })
        .eq('clave', config.clave)
    )

    const results = await Promise.all(promises)
    
    // Verificar si hubo errores
    const errors = results.filter(r => r.error)
    if (errors.length > 0) {
      throw new Error('Error al actualizar algunas configuraciones')
    }

    return { data: true, error: null }
  } catch (error) {
    console.error('Error al actualizar configuraciones:', error)
    return { data: null, error }
  }
}

/**
 * Actualizar una configuración específica
 */
export async function actualizarConfiguracion(clave, valor) {
  try {
    const { data, error } = await supabase
      .from('configuracion')
      .update({ 
        valor: String(valor),
        updated_at: new Date().toISOString()
      })
      .eq('clave', clave)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error(`Error al actualizar configuración ${clave}:`, error)
    return { data: null, error }
  }
}
