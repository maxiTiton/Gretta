/**
 * Cloudinary Service
 * Servicios para subir imágenes a Cloudinary
 */

import { env } from '../config/env'

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/upload`

// Tipos de archivo permitidos
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

/**
 * Validar archivo antes de subir
 */
function validateFile(file) {
  if (!file) {
    throw new Error('No se seleccionó ningún archivo')
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Tipo de archivo no permitido. Solo se aceptan: JPG, PNG, WEBP')
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('El archivo es muy grande. Tamaño máximo: 5MB')
  }
}

/**
 * Subir imagen a Cloudinary
 * @param {File} file - Archivo a subir
 * @param {Function} onProgress - Callback para progreso (opcional)
 * @returns {Promise<{url: string, publicId: string}>}
 */
export async function uploadImage(file, onProgress) {
  try {
    // Validar archivo
    validateFile(file)

    // Preparar FormData
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', env.CLOUDINARY_UPLOAD_PRESET)
    formData.append('folder', 'gretta/productos') // Organizar en carpetas

    // Crear XMLHttpRequest para tracking de progreso
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      // Tracking de progreso
      if (onProgress) {
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const percentComplete = (e.loaded / e.total) * 100
            onProgress(percentComplete)
          }
        })
      }

      // Manejo de respuesta
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText)
          resolve({
            url: response.secure_url,
            publicId: response.public_id,
            width: response.width,
            height: response.height,
            format: response.format,
          })
        } else {
          reject(new Error('Error al subir imagen a Cloudinary'))
        }
      })

      xhr.addEventListener('error', () => {
        reject(new Error('Error de red al subir imagen'))
      })

      xhr.addEventListener('abort', () => {
        reject(new Error('Subida de imagen cancelada'))
      })

      xhr.open('POST', CLOUDINARY_URL)
      xhr.send(formData)
    })
  } catch (error) {
    console.error('Error en uploadImage:', error)
    throw error
  }
}

/**
 * Eliminar imagen de Cloudinary
 * Nota: Para eliminar imágenes con unsigned preset, necesitas configurar
 * el preset para permitir eliminación o usar un endpoint backend
 * @param {string} publicId - ID público de la imagen
 */
export async function deleteImage(publicId) {
  try {
    // Para eliminar imágenes con unsigned preset, necesitarías un backend
    // Por ahora, solo logueamos
    console.log('Imagen para eliminar:', publicId)
    // La eliminación manual se puede hacer desde el dashboard de Cloudinary
    return { success: true, message: 'Eliminar desde dashboard de Cloudinary' }
  } catch (error) {
    console.error('Error al eliminar imagen:', error)
    throw error
  }
}

/**
 * Obtener URL optimizada de Cloudinary
 * @param {string} publicId - ID público de la imagen
 * @param {Object} transformations - Transformaciones (width, height, crop, quality)
 */
export function getOptimizedUrl(publicId, transformations = {}) {
  const { width, height, crop = 'fill', quality = 'auto' } = transformations

  let transformationString = `q_${quality}`

  if (width) transformationString += `,w_${width}`
  if (height) transformationString += `,h_${height}`
  if (crop) transformationString += `,c_${crop}`

  return `https://res.cloudinary.com/${env.CLOUDINARY_CLOUD_NAME}/image/upload/${transformationString}/${publicId}`
}
