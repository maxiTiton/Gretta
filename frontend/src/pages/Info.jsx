import { Link } from 'react-router-dom'
import { 
  MapPin, 
  MessageCircle, 
  Instagram, 
  Mail, 
  Clock, 
  Truck,
  ChevronRight,
  Phone,
  Navigation,
  Home
} from 'lucide-react'
import Button from '@/components/ui/Button'

/**
 * Info Page
 * Página de información, ubicación y contacto de Gretta
 */
export default function Info() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cream via-cream-50 to-pink-pastel-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-8">
            <Link to="/" className="hover:text-blue transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-navy font-medium">Visitanos</span>
          </div>

          {/* Hero Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-pink to-pink-pastel rounded-full flex items-center justify-center shadow-lg">
              <MapPin className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Hero Content */}
          <h1 className="text-4xl md:text-5xl font-display font-bold text-navy mb-4">
            Visitanos
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Encontranos en el corazón de Río Cuarto
          </p>
        </div>
      </section>

      <div className="container-custom px-4 lg:px-6 py-12">
        {/* Ubicación */}
        <section className="mb-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Mapa */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27134.84089563954!2d-64.35078!3d-33.13028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95cdff6e4c4ac7f9%3A0xf0b1e7d1e7d1e7d1!2sR%C3%ADo%20Cuarto%2C%20C%C3%B3rdoba!5e0!3m2!1ses!2sar!4v1234567890"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Gretta"
                />
              </div>

              {/* Información */}
              <div className="flex flex-col justify-center space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-navy mb-4">
                    Nuestra Ubicación
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-6 h-6 text-pink mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-lg text-gray-700 font-medium">
                          Av. Example 1234
                        </p>
                        <p className="text-gray-600">
                          Río Cuarto, Córdoba, Argentina
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-6 h-6 text-pink mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-lg text-gray-700 font-medium">
                          Teléfono
                        </p>
                        <p className="text-gray-600">
                          +54 9 358 XXX-XXXX
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  as="a"
                  href="https://maps.google.com/?q=Río+Cuarto+Córdoba"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Navigation className="w-5 h-5 mr-2" />
                  Cómo llegar
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section className="bg-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">
                Contactanos
              </h2>
              <p className="text-gray-600">
                Estamos para ayudarte en lo que necesites
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* WhatsApp */}
              <div className="bg-white rounded-xl shadow-soft p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <MessageCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  WhatsApp
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  +54 9 358 430-7110
                </p>
                <Button
                  as="a"
                  href="https://wa.me/543584307110"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="md"
                  className="bg-green-600 hover:bg-green-700 text-white w-full"
                >
                  Enviar mensaje
                </Button>
              </div>

              {/* Instagram */}
              <div className="bg-white rounded-xl shadow-soft p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Instagram className="w-8 h-8 text-pink" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  Instagram
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  @grettago_
                </p>
                <Button
                  as="a"
                  href="https://instagram.com/grettago_"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="md"
                  className="bg-pink hover:bg-pink-600 text-white w-full"
                >
                  Seguinos
                </Button>
              </div>

              {/* Email */}
              <div className="bg-white rounded-xl shadow-soft p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Mail className="w-8 h-8 text-blue" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  Email
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  info@gretta.com
                </p>
                <Button
                  as="a"
                  href="mailto:info@gretta.com"
                  variant="primary"
                  size="md"
                  className="bg-blue hover:bg-blue-600 text-white w-full"
                >
                  Escribinos
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Horarios */}
        <section className="bg-gradient-to-br from-cream to-green-pastel-50 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">
                Horarios de Atención
              </h2>
              <p className="text-gray-600">
                Visitanos en los siguientes horarios
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-soft">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700 font-medium">Lunes a Viernes</span>
                  <span className="text-navy font-bold">9:00 - 20:00</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700 font-medium">Sábados</span>
                  <span className="text-navy font-bold">10:00 - 20:00</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700 font-medium">Domingos</span>
                  <span className="text-red-600 font-bold">Cerrado</span>
                </div>
              </div>

              <div className="mt-6 bg-pink-pastel-100 border-l-4 border-pink rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-pink flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    Los horarios pueden variar en feriados
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Delivery */}
        <section className="bg-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">
                Hacemos Delivery
              </h2>
              <p className="text-gray-600 mb-8">
                Pedí desde nuestra web y recibilo en 30-60 minutos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4 items-start bg-gradient-to-br from-cream to-green-pastel-50 rounded-xl p-6 shadow-soft">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-md">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-navy mb-1">
                    Zona de Cobertura
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Toda Río Cuarto
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-gradient-to-br from-cream to-green-pastel-50 rounded-xl p-6 shadow-soft">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-md">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-navy mb-1">
                    Costo de Envío
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    $500 - Gratis en compras mayores a $5.000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Final */}
      <section className="bg-gradient-to-br from-blue to-navy py-16 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            ¿Listo para hacer tu pedido?
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Explorá nuestros productos y disfrutá de la mejor calidad
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/productos">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-pink hover:bg-pink-600 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Ver Productos
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-blue-200">
            Delivery disponible en toda la ciudad
          </p>
        </div>
      </section>
    </div>
  )
}
