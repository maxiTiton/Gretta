/**
 * ImageUpload Component
 * Componente para subir imágenes a Cloudinary
 */

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { uploadImage } from '../../services/cloudinary.service'
import Button from '../ui/Button'
import clsx from 'clsx'

export default function ImageUpload({ onUpload, currentImage, className }) {
  const [preview, setPreview] = useState(currentImage || null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState(null)
  const inputRef = useRef(null)

  const handleFile = async (file) => {
    if (!file) return

    setError(null)
    setUploading(true)
    setProgress(0)

    try {
      // Mostrar preview inmediato
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)

      // Subir a Cloudinary
      const result = await uploadImage(file, (percent) => {
        setProgress(percent)
      })

      // Notificar al padre
      if (onUpload) {
        onUpload(result.url, result)
      }

      setPreview(result.url)
    } catch (err) {
      console.error('Error al subir imagen:', err)
      setError(err.message || 'Error al subir imagen')
      setPreview(currentImage || null)
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleRemove = () => {
    setPreview(null)
    if (onUpload) {
      onUpload(null)
    }
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleChange}
        className="hidden"
        disabled={uploading}
      />

      {preview ? (
        <div className="relative">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100 border border-gray-300">
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-cover"
            />
            {uploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                  <p className="text-sm">{Math.round(progress)}%</p>
                </div>
              </div>
            )}
          </div>
          {!uploading && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-white shadow-md hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      ) : (
        <div
          className={clsx(
            'relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
            dragActive
              ? 'border-pink-500 bg-pink-50'
              : 'border-gray-300 hover:border-gray-400 bg-gray-50',
            uploading && 'pointer-events-none opacity-50'
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          {uploading ? (
            <div className="space-y-4">
              <Loader2 className="w-12 h-12 text-pink-500 animate-spin mx-auto" />
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Subiendo imagen...</p>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">{Math.round(progress)}%</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-full shadow-sm">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">
                  Click para seleccionar o arrastra una imagen
                </p>
                <p className="text-xs text-gray-500">
                  JPG, PNG o WEBP hasta 5MB
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
