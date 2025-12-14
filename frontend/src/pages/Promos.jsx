import { useState, useEffect } from 'react'
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
  Home,
  Calendar
} from 'lucide-react'
import { getPromociones } from '@/services/promociones.service'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Loading from '@/components/ui/Loading'

/**
 * Promos Page
 * Página de promociones especiales de Gretta
 */
export default function Promos() {
  const [promociones, setPromociones] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargarPromos()
  }, [])

  const cargarPromos = async () => {
    setLoading(true)
    const { data } = await getPromociones({ activa: true })
    if (data) {
      // Filtrar solo promociones vigentes
      const promosVigentes = data.filter(promo => {
        if (!promo.fecha_fin) return true
        return new Date(promo.fecha_fin) >= new Date()
      })
      setPromociones(promosVigentes)
    }
    setLoading(false)
  }

  const getTipoLabel = (tipo) => {
    const tipos = {
      '2x1': '2x1',
      '3x2': '3x2',
      'descuento_porcentaje': '% OFF',
      'descuento_fijo': '$ OFF',
      'regalo': 'Regalo'
    }
    return tipos[tipo] || tipo
  }

  const getTipoIcono = (tipo) => {
    if (tipo === '2x1' || tipo === '3x2') return IceCream
    if (tipo === 'regalo') return Gift
    return Tag
  }

  if (loading) {
    return <Loading fullScreen text="Cargando promociones..." />
  }

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
        {promociones.length === 0 ? (
          <div className="text-center py-16">
            <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No hay promociones activas
            </h3>
            <p className="text-gray-600 mb-6">
              Volvé pronto para ver nuestras próximas ofertas
            </p>
            <Button as={Link} to="/productos" variant="primary">
              Ver Productos
            </Button>
          </div>
        ) : (
          <div className="space-y-16">
            {promociones.map((promo) => {
              const Icono = getTipoIcono(promo.tipo)
              
              return (
                <section key={promo.id}>
                  <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                      {/* Badge Activa */}
                      <div className="bg-green-pastel text-navy text-center py-2 font-bold flex items-center justify-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        PROMOCIÓN ACTIVA
                        <Sparkles className="w-4 h-4" />
                      </div>

                      {/* Imagen (si existe) */}
                      {promo.imagen_url && (
                        <div className="w-full h-64 overflow-hidden">
                          <img
                            src={promo.imagen_url}
                            alt={promo.titulo}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="p-6 lg:p-8">
                        <div className="text-center mb-6">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-pastel-50 rounded-full mb-4">
                            <Icono className="w-9 h-9 text-green-pastel" />
                          </div>
                          <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-3">
                            {promo.titulo}
                          </h2>
                          {promo.descripcion && (
                            <p className="text-lg text-gray-700">
                              {promo.descripcion}
                            </p>
                          )}
                        </div>

                        {/* Detalles */}
                        <div className="bg-gray-50 rounded-xl p-5 lg:p-6 mb-6">
                          {/* Valor del descuento */}
                          {promo.valor && (
                            <div className="text-center mb-5">
                              <span className="text-4xl font-bold text-pink">
                                {promo.tipo === 'descuento_porcentaje' && `${promo.valor}% OFF`}
                                {promo.tipo === 'descuento_fijo' && `$${promo.valor} OFF`}
                              </span>
                            </div>
                          )}

                          {/* Badge de tipo */}
                          <div className="flex justify-center mb-4">
                            <Badge variant="info" className="text-base px-4 py-2">
                              {getTipoLabel(promo.tipo)}
                            </Badge>
                          </div>

                          {/* Vigencia */}
                          {(promo.fecha_inicio || promo.fecha_fin) && (
                            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
                              <Calendar className="w-4 h-4" />
                              <span>
                                Válido{' '}
                                {promo.fecha_inicio && `desde ${new Date(promo.fecha_inicio).toLocaleDateString('es-AR')}`}
                                {promo.fecha_inicio && promo.fecha_fin && ' '}
                                {promo.fecha_fin && `hasta ${new Date(promo.fecha_fin).toLocaleDateString('es-AR')}`}
                              </span>
                            </div>
                          )}

                          {/* Términos */}
                          {promo.terminos && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <p className="text-sm text-gray-600 text-center">
                                {promo.terminos}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* CTA */}
                        <Button
                          as={Link}
                          to={
                            promo.categoria_aplicable 
                              ? `/productos?categoria=${promo.categoria_aplicable}`
                              : '/productos'
                          }
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
              )
            })}
          </div>
        )}

        {/* Cómo Funciona - Solo si hay promos */}
        {promociones.length > 0 && (
          <section className="bg-gradient-to-br from-cream to-green-pastel-50 py-16 px-4 mt-16">
            <div className="container-custom px-4 lg:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">
                  ¿Cómo funciona?
                </h2>
                <p className="text-gray-600">
                  Seguí estos simples pasos para aprovechar las promos
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
                      Agregá los productos de la promoción
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
                      ¡Disfrutá tu ahorro!
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Completá tu pedido y aprovechá
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* CTA Final */}
      <section className="bg-gradient-to-br from-pink via-pink-pastel to-pink py-16 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            ¿Querés aprovechar las promociones?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Descubrí todas nuestras ofertas exclusivas
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/productos">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-pink text-pink hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Ver Todos los Productos
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
