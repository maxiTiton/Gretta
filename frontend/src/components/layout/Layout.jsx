import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

/**
 * Layout Component
 * Componente contenedor principal que envuelve todas las páginas
 * Incluye Navbar, contenido principal y Footer
 * 
 * @example
 * // En App.jsx o router.jsx
 * <Layout>
 *   <Routes>
 *     <Route path="/" element={<Home />} />
 *     <Route path="/productos" element={<Productos />} />
 *   </Routes>
 * </Layout>
 * 
 * @example
 * // Con React Router Outlet
 * <Route element={<Layout />}>
 *   <Route path="/" element={<Home />} />
 *   <Route path="/productos" element={<Productos />} />
 * </Route>
 */
export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-cream">
      {/* Fixed Navbar */}
      <Navbar />
      
      {/* Main Content Area */}
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Botón WhatsApp flotante */}
      <WhatsAppButton />
    </div>
  )
}
