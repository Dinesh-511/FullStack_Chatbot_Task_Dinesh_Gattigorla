import React from 'react';
import { HelpCircle } from 'lucide-react';

/**
 * Reusable Empty State Display Component
 * 
 * @param {Object} props
 * @param {React.ReactNode} [props.icon]
 * @param {string} props.title
 * @param {string} props.description
 * @param {React.ReactNode} [props.action] - Optional CTA button or link
 */
export default function EmptyState({
  icon,
  title,
  description,
  action
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        {icon || <HelpCircle size={28} />}
      </div>
      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-main)' }}>
        {title}
      </h3>
      <p style={{ maxWidth: '440px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        {description}
      </p>
      {action && <div style={{ marginTop: '0.85rem' }}>{action}</div>}
    </div>
  );
}
