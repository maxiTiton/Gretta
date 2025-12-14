import { Link } from 'react-router-dom'
import { 
  Tag, 
  IceCream, 
  ShoppingCart, 
  CheckCircle,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Gift,
  Home
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

/**
 * Promos Page
 * Página de promociones especiales de Gretta
 */
export default function Promos() {
  const precioUnitario = 9100
  const precioOriginal = precioUnitario * 3
  const precioPromo = precioUnitario * 2
  const ahorro = precioOriginal - precioPromo

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
            <span className="text-navy font-medium">Promos</span>
          </div>

          {/* Hero Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-pink to-pink-pastel rounded-full flex items-center justify-center shadow-lg">
              <Tag className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Hero Content */}
          <h1 className="text-4xl md:text-5xl font-display font-bold text-navy mb-4">
            Promociones Especiales
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Aprovechá nuestras ofertas exclusivas
          </p>
        </div>
      </section>

      <div className="container-custom px-4 lg:px-6 py-12">
        {/* Promo Destacada */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Badge Activa */}
              <div className="bg-green-pastel text-navy text-center py-2 font-bold flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                PROMOCIÓN ACTIVA
                <Sparkles className="w-4 h-4" />
              </div>

              <div className="p-6 lg:p-8">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-pastel-50 rounded-full mb-4">
                    <IceCream className="w-9 h-9 text-green-pastel" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-3">
                    3x2 en Helados 1/4 kg
                  </h2>
                  <p className="text-lg text-gray-700">
                    Llevás 3 cuartos de helado y pagás solo 2
                  </p>
                </div>

                {/* Detalles */}
                <div className="bg-gray-50 rounded-xl p-5 lg:p-6 mb-6">
                  <ul className="space-y-2 mb-5">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-pastel mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Llevás 3 cuartos de helado y pagás solo 2</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-pastel mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Válido en helados de 1/4 kg</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-pastel mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Elegí tus sabores favoritos</span>
                    </li>
                  </ul>

                  {/* Precios */}
                  <div className="border-t border-gray-200 pt-5">
                    <div className="flex items-baseline justify-center gap-3 mb-3">
                      <span className="text-xl text-gray-400 line-through">
                        ${precioOriginal.toLocaleString()}
                      </span>
                      <span className="text-4xl font-bold text-pink">
                        ${precioPromo.toLocaleString()}
                      </span>
                    </div>
                    <div className="inline-block bg-green-pastel-50 text-green-pastel px-5 py-2 rounded-full font-bold text-base mx-auto">
                      ¡Ahorrás ${ahorro.toLocaleString()}!
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  as={Link}
                  to="/productos?categoria=heladeria"
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  Aprovechar Oferta
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Cómo Funciona */}
        <section className="bg-gradient-to-br from-cream to-green-pastel-50 py-16 px-4">
          <div className="container-custom px-4 lg:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">
                ¿Cómo funciona?
              </h2>
              <p className="text-gray-600">
                Seguí estos simples pasos para aprovechar la promo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Paso 1 */}
              <div className="flex gap-4 items-start bg-white rounded-xl p-6 shadow-soft hover:shadow-lg transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue rounded-full flex items-center justify-center shadow-md">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-navy mb-1">
                    Agregá al carrito
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Agregá 3 helados de 1/4 kg al carrito
                  </p>
                </div>
              </div>

              {/* Paso 2 */}
              <div className="flex gap-4 items-start bg-white rounded-xl p-6 shadow-soft hover:shadow-lg transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-pink rounded-full flex items-center justify-center shadow-md">
                    <Tag className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-navy mb-1">
                    Descuento automático
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    El descuento se aplica automáticamente
                  </p>
                </div>
              </div>

              {/* Paso 3 */}
              <div className="flex gap-4 items-start bg-white rounded-xl p-6 shadow-soft hover:shadow-lg transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center shadow-md">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-navy mb-1">
                    Pagás solo 2
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Pagás solo 2 unidades en el checkout
                  </p>
                </div>
              </div>
            </div>

            {/* Términos y Condiciones */}
            <div className="mt-8 bg-pink-pastel-100 border-l-4 border-pink rounded-lg p-6">
              <div className="flex items-start gap-3">
                <Tag className="w-6 h-6 text-pink flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-navy mb-1">
                    Términos y Condiciones
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Promoción válida solo para helados de 1/4 kg</li>
                    <li>• No acumulable con otras promociones</li>
                    <li>• Sujeto a disponibilidad de stock</li>
                    <li>• Válido para retiro en local y delivery</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Otras Formas de Ahorrar */}
        <section className="bg-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">
                Otras formas de ahorrar
              </h2>
              <p className="text-gray-600">
                Descubrí más beneficios exclusivos
              </p>
            </div>

            {/* Descuentos Empresariales */}
            <Link
              to="/beneficios"
              className="block bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-8 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group border-2 border-blue-200"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-16 h-16 bg-blue rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-navy mb-2 group-hover:text-blue transition-colors">
                      Descuentos Empresariales
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Hasta 20% OFF con convenios empresariales
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-8 h-8 text-blue group-hover:translate-x-2 transition-all flex-shrink-0" />
              </div>
            </Link>
          </div>
        </section>
      </div>

      {/* CTA Final */}
      <section className="bg-gradient-to-br from-pink via-pink-pastel to-pink py-16 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            ¿Querés aprovechar esta promo?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Elegí tus 3 helados favoritos y ahorrá $9.100
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/productos?categoria=heladeria">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-pink-600 text-white hover:bg-pink-600 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Ver Helados
                <IceCream className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/80">
            Promoción válida solo para helados de 1/4 kg
          </p>
        </div>
      </section>
    </div>
  )
}
