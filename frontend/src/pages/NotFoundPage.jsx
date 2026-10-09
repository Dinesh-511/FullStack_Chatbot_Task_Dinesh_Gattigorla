import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Bot, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';

export default function NotFoundPage() {
  return (
    <div className="page-wrapper" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          backgroundColor: 'rgba(0, 210, 211, 0.1)',
          color: 'var(--cyan-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem'
        }}
      >
        <Compass size={36} />
      </div>

      <h1 style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
        404
      </h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
        Flight Path Not Found
      </h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: '440px', margin: '0 auto 2rem' }}>
        The page or airspace waypoint you are looking for does not exist or may have been relocated.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Link to="/">
          <Button variant="primary" size="md">
            <ArrowLeft size={16} />
            <span>Return to Home</span>
          </Button>
        </Link>
        <Link to="/chat">
          <Button variant="secondary" size="md">
            <Bot size={16} />
            <span>Ask Chatbot</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
