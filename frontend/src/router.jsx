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

// Páginas de retorno de MercadoPago
import CheckoutSuccess from '@/pages/checkout/CheckoutSuccess'
import CheckoutFailure from '@/pages/checkout/CheckoutFailure'
import CheckoutPending from '@/pages/checkout/CheckoutPending'

// Páginas admin
import Login from '@/pages/admin/Login'
import Dashboard from '@/pages/admin/Dashboard'
import ProductosAdmin from '@/pages/admin/ProductosAdmin'
import PedidosAdmin from '@/pages/admin/PedidosAdmin'
import PromosAdmin from '@/pages/admin/PromosAdmin'
import ConfiguracionAdmin from '@/pages/admin/ConfiguracionAdmin'

// Componente de protección de rutas
import ProtectedRoute from '@/components/admin/ProtectedRoute'

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
        path: 'checkout/success',
        element: <CheckoutSuccess />,
      },
      {
        path: 'checkout/failure',
        element: <CheckoutFailure />,
      },
      {
        path: 'checkout/pending',
        element: <CheckoutPending />,
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
      // Login (sin protección)
      {
        path: 'login',
        element: <Login />,
      },
      // Ruta principal del admin (Dashboard) - PROTEGIDA
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'pedidos',
        element: (
          <ProtectedRoute>
            <PedidosAdmin />
          </ProtectedRoute>
        ),
      },
      {
        path: 'productos',
        element: (
          <ProtectedRoute>
            <ProductosAdmin />
          </ProtectedRoute>
        ),
      },
      {
        path: 'promociones',
        element: (
          <ProtectedRoute>
            <PromosAdmin />
          </ProtectedRoute>
        ),
      },
      {
        path: 'configuracion',
        element: (
          <ProtectedRoute>
            <ConfiguracionAdmin />
          </ProtectedRoute>
        ),
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
