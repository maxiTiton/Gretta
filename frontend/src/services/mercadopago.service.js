/**
 * MercadoPago Service
 * Servicios para integración con MercadoPago
 */

import { supabase } from './supabase'

/**
 * Crear preferencia de pago en MercadoPago
 * NOTA: Esta llamada se hace directamente desde el frontend SOLO para desarrollo
 * En producción DEBE hacerse desde el backend para proteger el ACCESS_TOKEN
 * 
 * @param {Object} pedidoData - Datos del pedido
 * @returns {Promise<{preferenceId, error}>}
 */
export async function crearPreferenciaPago(pedidoData) {
  try {
    // ⚠️ ADVERTENCIA: Nunca expongas tu ACCESS_TOKEN en el frontend en producción
    // Este es solo para desarrollo/pruebas
    const accessToken = import.meta.env.VITE_MP_ACCESS_TOKEN
    
    if (!accessToken) {
      throw new Error('VITE_MP_ACCESS_TOKEN no configurado. Agregalo a tu .env.local')
    }

    // Preparar items para MercadoPago
    const items = pedidoData.items.map(item => ({
      title: item.nombre,
      quantity: item.cantidad,
      unit_price: Number(item.precioUnitario),
      currency_id: 'ARS'
    }))

    // Agregar envío si aplica
    if (pedidoData.envio > 0) {
      items.push({
        title: 'Envío a domicilio',
        quantity: 1,
        unit_price: Number(pedidoData.envio),
        currency_id: 'ARS'
      })
    }

    // Generar ID único para el pedido
    const externalReference = `GRT-${Date.now()}`
    
    // Preparar URLs de retorno
    const baseUrl = window.location.origin // http://localhost:5173
    const backUrls = {
      success: `${baseUrl}/checkout/success`,
      failure: `${baseUrl}/checkout/failure`,
      pending: `${baseUrl}/checkout/pending`
    }
    
    console.log('🔗 URLs de retorno:', backUrls)

    // Preparar datos de la preferencia
    const preferenceData = {
      items,
      payer: {
        name: pedidoData.cliente.nombre,
        email: pedidoData.cliente.email || `cliente${Date.now()}@gretta.com.ar`,
        phone: {
          area_code: '',
          number: String(pedidoData.cliente.telefono).replace(/\D/g, '')
        }
      },
      back_urls: backUrls,
      // No incluir auto_return para localhost (MP no lo acepta con localhost incluso sin activar)
      external_reference: externalReference,
      statement_descriptor: 'GRETTA',
      metadata: {
        cliente_nombre: pedidoData.cliente.nombre,
        cliente_telefono: pedidoData.cliente.telefono,
        tipo_entrega: pedidoData.tipoEntrega,
        direccion: pedidoData.cliente.direccion || '',
        notas: pedidoData.notas || ''
      }
    }

    console.log('📤 Creando preferencia en MercadoPago...', preferenceData)
    
    // Llamar a la API de MercadoPago
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(preferenceData)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('❌ Error de MercadoPago API:', {
        status: response.status,
        statusText: response.statusText,
        errorData
      })
      
      let errorMessage = 'Error al crear preferencia'
      if (errorData.message) {
        errorMessage = errorData.message
      } else if (errorData.error) {
        errorMessage = errorData.error
      } else if (response.status === 401) {
        errorMessage = 'Access Token inválido. Verificá tus credenciales en .env.local'
      } else if (response.status === 400) {
        errorMessage = 'Datos inválidos. Verificá que todos los campos estén completos'
      }
      
      throw new Error(`${errorMessage} (Status: ${response.status})`)
    }

    const preference = await response.json()
    console.log('✅ Preferencia creada exitosamente:', preference.id)
    
    return { 
      preferenceId: preference.id,
      error: null 
    }
  } catch (error) {
    console.error('❌ Error al crear preferencia MP:', error)
    return { preferenceId: null, error }
  }
}

/**
 * Verificar estado de pago en MercadoPago
 * @param {string} paymentId - ID del pago de MP
 * @returns {Promise<{status, statusDetail, error}>}
 */
export async function verificarPago(paymentId) {
  try {
    console.log('🔍 Verificando pago:', paymentId)
    
    // En producción, esto consultaría tu backend
    // que a su vez consulta la API de MercadoPago
    // const response = await fetch(`/api/payment-status/${paymentId}`)
    // const data = await response.json()
    // return { ...data, error: null }

    // Por ahora retornamos mock para desarrollo
    return {
      status: 'approved',
      statusDetail: 'accredited',
      error: null
    }
  } catch (error) {
    console.error('❌ Error al verificar pago:', error)
    return { status: null, statusDetail: null, error }
  }
}

/**
 * Guardar datos del pedido temporalmente
 * Usado mientras se procesa el pago de MercadoPago
 * @param {Object} pedidoData - Datos del pedido
 */
export function guardarPedidoPendiente(pedidoData) {
  try {
    localStorage.setItem('pending_order', JSON.stringify(pedidoData))
    console.log('💾 Pedido guardado temporalmente')
  } catch (error) {
    console.error('❌ Error al guardar pedido pendiente:', error)
  }
}

/**
 * Recuperar datos del pedido pendiente
 * @returns {Object|null} - Datos del pedido o null
 */
export function recuperarPedidoPendiente() {
  try {
    const pendingOrder = localStorage.getItem('pending_order')
    if (pendingOrder) {
      return JSON.parse(pendingOrder)
    }
    return null
  } catch (error) {
    console.error('❌ Error al recuperar pedido pendiente:', error)
    return null
  }
}

/**
 * Limpiar pedido pendiente del localStorage
 */
export function limpiarPedidoPendiente() {
  try {
    localStorage.removeItem('pending_order')
    console.log('🗑️ Pedido pendiente limpiado')
  } catch (error) {
    console.error('❌ Error al limpiar pedido pendiente:', error)
  }
}

