/**
 * Supabase Client Configuration
 * Cliente y configuración de Supabase
 * 
 * TODO:
 * - Importar createClient de @supabase/supabase-js
 * - Crear cliente con URL y ANON_KEY de variables de entorno
 * - Exportar cliente para uso en services
 * - Configurar opciones de auth si es necesario
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// TODO: Validar que las variables de entorno estén configuradas

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
