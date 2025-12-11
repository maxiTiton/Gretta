import { Link } from 'react-router-dom'
import { 
  Gift, 
  BookOpen, 
  Waves, 
  Heart, 
  GraduationCap, 
  Music,
  CheckCircle,
  Tag,
  CreditCard,
  Package,
  ChevronRight,
  Home
} from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

/**
 * Beneficios Page
 * Página que muestra los descuentos y beneficios exclusivos
 * con empresas aliadas de Gretta
 */

const beneficios = [
  {
    id: 1,
    nombre: 'Cultural Británica',
    descuento: '15% OFF',
    descripcion: 'En todos los productos menos botellas / vasos y flores',
    Icon: BookOpen,
    colorAccent: 'blue',
  },
  {
    id: 2,
    nombre: 'Mutual Médica',
    descuento: '15% OFF',
    descripcion: 'En todos los productos menos botellas / vasos y flores',
    Icon: Waves,
    colorAccent: 'blue',
  },
  {
    id: 3,
    nombre: 'Colegio Profesional de Kinesiólogos',
    subtitulo: 'Fisioterapeutas de Córdoba - Regional VI',
    descuento: '20% OFF',
    descripcion: 'En todos los productos menos botellas / vasos y flores',
    Icon: Heart,
    colorAccent: 'pink',
    destacado: true,
  },
  {
    id: 4,
    nombre: 'Universidad de Mendoza',
    descuento: '15% OFF',
    descripcion: 'En todos los productos menos botellas / vasos y flores',
    Icon: GraduationCap,
    colorAccent: 'blue',
  },
  {
    id: 5,
    nombre: 'Sugar Academia de Baile',
    descuento: '15% OFF',
    descripcion: 'En todos los productos menos botellas / vasos y flores',
    Icon: Music,
    colorAccent: 'blue',
  },
]

const pasos = [
  {
    id: 1,
    Icon: CheckCircle,
    titulo: 'Mostrá tu credencial',
    descripcion: 'Presentá tu identificación de la institución',
  },
  {
    id: 2,
    Icon: Tag,
    titulo: 'Mencioná el beneficio',
    descripcion: 'Al hacer tu pedido, indicá que querés usar tu descuento',
  },
  {
    id: 3,
    Icon: CreditCard,
    titulo: 'Pago en efectivo',
    descripcion: 'El descuento aplica solo en compras con efectivo',
  },
  {
    id: 4,
    Icon: Package,
    titulo: 'Productos incluidos',
    descripcion: 'Excluye botellas, vasos y flores',
  },
]

export default function Beneficios() {
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
            <span className="text-navy font-medium">Beneficios</span>
          </div>

          {/* Hero Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-pink to-pink-pastel rounded-full flex items-center justify-center shadow-lg">
              <Gift className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Hero Content */}
          <h1 className="text-4xl md:text-5xl font-display font-bold text-navy mb-4">
            Beneficios Gretta GO
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Disfrutá descuentos exclusivos en nuestros comercios aliados
          </p>
        </div>
      </section>

      {/* Beneficios Grid Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beneficios.map((beneficio) => {
              const { id, nombre, subtitulo, descuento, descripcion, Icon, colorAccent, destacado } = beneficio
              
              const badgeColor = colorAccent === 'pink' 
                ? 'bg-pink text-white' 
                : 'bg-blue text-white'
              
              const iconBgColor = colorAccent === 'pink'
                ? 'bg-pink-pastel-100'
                : 'bg-blue-50'
              
              const iconColor = colorAccent === 'pink'
                ? 'text-pink'
                : 'text-blue'

              return (
                <Card
                  key={id}
                  hover
                  className={`relative ${destacado ? 'ring-2 ring-pink shadow-lg' : ''}`}
                >
                  {/* Badge de descuento */}
                  <Badge 
                    className={`absolute top-4 right-4 text-lg font-bold px-3 py-1.5 ${badgeColor}`}
                  >
                    {descuento}
                  </Badge>

                  {/* Logo/Icono */}
                  <div className="flex justify-center mb-4 mt-2">
                    <div className={`w-20 h-20 rounded-full ${iconBgColor} flex items-center justify-center transition-transform duration-300 hover:scale-110`}>
                      <Icon className={`w-10 h-10 ${iconColor}`} />
                    </div>
                  </div>

                  {/* Nombre */}
                  <h3 className="text-xl font-bold text-navy text-center mb-2 leading-tight px-2">
                    {nombre}
                  </h3>

                  {/* Subtítulo (solo para algunos) */}
                  {subtitulo && (
                    <p className="text-xs text-gray-500 text-center mb-3 italic">
                      {subtitulo}
                    </p>
                  )}

                  {/* Descripción */}
                  <p className="text-sm text-gray-600 text-center mb-4 leading-relaxed">
                    {descripcion}
                  </p>

                  {/* Badge "Solo efectivo" */}
                  <div className="flex justify-center mt-auto pt-2">
                    <Badge variant="default" className="text-xs border border-gray-300">
                      Solo efectivo
                    </Badge>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Sección Informativa */}
      <section className="bg-gradient-to-br from-cream to-green-pastel-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">
              ¿Cómo usar tus beneficios?
            </h2>
            <p className="text-gray-600">
              Seguí estos simples pasos para aprovechar tus descuentos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pasos.map((paso) => {
              const { id, Icon, titulo, descripcion } = paso
              
              return (
                <div 
                  key={id}
                  className="flex gap-4 items-start bg-white rounded-xl p-6 shadow-soft hover:shadow-lg transition-all duration-300"
                >
                  {/* Número y icono */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue rounded-full flex items-center justify-center shadow-md">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Contenido */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-navy mb-1">
                      {titulo}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {descripcion}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Nota adicional */}
          <div className="mt-8 bg-pink-pastel-100 border-l-4 border-pink rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Gift className="w-6 h-6 text-pink flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-navy mb-1">
                  Importante
                </h4>
                <p className="text-sm text-gray-700">
                  Los descuentos no son acumulables con otras promociones y están sujetos a disponibilidad de stock. 
                  Presentá tu credencial vigente al momento de realizar tu pedido.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-br from-blue to-navy py-16 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            ¿Querés aprovechar tus beneficios?
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Visitanos o hacé tu pedido ahora y disfrutá de tus descuentos exclusivos
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
            * Descuentos solo en compras con efectivo
          </p>
        </div>
      </section>
    </div>
  )
}
