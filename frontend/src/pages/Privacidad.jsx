import { Link } from 'react-router-dom'
import { Home, ChevronRight, Shield } from 'lucide-react'

export default function Privacidad() {
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
          <span className="text-navy font-medium">Política de Privacidad</span>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-10 h-10 text-blue" />
          <h1 className="text-4xl font-bold text-navy">
            Política de Privacidad
          </h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Última actualización: {new Date().toLocaleDateString('es-AR')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">1. Información que Recopilamos</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Al realizar un pedido en Gretta, recopilamos la siguiente información:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Nombre completo</li>
              <li>Número de teléfono</li>
              <li>Dirección de email (opcional)</li>
              <li>Dirección de entrega (para delivery)</li>
              <li>Información del pedido (productos, cantidades, total)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">2. Uso de la Información</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Utilizamos tu información personal únicamente para:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Procesar y entregar tus pedidos</li>
              <li>Comunicarnos contigo sobre el estado de tu pedido</li>
              <li>Mejorar nuestros servicios</li>
              <li>Enviarte promociones (solo si diste tu consentimiento)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>No compartimos, vendemos ni alquilamos tu información personal a terceros.</strong>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">3. Procesamiento de Pagos</h2>
            <p className="text-gray-700 leading-relaxed">
              Los pagos con tarjeta de crédito/débito son procesados a través de MercadoPago. 
              Gretta no almacena información de tarjetas de crédito. 
              MercadoPago cuenta con certificación PCI-DSS para garantizar la seguridad de tus transacciones.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">4. Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              Nuestro sitio utiliza cookies para:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Mantener tu sesión de navegación</li>
              <li>Recordar los productos en tu carrito</li>
              <li>Mejorar tu experiencia de usuario</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Podés desactivar las cookies en la configuración de tu navegador, 
              aunque esto puede afectar algunas funcionalidades del sitio.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">5. Seguridad de Datos</h2>
            <p className="text-gray-700 leading-relaxed">
              Implementamos medidas de seguridad para proteger tu información personal:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Conexión segura HTTPS</li>
              <li>Almacenamiento encriptado de datos sensibles</li>
              <li>Acceso restringido solo a personal autorizado</li>
              <li>Respaldo regular de información</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">6. Tus Derechos</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Conforme a la Ley de Protección de Datos Personales (Ley 25.326), tenés derecho a:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Acceder a tu información personal</li>
              <li>Rectificar datos incorrectos o incompletos</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Oponerte al procesamiento de tus datos</li>
              <li>Retirar tu consentimiento en cualquier momento</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Para ejercer estos derechos, contactanos a info@gretta.com
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">7. Menores de Edad</h2>
            <p className="text-gray-700 leading-relaxed">
              Nuestros servicios no están dirigidos a menores de 18 años. 
              No recopilamos información de menores de forma intencional. 
              Si sos padre/madre y creés que tu hijo nos proporcionó información, 
              contactanos para eliminarla.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">8. Cambios en la Política</h2>
            <p className="text-gray-700 leading-relaxed">
              Podemos actualizar esta política de privacidad ocasionalmente. 
              Te notificaremos de cambios significativos mediante un aviso en nuestro sitio web. 
              Te recomendamos revisar esta página periódicamente.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">9. Contacto</h2>
            <p className="text-gray-700 leading-relaxed">
              Si tenés preguntas sobre esta política de privacidad o sobre cómo manejamos tus datos:
            </p>
            <ul className="list-none pl-0 text-gray-700 space-y-2 mt-4">
              <li>📧 Email: info@gretta.com</li>
              <li>📱 WhatsApp: +54 358 612-2255</li>
              <li>📍 Dirección: Sobremonte 1036, Río Cuarto</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}