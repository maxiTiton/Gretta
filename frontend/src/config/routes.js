/**
 * Routes Configuration
 * Definición centralizada de rutas de la aplicación
 */

// Rutas públicas
export const ROUTES = {
  HOME: '/',
  PRODUCTOS: '/productos',
  PRODUCTO_DETALLE: '/productos/:id',
  CARRITO: '/carrito',
  CHECKOUT: '/checkout',
  CONFIRMACION: '/confirmacion',
  MIS_PEDIDOS: '/mis-pedidos',
  INFO: '/info',
  BENEFICIOS: '/beneficios',
  PROMOS: '/promos',
  CUMPLEANOS: '/cumpleanos',
}

// Rutas de administración
export const ADMIN_ROUTES = {
  LOGIN: '/admin/login',
  DASHBOARD: '/admin/dashboard',
  PRODUCTOS: '/admin/productos',
  PEDIDOS: '/admin/pedidos',
  PROMOCIONES: '/admin/promociones',
  CONFIGURACION: '/admin/configuracion',
}

// Función helper para construir rutas con parámetros
export function buildRoute(route, params = {}) {
  let path = route
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, value)
  })
  return path
}

// Ejemplo de uso:
// buildRoute(ROUTES.PRODUCTO_DETALLE, { id: 123 }) => '/productos/123'
