import { useNavigate } from 'react-router-dom'
import {
  Coffee,
  IceCream,
  Cake,
  ChevronDown,
  Award,
  Heart,
  Truck,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import ProductCard from '@/components/productos/ProductCard'

/**
 * Home Page
 * Página principal del sitio con hero, especialidades, productos y CTAs
 * 
 * TODO SEO:
 * - Agregar meta tags (title, description, og:image)
 * - Agregar structured data (JSON-LD)
 */
export default function Home() {
  const navigate = useNavigate()
  
  // Productos destacados mock (usando productos reales de Gretta)
  const productosDestacados = [
    {
      id: 4,
      nombre: 'Helado 1/4 kg',
      descripcion: '2 sabores',
      precio: 9100,
      imagen_url: 'https://placehold.co/600x450/2d4a6f/ffffff?text=Helado+1%2F4+kg',
      categoria: 'heladeria',
      disponible: true,
      masVendido: true,
    },
    {
      id: 7,
      nombre: 'Paleta Premium',
      descripcion: 'Paleta helada premium con cobertura',
      precio: 6890,
      imagen_url: 'https://placehold.co/600x450/b8d4c8/1a2332?text=Paleta+Premium',
      categoria: 'heladeria',
      disponible: true,
      masVendido: true,
    },
    {
      id: 10,
      nombre: 'Pan de Chocolate',
      descripcion: '1 unidad',
      precio: 4900,
      imagen_url: 'https://placehold.co/600x450/f5ccd4/1a2332?text=Pan+Chocolate',
      categoria: 'laminados',
      disponible: true,
      masVendido: true,
    },
    {
      id: 16,
      nombre: 'Chipá',
      descripcion: '100 grs',
      precio: 2600,
      imagen_url: 'https://placehold.co/600x450/2d4a6f/ffffff?text=Chipa',
      categoria: 'panificacion',
      disponible: true,
      masVendido: true,
    },
  ]
  
  // Especialidades
  const especialidades = [
    {
      icon: Coffee,
      title: 'Café de Especialidad',
      description: 'Granos seleccionados y tostado artesanal',
      link: '/productos?categoria=cafe',
      color: 'text-blue',
    },
    {
      icon: IceCream,
      title: 'Helados Artesanales',
      description: 'Sabores únicos y cremosos hechos en casa',
      link: '/productos?categoria=helados',
      color: 'text-pink',
    },
    {
      icon: Cake,
      title: 'Pastelería de Autor',
      description: 'Tortas, tartas y dulces para cada ocasión',
      link: '/productos?categoria=pasteleria',
      color: 'text-green-pastel',
    },
  ]
  
  // Beneficios
  const beneficios = [
    {
      icon: Award,
      title: 'Calidad Premium',
      description: 'Ingredientes seleccionados de primera calidad',
    },
    {
      icon: Heart,
      title: 'Hecho con Amor',
      description: 'Cada producto es elaborado con dedicación',
    },
    {
      icon: Truck,
      title: 'Delivery Rápido',
      description: 'Recibí tu pedido en el día',
    },
    {
      icon: ShieldCheck,
      title: 'Compra Segura',
      description: 'Pagá con MercadoPago de forma segura',
    },
  ]
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        {/* Imagen de fondo con overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
        >
          {/* Overlay oscuro para legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy/65 via-navy/60 to-navy/75"></div>
        </div>
        
        {/* Contenido */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            {/* Logo Circular */}
            <div className="flex justify-center mb-6">
              <img
                src="/logo.jpg"
                alt="Gretta Logo"
                className="h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover shadow-2xl"
              />
            </div>
            
            {/* Subtitle */}
            <p className="text-xl sm:text-2xl lg:text-3xl text-cream font-medium drop-shadow-md">
              Cafetería, Heladería y Pastelería de Autor
            </p>
            
            {/* Description */}
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              Sabores únicos hechos con amor y dedicación. Descubrí nuestros productos artesanales.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Button
                size="lg"
                onClick={() => navigate('/productos')}
                className="w-full sm:w-auto min-w-[200px] bg-blue text-white hover:bg-blue-700 transition-all duration-200 font-bold"
                style={{ 
                  boxShadow: '5px 5px 0px 0px rgba(255,255,255,1)',
                  transform: 'translate(0, 0)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(2.5px, 2.5px)'
                  e.currentTarget.style.boxShadow = '2.5px 2.5px 0px 0px rgba(255,255,255,1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)'
                  e.currentTarget.style.boxShadow = '5px 5px 0px 0px rgba(255,255,255,1)'
                }}
              >
                Ver Productos
              </Button>
              <Button
                size="lg"
                onClick={() => navigate('/promos')}
                className="w-full sm:w-auto min-w-[200px] bg-pink text-white hover:bg-pink-600 transition-all duration-200 font-bold"
                style={{ 
                  boxShadow: '5px 5px 0px 0px rgba(255,255,255,1)',
                  transform: 'translate(0, 0)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(2.5px, 2.5px)'
                  e.currentTarget.style.boxShadow = '2.5px 2.5px 0px 0px rgba(255,255,255,1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)'
                  e.currentTarget.style.boxShadow = '5px 5px 0px 0px rgba(255,255,255,1)'
                }}
              >
                Nuestras Promos
              </Button>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
            <ChevronDown className="w-8 h-8 text-white/70" />
          </div>
        </div>
      </section>
      
      {/* Especialidades Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy mb-4">
              Nuestras Especialidades
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Descubrí lo mejor de Gretta
            </p>
          </div>
          
          {/* Especialidades Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {especialidades.map((item, index) => {
              const Icon = item.icon
              return (
                <Card
                  key={index}
                  hover
                  className="text-center group cursor-pointer"
                  onClick={() => navigate(item.link)}
                >
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 mb-6 ${item.color} transition-all duration-300 group-hover:scale-110 group-hover:bg-cream`}>
                    <Icon className="w-10 h-10" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-navy mb-3 font-display">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <span className="inline-flex items-center gap-2 text-pink font-medium group-hover:gap-3 transition-all">
                    Ver más
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
      
      {/* Productos Destacados Section */}
      <section className="py-16 lg:py-24 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy mb-4">
              Nuestros Favoritos
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Los productos más populares
            </p>
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
            {productosDestacados.map((producto) => (
              <ProductCard
                key={producto.id}
                producto={producto}
                onViewDetail={() => navigate(`/productos/${producto.id}`)}
              />
            ))}
          </div>
          
          {/* View All Button */}
          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/productos')}
              className="min-w-[250px]"
            >
              Ver todos los productos
            </Button>
          </div>
        </div>
      </section>
      
      {/* Por Qué Elegirnos Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy mb-4">
              Por Qué Elegirnos
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Comprometidos con la excelencia en cada detalle
            </p>
          </div>
          
          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {beneficios.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink/10 mb-4 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-8 h-8 text-pink" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-navy mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      
      {/* CTA Final Section */}
      <section className="py-20 lg:py-28 bg-blue text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold">
              ¿Listo para disfrutar?
            </h2>
            
            <p className="text-xl sm:text-2xl text-blue-100">
              Hacé tu pedido ahora y recibilo en el día
            </p>
            
            <div>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate('/productos')}
                className="min-w-[250px] text-lg"
              >
                Hacer mi Pedido
              </Button>
            </div>
            
            <p className="text-sm text-blue-200">
              🚚 Envío gratis en compras superiores a $5.000
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
