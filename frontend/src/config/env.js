/**
 * Environment Variables Validation
 * Validación de variables de entorno requeridas
 */

/**
 * Validar que las variables de entorno estén configuradas
 * @throws {Error} Si falta alguna variable requerida
 */
export function validateEnv() {
  const requiredEnvVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_MP_PUBLIC_KEY',
    'VITE_CLOUDINARY_CLOUD_NAME',
    'VITE_CLOUDINARY_UPLOAD_PRESET',
  ]

  const missingVars = requiredEnvVars.filter(
    (varName) => !import.meta.env[varName]
  )

  if (missingVars.length > 0) {
    throw new Error(
      `Faltan las siguientes variables de entorno: ${missingVars.join(', ')}\n` +
      'Por favor, configura un archivo .env.local basado en .env.example'
    )
  }
}

// Exportar variables de entorno de forma tipada
export const env = {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  MP_PUBLIC_KEY: import.meta.env.VITE_MP_PUBLIC_KEY,
  CLOUDINARY_CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Gretta',
  APP_URL: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
}
