import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Bot, Menu, X, Shield } from 'lucide-react';
import Button from './Button';

/**
 * Responsive Sticky Navbar Header
 */
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo & Name */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu} aria-label="DroneTV Home">
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
          <div>
            <span style={{ color: 'var(--text-main)', letterSpacing: '-0.01em' }}>Drone</span>
            <span style={{ color: 'var(--cyan-primary)' }}>TV</span>
          </div>
          <span className="brand-tag">
            AI Support
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav aria-label="Main Navigation">
          <ul className="navbar-nav">
            <li>
              <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Contact & Enquiry
              </NavLink>
            </li>
            <li>
              <Link to="/chat">
                <Button variant="primary" size="sm">
                  <Bot size={16} />
                  <span>Launch Chatbot</span>
                </Button>
              </Link>
            </li>
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.88rem' }}
                title="Admin Dashboard"
              >
                <Shield size={15} />
                <span>Admin</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Hamburger Mobile Menu Toggle Button */}
        <button
          type="button"
          className="hamburger-btn"
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Backdrop & Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-backdrop" onClick={closeMobileMenu} aria-hidden="true" />
      )}

      <div className={`mobile-nav-menu ${mobileMenuOpen ? 'open' : ''}`} role="region" aria-label="Mobile Navigation">
        <NavLink
          to="/"
          end
          onClick={closeMobileMenu}
          className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/services"
          onClick={closeMobileMenu}
          className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
        >
          Services
        </NavLink>
        <NavLink
          to="/contact"
          onClick={closeMobileMenu}
          className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
        >
          Contact & Enquiry
        </NavLink>
        <NavLink
          to="/admin"
          onClick={closeMobileMenu}
          className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
        >
          Admin Portal
        </NavLink>
        <div style={{ marginTop: '0.85rem' }}>
          <Link to="/chat" onClick={closeMobileMenu} style={{ display: 'block' }}>
            <Button variant="primary" size="md" style={{ width: '100%', justifyContent: 'center' }}>
              <Bot size={18} />
              <span>Launch DroneTV AI Chatbot</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
