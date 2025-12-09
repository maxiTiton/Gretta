/**
 * Constants
 * Constantes del sistema
 */

// Estados de pedidos
export const ESTADOS_PEDIDO = {
  PENDIENTE: 'pendiente',
  CONFIRMADO: 'confirmado',
  PREPARANDO: 'preparando',
  LISTO: 'listo',
  ENTREGADO: 'entregado',
  CANCELADO: 'cancelado',
}

// Colores para badges de estados
export const COLORES_ESTADO = {
  [ESTADOS_PEDIDO.PENDIENTE]: 'warning',
  [ESTADOS_PEDIDO.CONFIRMADO]: 'info',
  [ESTADOS_PEDIDO.PREPARANDO]: 'info',
  [ESTADOS_PEDIDO.LISTO]: 'success',
  [ESTADOS_PEDIDO.ENTREGADO]: 'success',
  [ESTADOS_PEDIDO.CANCELADO]: 'error',
}

// Métodos de pago
export const METODOS_PAGO = {
  MERCADOPAGO: 'mercadopago',
  EFECTIVO: 'efectivo',
  TRANSFERENCIA: 'transferencia',
}

// Tipos de entrega
export const TIPOS_ENTREGA = {
  RETIRO: 'retiro',
  DELIVERY: 'delivery',
}

// Categorías de productos (sincronizar con base de datos)
export const CATEGORIAS = {
  CAFETERIA: 'cafeteria',
  HELADERIA: 'heladeria',
  PASTELERIA: 'pasteleria',
  TORTAS: 'tortas',
  PROMOS: 'promos',
}

// Configuración de la aplicación
export const APP_CONFIG = {
  NOMBRE: 'Gretta',
  DELIVERY_COSTO: 500, // TODO: traer desde configuración
  CURRENCY: 'ARS',
  CURRENCY_SYMBOL: '$',
}
