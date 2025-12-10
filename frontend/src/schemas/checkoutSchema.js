/**
 * Checkout Validation Schema
 * Esquema de validación con Zod para el formulario de checkout
 */

import { z } from 'zod'

export const checkoutSchema = z.object({
  // Datos de contacto
  nombre: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre es muy largo')
    .trim(),
  
  telefono: z.string()
    .min(10, 'Ingresá un teléfono válido')
    .regex(/^(\+?54)?3\d{9}$/, 'Formato: 351XXXXXXX o +54351XXXXXXX')
    .trim(),
  
  email: z.string()
    .email('Ingresá un email válido')
    .optional()
    .or(z.literal('')),
  
  // Tipo de entrega
  tipoEntrega: z.enum(['retiro', 'delivery'], {
    required_error: 'Seleccioná un tipo de entrega'
  }),
  
  // Dirección (solo para delivery)
  direccion: z.string().optional(),
  
  referencia: z.string().optional(),
  
  // Método de pago
  metodoPago: z.enum(['efectivo', 'transferencia', 'mercadopago'], {
    required_error: 'Seleccioná un método de pago'
  }),
  
  // Notas adicionales
  notas: z.string()
    .max(500, 'Máximo 500 caracteres')
    .optional()
    
}).refine((data) => {
  // Validar que si es delivery, debe haber dirección
  if (data.tipoEntrega === 'delivery') {
    return data.direccion && data.direccion.trim().length >= 10
  }
  return true
}, {
  message: 'La dirección es requerida para delivery (mínimo 10 caracteres)',
  path: ['direccion']
})
