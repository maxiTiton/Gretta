import { Link } from 'react-router-dom'
import { 
  Cake, 
  Coffee, 
  IceCream, 
  Calendar,
  Store,
  CreditCard,
  Gift,
  MessageCircle,
  ChevronRight,
  Sparkles,
  PartyPopper,
  Home
} from 'lucide-react'
import Button from '@/components/ui/Button'

/**
 * Cumpleaños Page
 * Página de regalo de cumpleaños y pedidos especiales de Gretta
 */
export default function Cumpleaños() {
  const regalos = [
    {
      icon: Coffee,
      titulo: 'Café + Cookie',
      descripcion: 'Café a elección + Cookie del sabor que prefieras',
      valor: '$5.750'
    },
    {
      icon: Coffee,
      titulo: 'Café + Medialuna',
      descripcion: 'Café a elección + Croissant o Medialuna dulce',
      valor: '$4.373'
    },
    {
      icon: IceCream,
      titulo: '2 Bochas de Helado',
      descripcion: 'Dos gustos a elección',
      valor: '$4.550'
    },
    {
      icon: IceCream,
      titulo: '1/4 kg de Helado',
      descripcion: 'Cuarto de helado con 2 sabores',
      valor: '$9.100'
    }
  ]

  const pasos = [
    {
      icon: Calendar,
      titulo: 'Anotá tu cumpleaños',
      descripcion: 'Registrate en nuestro programa'
    },
    {
      icon: Store,
      titulo: 'Vení al local',
      descripcion: 'El día de tu cumpleaños'
    },
    {
      icon: CreditCard,
      titulo: 'Mostrá tu DNI',
      descripcion: 'Para validar tu identidad'
    },
    {
      icon: Gift,
      titulo: '¡Elegí tu regalo!',
      descripcion: 'Disfrutá de tu obsequio'
    }
  ]

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
            <span className="text-navy font-medium">Tu Cumple</span>
          </div>

          {/* Hero Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-pink to-pink-pastel rounded-full flex items-center justify-center shadow-lg">
              <Cake className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Hero Content */}
          <h1 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">
            Tu Cumple
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Celebrá tu día especial con Gretta
          </p>
        </div>
      </section>

      {/* Regalo Especial */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-cream to-pink-pastel-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-block bg-yellow-100 text-yellow-700 px-6 py-2 rounded-full font-bold text-sm mb-6">
              🎁 REGALO DE CUMPLEAÑOS
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">
              Tu Regalo Especial
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-4">
              El día de tu cumpleaños, elegí uno de estos regalos presentando tu DNI
            </p>
            <div className="inline-block bg-pink-100 text-pink-700 px-4 py-2 rounded-lg font-medium text-sm">
              Válido solo el día de tu cumpleaños
            </div>
          </div>

          {/* Grid de Regalos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {regalos.map((regalo, index) => {
                const Icon = regalo.icon
                return (
                  <div key={index} className="bg-white rounded-xl shadow-soft p-6 text-center group hover:shadow-lg hover:scale-105 transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-pastel-100 mb-4 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="w-8 h-8 text-pink" />
                    </div>
                    <h3 className="text-lg font-semibold text-navy mb-3 font-display">
                      {regalo.titulo}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {regalo.descripcion}
                    </p>
                  </div>
                )
              })}
          </div>
        </div>
      </section>

      {/* Cómo Reclamar */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">
              ¿Cómo reclamar tu regalo?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Seguí estos simples pasos
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pasos.map((paso, index) => {
              const Icon = paso.icon
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue/10 mb-4 transition-transform duration-300 group-hover:scale-110 relative">
                    <Icon className="w-8 h-8 text-blue" />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-pink rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-navy mb-2 font-display">
                    {paso.titulo}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {paso.descripcion}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tortas para Cumpleaños */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue to-navy text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6">
              <Cake className="w-8 h-8 text-blue" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Tortas para Cumpleaños
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
              También hacemos tortas personalizadas para tu fiesta
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-6">
              <h3 className="text-xl font-semibold font-display mb-6">
                Nuestras opciones
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink rounded-full" />
                  <span>Tortas temáticas</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink rounded-full" />
                  <span>Diseños personalizados</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink rounded-full" />
                  <span>Diferentes tamaños</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink rounded-full" />
                  <span>Sabores a elección</span>
                </div>
              </div>

              <div className="bg-green-pastel-50/20 border border-green-pastel/30 rounded-lg p-4 mb-6">
                <p className="text-sm text-center font-medium">
                  💡 Consultá con anticipación por WhatsApp
                </p>
              </div>

              <Button
                as="a"
                href="https://wa.me/543584307110?text=Hola!%20Quisiera%20consultar%20por%20tortas%20de%20cumpleaños"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
                className="w-full bg-pink-pastel hover:bg-pink"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Consultar por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Galería (Placeholder) */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">
              Algunas de nuestras tortas
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Próximamente más fotos
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                <div className="text-center">
                  <Cake className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Foto próximamente</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-pink via-pink-pastel to-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              ¿Querés festejar con nosotros?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Hacé tu pedido o consultá por tortas personalizadas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as={Link}
                to="/productos"
                variant="secondary"
                size="lg"
                className="bg-pink-200 text-white hover:bg-pink-300"
              >
                Ver Productos
              </Button>
              <Button
                as="a"
                href="https://wa.me/543584307110?text=Hola!%20Quisiera%20consultar%20por%20tortas%20de%20cumpleaños"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-pink"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Consultar Tortas
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
