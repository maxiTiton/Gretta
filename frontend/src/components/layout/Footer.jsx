import { Link } from 'react-router-dom'
import { Instagram, MapPin, Phone, Mail, Clock } from 'lucide-react'

/**
 * Footer Component
 * Pie de página con información de contacto, links y redes sociales
 * 
 * @example
 * <Footer />
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const quickLinks = [
    { path: '/productos', label: 'Productos' },
    { path: '/promos', label: 'Promociones' },
    { path: '/info', label: 'Información' },
    { path: '/cumpleanos', label: 'Tu Cumple' },
  ]
  
  const contactInfo = {
    // TODO: Actualizar con información real del local
    address: 'Dirección del Local, Ciudad',
    phone: '+54 9 11 XXXX-XXXX',
    email: 'hola@gretta.com',
    schedule: 'Lun-Sab: 9:00 - 20:00',
    instagram: '@grettago_',
    instagramUrl: 'https://instagram.com/grettago_',
  }
  
  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1 - About */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <div className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="Gretta Logo"
                  className="h-10 w-auto"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
                <span className="text-2xl font-display font-bold">Gretta</span>
              </div>
            </Link>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Cafetería, heladería y pastelería de autor.
              Creamos momentos dulces con productos artesanales de la más alta calidad.
            </p>
            
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <a
                href={contactInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-pink hover:scale-110 transition-all duration-300"
                aria-label="Instagram de Gretta"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-display">
              Links Rápidos
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-pink transition-colors duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3 - Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-display">
              Contacto
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-pink" />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5 text-pink" />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="hover:text-pink transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5 text-pink" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-pink transition-colors"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 flex-shrink-0 mt-0.5 text-pink" />
                <span>{contactInfo.schedule}</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>
              © {currentYear} Gretta. Todos los derechos reservados.
            </p>
            <p>
              Desarrollado por{' '}
              <a
                href="https://github.com/maxiTiton"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink hover:text-pink-400 transition-colors"
              >
                maxiTiton
              </a>
              {' & '}
              <a
                href="https://github.com/alejoalf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink hover:text-pink-400 transition-colors"
              >
                alejoalf
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
