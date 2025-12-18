import { MessageCircle } from 'lucide-react'

/**
* WhatsAppButton
* Botón flotante para contacto directo por WhatsApp
*/

export default function WhatsAppButton() {
const phoneNumber = '5493586122255' // Formato: 549 + código área + número
const mensaje = encodeURIComponent('¡Hola! Me gustaría hacer una consulta sobre Gretta.')
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${mensaje}`

return (
    <a
    href={whatsappUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
    aria-label="Contactar por WhatsApp"
    >
        <MessageCircle className="w-7 h-7" />
      {/* Tooltip en desktop */}
            <span className="absolute right-full mr-3 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Chateá con nosotros
    </span>
    </a>
)
}