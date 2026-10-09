import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

/**
 * Toast Alert Component
 * 
 * @param {Object} props
 * @param {string} props.id
 * @param {string} props.message
 * @param {'success'|'error'|'info'} [props.type='success']
 * @param {Function} props.onDismiss
 * @param {number} [props.duration=4000]
 */
export default function Toast({
  id,
  message,
  type = 'success',
  onDismiss,
  duration = 4000
}) {
  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(() => {
      onDismiss(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onDismiss]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={18} style={{ color: '#10b981', flexShrink: 0 }} />;
      case 'error':
        return <AlertCircle size={18} style={{ color: '#f87171', flexShrink: 0 }} />;
      default:
        return <Info size={18} style={{ color: '#38bdf8', flexShrink: 0 }} />;
    }
  };

  return (
    <div className={`toast toast-${type}`} role="alert" aria-live="assertive">
      {getIcon()}
      <div style={{ flex: 1, wordBreak: 'break-word' }}>{message}</div>
      <button
        type="button"
        onClick={() => onDismiss(id)}
        aria-label="Dismiss notification"
        style={{
          background: 'transparent',
          border: 'none',
          color: 'currentColor',
          cursor: 'pointer',
          padding: '0.2rem',
          opacity: 0.8,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <X size={15} />
      </button>
    </div>
  );
}

/**
 * Toast Container for fixed stacking
 */
export function ToastContainer({ toasts = [], onDismiss }) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
}
