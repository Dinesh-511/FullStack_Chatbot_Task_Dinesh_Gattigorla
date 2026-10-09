import React from 'react';

/**
 * Reusable Select Dropdown Component
 * 
 * @param {Object} props
 * @param {string} props.id
 * @param {string} props.label
 * @param {string} [props.error]
 * @param {string} [props.helperText]
 * @param {boolean} [props.required=false]
 * @param {string|number} props.value
 * @param {Function} props.onChange
 * @param {Function} [props.onBlur]
 * @param {Array<string|{value: string, label: string}>} props.options
 * @param {string} [props.placeholder='Select an option']
 * @param {boolean} [props.disabled=false]
 */
export default function Select({
  id,
  label,
  error,
  helperText,
  required = false,
  value,
  onChange,
  onBlur,
  options = [],
  placeholder = 'Select an option',
  disabled = false,
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

      <select
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`form-control ${error ? 'has-error' : ''}`}
        aria-invalid={!!error}
        aria-describedby={errorId || helpId}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            -- {placeholder} --
          </option>
        )}
        {options.map((opt, idx) => {
          const val = typeof opt === 'object' ? opt.value : opt;
          const lbl = typeof opt === 'object' ? opt.label : opt;
          return (
            <option key={`${val}-${idx}`} value={val}>
              {lbl}
            </option>
          );
        })}
      </select>

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
