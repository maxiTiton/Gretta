/**
 * Pedidos Service
 * Servicios para gestión de pedidos con Supabase
 */

import { supabase } from './supabase'

/**
 * Crear un nuevo pedido con sus items
 * @param {Object} pedidoData - Datos del pedido
 * @param {Object} pedidoData.cliente - Datos del cliente (nombre, telefono, email)
 * @param {Array} pedidoData.items - Items del pedido
 * @param {string} pedidoData.tipoEntrega - 'retiro' | 'delivery'
 * @param {string} pedidoData.metodoPago - 'efectivo' | 'transferencia' | 'mercadopago'
 * @param {number} pedidoData.subtotal - Subtotal del pedido
 * @param {number} pedidoData.envio - Costo de envío
 * @param {number} pedidoData.total - Total del pedido
 * @returns {Promise<{data, error}>}
 */
export async function crearPedido(pedidoData) {
  try {
    // 1. Generar número de pedido único
    const numeroPedido = `GRT-${Date.now()}`

    // 2. Insertar pedido
    const { data: pedido, error: pedidoError } = await supabase
      .from('pedidos')
      .insert([
        {
          numero_pedido: numeroPedido,
          cliente_nombre: pedidoData.cliente.nombre,
          cliente_telefono: pedidoData.cliente.telefono,
          cliente_email: pedidoData.cliente.email || null,
          cliente_direccion: pedidoData.direccion || null,
          cliente_referencia: pedidoData.referencia || null,
          subtotal: pedidoData.subtotal,
          envio: pedidoData.envio,
          total: pedidoData.total,
          tipo_entrega: pedidoData.tipoEntrega,
          metodo_pago: pedidoData.metodoPago,
          notas: pedidoData.notas || null,
          estado: 'pendiente'
        }
      ])
      .select()
      .single()

    if (pedidoError) throw pedidoError

    // 3. Insertar items del pedido
    const itemsData = pedidoData.items.map(item => ({
      pedido_id: pedido.id,
      producto_id: item.productoId,
      producto_nombre: item.nombre,
      cantidad: item.cantidad,
      precio_unitario: item.precioUnitario,
      subtotal: item.cantidad * item.precioUnitario
    }))

    const { error: itemsError } = await supabase
      .from('items_pedido')
      .insert(itemsData)

    if (itemsError) throw itemsError

    console.log('✅ Pedido creado exitosamente:', numeroPedido)
    return { data: pedido, error: null }
  } catch (error) {
    console.error('❌ Error al crear pedido:', error)
    return { data: null, error }
  }
}

/**
 * Obtener un pedido por su número
 * @param {string} numeroPedido - Número del pedido (ej: GRT-1234567890)
 * @returns {Promise<{data, error}>}
 */
export async function getPedidoByNumero(numeroPedido) {
  try {
    const { data, error } = await supabase
      .from('pedidos')
      .select(`
        *,
        items:items_pedido(*)
      `)
      .eq('numero_pedido', numeroPedido)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('❌ Error al obtener pedido:', error)
    return { data: null, error }
  }
}

/**
 * Obtener todos los pedidos con filtros (para admin)
 * @param {Object} filters - Filtros opcionales
 * @param {string} filters.estado - Filtrar por estado
 * @returns {Promise<{data, error}>}
 */
export async function getPedidos(filters = {}) {
  try {
    let query = supabase
      .from('pedidos')
      .select(`
        *,
        items:items_pedido(*)
      `)
      .order('created_at', { ascending: false })

    if (filters.estado) {
      query = query.eq('estado', filters.estado)
    }

    const { data, error } = await query

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('❌ Error al obtener pedidos:', error)
    return { data: null, error }
  }
}

/**
 * Actualizar el estado de un pedido
 * @param {string|number} pedidoId - ID del pedido
 * @param {string} nuevoEstado - Nuevo estado ('pendiente', 'preparando', 'listo', 'entregado', 'cancelado')
 * @returns {Promise<{data, error}>}
 */
export async function actualizarEstadoPedido(pedidoId, nuevoEstado) {
  try {
    const { data, error } = await supabase
      .from('pedidos')
      .update({ 
        estado: nuevoEstado,
        updated_at: new Date().toISOString()
      })
      .eq('id', pedidoId)
      .select(`
        *,
        items:items_pedido(*)
      `)
      .single()

    if (error) throw error
    console.log('✅ Estado del pedido actualizado:', nuevoEstado)
    return { data, error: null }
  } catch (error) {
    console.error('❌ Error al actualizar estado:', error)
    return { data: null, error }
  }
}

/**
 * Actualizar el estado de un pedido (alias para compatibilidad)
 * @deprecated Usar actualizarEstadoPedido en su lugar
 */
export async function updatePedidoEstado(pedidoId, nuevoEstado) {
  return actualizarEstadoPedido(pedidoId, nuevoEstado)
}

