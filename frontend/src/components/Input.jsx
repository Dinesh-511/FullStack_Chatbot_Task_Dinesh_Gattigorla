import React from 'react';

/**
 * Reusable Form Input / Textarea Component
 * 
 * @param {Object} props
 * @param {string} props.id - Input unique ID for accessibility label association
 * @param {string} props.label - Human readable label
 * @param {string} [props.error] - Inline error message
 * @param {string} [props.helperText] - Subtitle helper instructions
 * @param {boolean} [props.required=false]
 * @param {boolean} [props.multiline=false] - Renders <textarea> if true
 * @param {string} [props.type='text']
 * @param {string|number} props.value
 * @param {Function} props.onChange
 * @param {Function} [props.onBlur]
 * @param {string} [props.placeholder='']
 * @param {boolean} [props.disabled=false]
 * @param {number} [props.rows=3]
 */
export default function Input({
  id,
  label,
  error,
  helperText,
  required = false,
  multiline = false,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder = '',
  disabled = false,
  rows = 3,
  ...rest
}) {
  const errorId = error ? `${id}-error` : undefined;
  const helpId = helperText ? `${id}-help` : undefined;

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="form-label">
          <span>
            {label}
            {required && <span className="form-required">*</span>}
          </span>
        </label>
      )}

      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          className={`form-control ${error ? 'has-error' : ''}`}
          aria-invalid={!!error}
          aria-describedby={errorId || helpId}
          {...rest}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`form-control ${error ? 'has-error' : ''}`}
          aria-invalid={!!error}
          aria-describedby={errorId || helpId}
          {...rest}
        />
      )}

      {error ? (
        <span id={errorId} className="form-error-msg" role="alert">
          {error}
        </span>
      ) : helperText ? (
        <span id={helpId} className="form-help-text">
          {helperText}
        </span>
      ) : null}
    </div>
  );
}
