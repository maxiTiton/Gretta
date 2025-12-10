import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema } from '@/schemas/checkoutSchema'
import DeliveryOptions from './DeliveryOptions'
import PaymentMethod from './PaymentMethod'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { MapPin, User, Phone, Mail, MessageSquare } from 'lucide-react'
import { clsx } from 'clsx'

/**
 * CheckoutForm Component
 * Formulario completo de checkout con validación
 * 
 * @param {Object} props
 * @param {Function} props.onSubmit - Callback al enviar formulario válido
 * @param {boolean} props.isSubmitting - Estado de carga
 * @param {number} props.subtotal - Subtotal del carrito (para cálculo de envío)
 */
export default function CheckoutForm({ onSubmit, isSubmitting, subtotal }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      nombre: '',
      telefono: '',
      email: '',
      tipoEntrega: 'retiro',
      direccion: '',
      referencia: '',
      metodoPago: 'efectivo',
      notas: ''
    },
    mode: 'onBlur'
  })
  
  const tipoEntrega = watch('tipoEntrega')
  const isDelivery = tipoEntrega === 'delivery'
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Sección 1: Datos de Contacto */}
      <section>
        <h2 className="text-2xl font-bold text-navy mb-4 flex items-center gap-2">
          <User className="w-6 h-6" />
          Datos de Contacto
        </h2>
        
        <div className="space-y-4">
          {/* Nombre completo */}
          <Input
            label="Nombre completo"
            placeholder="Ej: María González"
            required
            error={errors.nombre?.message}
            leftIcon={<User className="w-5 h-5" />}
            {...register('nombre')}
          />
          
          {/* Teléfono */}
          <Input
            label="Teléfono (WhatsApp)"
            placeholder="Ej: 351 234 5678"
            type="tel"
            required
            error={errors.telefono?.message}
            leftIcon={<Phone className="w-5 h-5" />}
            helpText="Código de área + número (10 dígitos)"
            {...register('telefono')}
          />
          
          {/* Email (opcional) */}
          <Input
            label="Email (opcional)"
            placeholder="tu@email.com"
            type="email"
            error={errors.email?.message}
            leftIcon={<Mail className="w-5 h-5" />}
            helpText="Para recibir confirmación por correo"
            {...register('email')}
          />
        </div>
      </section>
      
      {/* Sección 2: Tipo de Entrega */}
      <section>
        <h2 className="text-2xl font-bold text-navy mb-4 flex items-center gap-2">
          <MapPin className="w-6 h-6" />
          Tipo de Entrega
        </h2>
        
        {/* Opciones de entrega */}
        <div className="mb-6">
          <DeliveryOptions
            value={tipoEntrega}
            onChange={(value) => setValue('tipoEntrega', value)}
            subtotal={subtotal}
          />
          {errors.tipoEntrega && (
            <p className="mt-2 text-sm text-red-600">{errors.tipoEntrega.message}</p>
          )}
        </div>
        
        {/* Campos condicionales para delivery */}
        {isDelivery && (
          <div className="space-y-4 animate-fadeIn">
            {/* Dirección */}
            <Input
              label="Dirección completa"
              placeholder="Calle, número, barrio"
              required
              error={errors.direccion?.message}
              leftIcon={<MapPin className="w-5 h-5" />}
              helpText="Incluí todos los datos necesarios"
              {...register('direccion')}
            />
            
            {/* Referencia */}
            <Input
              label="Referencias adicionales (opcional)"
              placeholder="Ej: Casa con portón blanco, timbre 2do piso"
              error={errors.referencia?.message}
              helpText="Cualquier dato que facilite la entrega"
              {...register('referencia')}
            />
          </div>
        )}
      </section>
      
      {/* Sección 3: Método de Pago */}
      <section>
        <h2 className="text-2xl font-bold text-navy mb-4">Método de Pago</h2>
        
        <div>
          <PaymentMethod
            value={watch('metodoPago')}
            onChange={(value) => setValue('metodoPago', value)}
          />
          {errors.metodoPago && (
            <p className="mt-2 text-sm text-red-600">{errors.metodoPago.message}</p>
          )}
        </div>
      </section>
      
      {/* Sección 4: Notas adicionales */}
      <section>
        <h2 className="text-2xl font-bold text-navy mb-4 flex items-center gap-2">
          <MessageSquare className="w-6 h-6" />
          Notas Adicionales (opcional)
        </h2>
        
        <div>
          <label className="block text-sm font-medium text-navy mb-2">
            ¿Algo que querés decirnos?
          </label>
          <textarea
            className={clsx(
              'w-full px-4 py-3 rounded-lg border transition-colors resize-none',
              'focus:outline-none focus:ring-2',
              errors.notas
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-blue focus:ring-blue/20'
            )}
            rows={4}
            placeholder="Ej: Preferencia de horario, ingredientes a evitar, mensaje en la torta..."
            maxLength={500}
            {...register('notas')}
          />
          <div className="flex justify-between items-center mt-2">
            {errors.notas ? (
              <p className="text-sm text-red-600">{errors.notas.message}</p>
            ) : (
              <p className="text-sm text-gray-500">
                Máximo 500 caracteres
              </p>
            )}
            <p className="text-sm text-gray-400">
              {watch('notas')?.length || 0}/500
            </p>
          </div>
        </div>
      </section>
      
      {/* Botón Submit */}
      <div className="pt-4 border-t border-gray-200">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          {isSubmitting ? 'Procesando pedido...' : 'Confirmar Pedido'}
        </Button>
        
        <p className="text-xs text-gray-500 text-center mt-3">
          Al confirmar, aceptás nuestros{' '}
          <a href="/terminos" className="text-blue hover:underline">
            términos y condiciones
          </a>
        </p>
      </div>
    </form>
  )
}
