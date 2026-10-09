import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { siteContent } from '../data/siteContent';

/**
 * Site Footer Component
 */
export default function Footer() {
  const { company, contact } = siteContent;

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Brand Summary */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
            <div className="brand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M4.5 4.5l4.5 4.5" />
                <path d="M19.5 4.5l-4.5 4.5" />
                <path d="M4.5 19.5l4.5 -4.5" />
                <path d="M19.5 19.5l-4.5 -4.5" />
                <circle cx="4" cy="4" r="2" />
                <circle cx="20" cy="4" r="2" />
                <circle cx="4" cy="20" r="2" />
                <circle cx="20" cy="20" r="2" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>
              Drone<span style={{ color: 'var(--cyan-primary)' }}>TV</span>
            </h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.15rem', maxWidth: '360px' }}>
            {company.tagline}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--cyan-primary)' }}>
            <ShieldCheck size={16} />
            <span>Authorized Commercial Operations & Training Academy</span>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Quick Links
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
            <li>
              <Link to="/" style={{ color: 'var(--text-muted)', transition: 'color 150ms' }}>
                Home & Overview
              </Link>
            </li>
            <li>
              <Link to="/services" style={{ color: 'var(--text-muted)' }}>
                Industrial Services
              </Link>
            </li>
            <li>
              <Link to="/services?tab=courses" style={{ color: 'var(--text-muted)' }}>
                DGCA Pilot Courses
              </Link>
            </li>
            <li>
              <Link to="/contact" style={{ color: 'var(--text-muted)' }}>
                Enquiry & Support Form
              </Link>
            </li>
            <li>
              <Link to="/chat" style={{ color: 'var(--cyan-primary)', fontWeight: '600' }}>
                Launch Interactive Chatbot
              </Link>
            </li>
          </ul>
        </div>

        {/* Services & Training Categories */}
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Capabilities
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            <li>Agricultural Spraying & NDVI</li>
            <li>3D Photogrammetry & LiDAR</li>
            <li>Solar & Industrial Thermal Audits</li>
            <li>DGCA Remote Pilot License (RPC)</li>
            <li>Drone Assembly & Maintenance</li>
          </ul>
        </div>

        {/* Contact Information & Working Hours */}
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Flight Operations Center
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}>
              <MapPin size={17} style={{ color: 'var(--cyan-primary)', flexShrink: 0, marginTop: '0.2rem' }} />
              <span>{contact.officeAddress}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <Phone size={16} style={{ color: 'var(--cyan-primary)', flexShrink: 0 }} />
              <span>{contact.phone}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <Mail size={16} style={{ color: 'var(--cyan-primary)', flexShrink: 0 }} />
              <span>{contact.email}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}>
              <Clock size={16} style={{ color: 'var(--cyan-primary)', flexShrink: 0, marginTop: '0.2rem' }} />
              <span>{contact.workingHours}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          © {new Date().getFullYear()} {company.name}. All rights reserved. Original portfolio demonstration app.
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="/contact" style={{ color: 'var(--text-dim)' }}>
            Legal & Compliance
          </Link>
          <Link to="/admin" style={{ color: 'var(--text-dim)' }}>
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
