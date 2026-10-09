import React from 'react';
import { Bot, Shield, Sparkles } from 'lucide-react';
import ChatInterface from '../components/ChatInterface';

export default function ChatPage() {
  return (
    <div className="page-wrapper" style={{ paddingBottom: '2rem' }}>
      <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--cyan-primary)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>
            <Sparkles size={14} />
            <span>Interactive Virtual Support</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '0.15rem' }}>
            DroneTV AI Support & Lead Assistant
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-dim)', backgroundColor: 'var(--bg-card)', padding: '0.45rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)' }}>
          <Shield size={14} style={{ color: 'var(--cyan-primary)' }} />
          <span>Rule-Based Intelligent Engine • Session Persisted</span>
        </div>
      </div>

      {/* Embedded Full-Page Chat Interface */}
      <ChatInterface isWidget={false} />
    </div>
  );
}
