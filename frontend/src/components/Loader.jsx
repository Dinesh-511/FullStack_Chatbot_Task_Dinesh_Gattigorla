import React from 'react';

/**
 * Accessible Loader Spinner Component
 * 
 * @param {Object} props
 * @param {string} [props.label='Loading...'] - Screen-reader label and optional subtitle
 * @param {boolean} [props.fullPage=false] - Centers loader in full container height
 * @param {'sm'|'md'|'lg'} [props.size='md']
 */
export default function Loader({
  label = 'Loading...',
  fullPage = false,
  size = 'md'
}) {
  const sizeClass = size === 'lg' ? 'spinner-lg' : '';

  const content = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.85rem',
        padding: '2rem'
      }}
      role="status"
      aria-live="polite"
    >
      <span className={`spinner ${sizeClass}`} aria-hidden="true" />
      <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        {label}
      </span>
      <span className="sr-only" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}>
        {label}
      </span>
    </div>
  );

  if (fullPage) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          width: '100%'
        }}
      >
        {content}
      </div>
    );
  }

  return content;
}
