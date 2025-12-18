import { Link } from 'react-router-dom'
import { Home, ChevronRight, FileText } from 'lucide-react'

export default function Terminos() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-cream py-4 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" />
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-navy font-medium">Términos y Condiciones</span>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-10 h-10 text-blue" />
          <h1 className="text-4xl font-bold text-navy">
            Términos y Condiciones
          </h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Última actualización: {new Date().toLocaleDateString('es-AR')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">1. Aceptación de los Términos</h2>
            <p className="text-gray-700 leading-relaxed">
              Al acceder y utilizar el sitio web de Gretta, aceptás estos términos y condiciones en su totalidad. 
              Si no estás de acuerdo con alguno de estos términos, no deberías usar nuestros servicios.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">2. Productos y Servicios</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Gretta ofrece productos de cafetería, heladería y pastelería artesanal. Nos reservamos el derecho de:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Modificar precios sin previo aviso</li>
              <li>Discontinuar productos según disponibilidad</li>
              <li>Rechazar pedidos en casos excepcionales</li>
              <li>Limitar cantidades por pedido</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">3. Pedidos y Pagos</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Los pedidos realizados a través de nuestro sitio web están sujetos a:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Confirmación de disponibilidad de productos</li>
              <li>Verificación de datos de contacto y entrega</li>
              <li>Procesamiento de pago exitoso</li>
              <li>Aceptamos: Efectivo, Transferencia Bancaria y MercadoPago</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">4. Delivery</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nuestro servicio de delivery:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Cubre la zona de Río Cuarto, Córdoba</li>
              <li>Tiempo estimado de entrega: 30-60 minutos</li>
              <li>Costo de envío: $500 (gratis en compras superiores a $5.000)</li>
              <li>Sujeto a condiciones climáticas y disponibilidad</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">5. Política de Devoluciones</h2>
            <p className="text-gray-700 leading-relaxed">
              Debido a la naturaleza perecedera de nuestros productos, no aceptamos devoluciones. 
              En caso de recibir un producto en mal estado o que no coincida con tu pedido, 
              contactanos inmediatamente al WhatsApp indicado para resolver la situación.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">6. Promociones y Descuentos</h2>
            <p className="text-gray-700 leading-relaxed">
              Las promociones publicadas en el sitio están sujetas a:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Vigencia indicada en cada promoción</li>
              <li>Stock disponible</li>
              <li>No son acumulables con otros descuentos salvo indicación contraria</li>
              <li>Pueden modificarse o cancelarse sin previo aviso</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">7. Propiedad Intelectual</h2>
            <p className="text-gray-700 leading-relaxed">
              Todo el contenido del sitio (imágenes, textos, logos, diseño) es propiedad de Gretta 
              y está protegido por las leyes de propiedad intelectual. 
              No está permitida su reproducción sin autorización.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">8. Modificaciones</h2>
            <p className="text-gray-700 leading-relaxed">
              Gretta se reserva el derecho de modificar estos términos y condiciones en cualquier momento. 
              Las modificaciones entrarán en vigencia desde su publicación en el sitio.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">9. Contacto</h2>
            <p className="text-gray-700 leading-relaxed">
              Para cualquier consulta sobre estos términos y condiciones, podés contactarnos:
            </p>
            <ul className="list-none pl-0 text-gray-700 space-y-2 mt-4">
              <li>📧 Email: info@gretta.com</li>
              <li>📱 WhatsApp: +54 358 612-2255</li>
              <li>📍 Dirección: Sobremonte 1036, Río Cuarto</li>
              <li>📷 Instagram: @grettago_</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}