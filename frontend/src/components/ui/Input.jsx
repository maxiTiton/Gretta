import React from 'react'
import { clsx } from 'clsx'

/**
 * Input Component
 * Campo de entrada reutilizable con label, validación y manejo de errores
 * 
 * @param {Object} props
 * @param {string} [props.label] - Label del input
 * @param {string} [props.type='text'] - Tipo de input (text, email, password, number, tel)
 * @param {string} [props.placeholder] - Placeholder del input
 * @param {string} [props.value] - Valor del input
 * @param {Function} [props.onChange] - Función onChange
 * @param {string} [props.error] - Mensaje de error
 * @param {boolean} [props.disabled=false] - Estado deshabilitado
 * @param {boolean} [props.required=false] - Campo requerido
 * @param {string} [props.className] - Clases CSS adicionales para el contenedor
 * @param {React.ReactNode} [props.icon] - Icono opcional a la izquierda
 * @param {string} [props.id] - ID del input
 * @param {string} [props.name] - Name del input
 * 
 * @example
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="tu@email.com"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   error={errors.email}
 *   required
 * />
 */
const Input = React.forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  className = '',
  icon,
  id,
  name,
  ...props
}, ref) => {
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`
  
  const inputClasses = clsx(
    'w-full px-4 py-2.5 border rounded-lg transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent',
    'placeholder:text-gray-400',
    {
      'border-red-500 focus:ring-red-500': error,
      'border-gray-300': !error,
      'opacity-50 cursor-not-allowed bg-gray-50': disabled,
      'pl-10': icon,
    }
  )
  
  return (
    <div className={clsx('w-full', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-navy mb-1.5"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={inputClasses}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-1.5 text-sm text-red-500 flex items-start">
          <span className="mr-1">⚠</span>
          {error}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
