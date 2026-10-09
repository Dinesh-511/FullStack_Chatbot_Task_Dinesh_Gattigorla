import React from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  Send,
  Award,
  Compass,
  CheckCircle,
  ArrowRight,
  Shield,
  Zap,
  Layers,
  MapPin
} from 'lucide-react';
import { siteContent } from '../data/siteContent';
import Button from '../components/Button';
import Card from '../components/Card';

export default function HomePage() {
  const { company, services, courses, faqs } = siteContent;

  return (
    <div className="page-wrapper">
      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '3rem 1rem 4.5rem', maxWidth: '860px', margin: '0 auto' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.95rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(0, 210, 211, 0.1)',
            border: '1px solid rgba(0, 210, 211, 0.25)',
            color: 'var(--cyan-primary)',
            fontSize: '0.85rem',
            fontWeight: '600',
            marginBottom: '1.5rem'
          }}
        >
          <Zap size={14} />
          <span>Next-Generation Commercial Drone Operations & Pilot Academy</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.1rem, 5vw, 3.4rem)', fontWeight: '900', letterSpacing: '-0.03em', lineHeight: '1.15', marginBottom: '1.25rem' }}>
          Autonomous Aerial Intelligence & <span className="text-gradient">DGCA Pilot Training</span>
        </h1>

        <p style={{ fontSize: '1.12rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2.25rem', maxWidth: '720px', margin: '0 auto 2.25rem' }}>
          {company.shortDescription} Explore drone crop spraying, centimeter-grade LiDAR topography, and certified remote pilot courses with instant AI support.
        </p>

        {/* Dual Primary CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/chat">
            <Button variant="primary" size="lg">
              <Bot size={20} />
              <span>Chat With Our AI Assistant</span>
            </Button>
          </Link>

          <Link to="/contact">
            <Button variant="secondary" size="lg">
              <Send size={18} />
              <span>Submit Project Enquiry</span>
            </Button>
          </Link>
        </div>

        {/* Operational Proof Points */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.25rem',
            marginTop: '3.5rem',
            padding: '1.5rem',
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--cyan-primary)' }}>500+</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>DGCA Pilots Certified</div>
          </div>
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--sky-blue)' }}>40,000+</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Acres Farmland Sprayed</div>
          </div>
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--drone-teal)' }}>99.8%</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Flight Safety Record</div>
          </div>
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#a855f7' }}>24/7</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>AI Lead & Support Bot</div>
          </div>
        </div>
      </section>

      {/* Featured Industrial Services Preview */}
      <section style={{ margin: '3rem 0 4.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--cyan-primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Commercial Fleet Capabilities
            </div>
            <h2 style={{ fontSize: '2rem', marginTop: '0.35rem' }}>Industrial Drone Services</h2>
          </div>
          <Link to="/services">
            <Button variant="ghost" size="sm">
              <span>View All Services</span>
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {services.slice(0, 3).map((service) => (
            <Card
              key={service.id}
              title={service.title}
              badge={
                <span className="badge badge-new" style={{ fontSize: '0.72rem' }}>
                  {service.category}
                </span>
              }
              footer={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.65rem' }}>
                  <Link to={`/contact?interest=${encodeURIComponent(service.title)}&userType=Customer`}>
                    <Button variant="outline" size="sm">
                      Enquire Now
                    </Button>
                  </Link>
                  <Link
                    to={`/chat?query=${encodeURIComponent(`Tell me about ${service.title}`)}&interest=${encodeURIComponent(service.title)}&userType=Customer`}
                    style={{
                      fontSize: '0.82rem',
                      color: 'var(--cyan-primary)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.35rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'rgba(0, 210, 211, 0.08)',
                      border: '1px solid rgba(0, 210, 211, 0.25)',
                      transition: 'all 150ms ease'
                    }}
                  >
                    <Bot size={14} /> Ask Bot About This
                  </Link>
                </div>
              }
            >
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.5' }}>
                {service.shortDescription}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.83rem', color: 'var(--text-dim)' }}>
                {service.features.slice(0, 2).map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <CheckCircle size={14} style={{ color: 'var(--cyan-primary)', flexShrink: 0 }} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Training & DGCA Pilot Courses Preview */}
      <section style={{ margin: '3rem 0 4.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--cyan-primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              DGCA Certified Training Academy
            </div>
            <h2 style={{ fontSize: '2rem', marginTop: '0.35rem' }}>Drone Pilot License & Tech Courses</h2>
          </div>
          <Link to="/services?tab=courses">
            <Button variant="ghost" size="sm">
              <span>View All Courses</span>
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {courses.slice(0, 3).map((course) => (
            <Card
              key={course.id}
              title={course.title}
              badge={
                <span className="badge badge-progress" style={{ fontSize: '0.72rem' }}>
                  {course.duration}
                </span>
              }
              footer={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.65rem' }}>
                  <Link to={`/contact?interest=${encodeURIComponent(course.title)}&userType=Student`}>
                    <Button variant="primary" size="sm">
                      Apply / Enquire
                    </Button>
                  </Link>
                  <Link
                    to={`/chat?query=${encodeURIComponent(`Tell me about ${course.title}`)}&interest=${encodeURIComponent(course.title)}&userType=Student`}
                    style={{
                      fontSize: '0.82rem',
                      color: 'var(--cyan-primary)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.35rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'rgba(0, 210, 211, 0.08)',
                      border: '1px solid rgba(0, 210, 211, 0.25)',
                      transition: 'all 150ms ease'
                    }}
                  >
                    <Bot size={14} /> Ask Bot About Course
                  </Link>
                </div>
              }
            >
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.5' }}>
                {course.shortDescription}
              </p>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
                <strong>Highlights:</strong> {course.syllabus[0]}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Interactive AI Chatbot Teaser Banner */}
      <section
        style={{
          margin: '3rem 0 4.5rem',
          padding: '2.5rem',
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, rgba(11, 26, 54, 0.95), rgba(9, 14, 26, 0.95))',
          border: '1px solid var(--border-accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem',
          boxShadow: 'var(--shadow-glow)'
        }}
      >
        <div style={{ maxWidth: '580px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--cyan-primary)', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.75rem' }}>
            <Bot size={18} />
            <span>INSTANT RULE-BASED INTELLIGENCE</span>
          </div>
          <h2 style={{ fontSize: '1.85rem', marginBottom: '0.75rem' }}>
            Have Questions About DGCA Certification or Drone Hire?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            Our built-in rule-based AI Assistant is ready right now to answer your course prerequisites, flight capabilities, batch timetables, and immediately capture your admissions or service enquiries.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '280px' }}>
          <Link to="/chat">
            <Button variant="primary" size="lg" style={{ width: '100%' }}>
              <Bot size={18} />
              <span>Launch Full Chat</span>
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="md" style={{ width: '100%' }}>
              <span>Leave Direct Message</span>
            </Button>
          </Link>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section style={{ margin: '3rem 0' }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--cyan-primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Knowledge Base
          </div>
          <h2 style={{ fontSize: '2rem', marginTop: '0.35rem' }}>Frequently Asked Questions</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {faqs.map((faq, index) => (
            <Card key={index} title={faq.question}>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                {faq.answer}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
