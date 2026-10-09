import React from 'react';

/**
 * Reusable Card Container Component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.title]
 * @param {string} [props.subtitle]
 * @param {React.ReactNode} [props.badge]
 * @param {React.ReactNode} [props.footer]
 * @param {string} [props.className='']
 * @param {Function} [props.onClick]
 */
export default function Card({
  children,
  title,
  subtitle,
  badge,
  footer,
  className = '',
  onClick,
  ...rest
}) {
  return (
    <article
      className={`card ${className}`.trim()}
      onClick={onClick}
      {...rest}
    >
      {(title || badge) && (
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.85rem' }}>
          <div>
            {title && <h3 style={{ fontSize: '1.18rem', fontWeight: '700' }}>{title}</h3>}
            {subtitle && <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{subtitle}</p>}
          </div>
          {badge && <div>{badge}</div>}
        </div>
      )}

      <div>{children}</div>

      {footer && (
        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          {footer}
        </div>
      )}
    </article>
  );
}
