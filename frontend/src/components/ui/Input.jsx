const Input = ({
  label,
  error,
  success,
  helperText,
  id,
  className = '',
  ...props
}) => {
  const inputClasses = `input-field ${
    error ? 'input-error' : success ? 'input-success' : ''
  } ${className}`

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-pure-white mb-2"
        >
          {label}
        </label>
      )}
      
      <input
        id={id}
        className={inputClasses}
        {...props}
      />
      
      {helperText && (
        <p className={`mt-2 text-sm ${
          error ? 'text-error-light' : success ? 'text-success-light' : 'text-muted-gray'
        }`}>
          {helperText}
        </p>
      )}
    </div>
  )
}

export default Input
