/**
 * React Router Configuration
 * Configuración de rutas de la aplicación
 */

import { createBrowserRouter, Navigate } from 'react-router-dom'

// Layout
import Layout from '@/components/layout/Layout'

// Páginas públicas
import Home from '@/pages/Home'
import Productos from '@/pages/Productos'
import ProductoDetalle from '@/pages/ProductoDetalle'
import Carrito from '@/pages/Carrito'
import Checkout from '@/pages/Checkout'
import Confirmacion from '@/pages/Confirmacion'
import MisPedidos from '@/pages/MisPedidos'
import Info from '@/pages/Info'
import Beneficios from '@/pages/Beneficios'
import Promos from '@/pages/Promos'
import Cumpleaños from '@/pages/Cumpleaños'
import NotFound from '@/pages/NotFound'

// Páginas admin
import Login from '@/pages/admin/Login'
import Dashboard from '@/pages/admin/Dashboard'
import ProductosAdmin from '@/pages/admin/ProductosAdmin'
import PedidosAdmin from '@/pages/admin/PedidosAdmin'
import PromosAdmin from '@/pages/admin/PromosAdmin'
import ConfiguracionAdmin from '@/pages/admin/ConfiguracionAdmin'

// TODO: Implementar ProtectedRoute component para rutas admin
// import ProtectedRoute from '@/components/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'productos',
        element: <Productos />,
      },
      {
        path: 'productos/:id',
        element: <ProductoDetalle />,
      },
      {
        path: 'carrito',
        element: <Carrito />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'confirmacion',
        element: <Confirmacion />,
      },
      {
        path: 'mis-pedidos',
        element: <MisPedidos />,
      },
      {
        path: 'info',
        element: <Info />,
      },
      {
        path: 'beneficios',
        element: <Beneficios />,
      },
      {
        path: 'promos',
        element: <Promos />,
      },
      {
        path: 'cumpleanos',
        element: <Cumpleaños />,
      },
    ],
  },
  // Rutas de administración
  {
    path: '/admin',
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      // TODO: Proteger estas rutas con ProtectedRoute
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'productos',
        element: <ProductosAdmin />,
      },
      {
        path: 'pedidos',
        element: <PedidosAdmin />,
      },
      {
        path: 'promociones',
        element: <PromosAdmin />,
      },
      {
        path: 'configuracion',
        element: <ConfiguracionAdmin />,
      },
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
    ],
  },
  // 404
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router
