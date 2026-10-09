import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  CheckCircle,
  Clock,
  Users,
  ArrowRight,
  Bot,
  GraduationCap,
  Briefcase,
  Layers,
  BookOpen,
  Calendar,
  CheckSquare
} from 'lucide-react';
import { siteContent } from '../data/siteContent';
import Button from '../components/Button';
import Card from '../components/Card';

export default function ServicesPage() {
  const { services, courses } = siteContent;
  const [searchParams, setSearchParams] = useSearchParams();

  // Active view tab: 'all' | 'commercial' | 'courses'
  const initialTab = searchParams.get('tab') === 'courses' ? 'courses' : 'commercial';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'courses') {
      setActiveTab('courses');
    } else if (tabParam === 'commercial') {
      setActiveTab('commercial');
    }
  }, [searchParams]);

  const categories = ['All', ...new Set(services.map((s) => s.category))];

  const filteredCommercial = selectedCategory === 'All'
    ? services
    : services.filter((s) => s.category === selectedCategory);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setSearchParams(newTab === 'all' ? {} : { tab: newTab });
  };

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 2.5rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.25rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(0, 210, 211, 0.1)',
            color: 'var(--cyan-primary)',
            fontSize: '0.8rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.85rem'
          }}
        >
          Comprehensive Aerial Solutions
        </div>
        <h1 style={{ fontSize: 'clamp(2.1rem, 4vw, 2.85rem)', fontWeight: '800', marginBottom: '0.85rem' }}>
          DroneTV Services & Training
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: '1.6' }}>
          Discover our full spectrum of enterprise drone operations — from agricultural crop spraying and 3D LiDAR topography to DGCA-authorized remote pilot licensing.
        </p>
      </div>

      {/* Main Mode Switcher Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.65rem',
          marginBottom: '2.5rem',
          flexWrap: 'wrap'
        }}
      >
        <button
          type="button"
          onClick={() => handleTabChange('commercial')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.35rem',
            borderRadius: 'var(--radius-full)',
            border: activeTab === 'commercial' ? '1px solid var(--cyan-primary)' : '1px solid var(--border-subtle)',
            backgroundColor: activeTab === 'commercial' ? 'rgba(0, 210, 211, 0.16)' : 'var(--bg-card)',
            color: activeTab === 'commercial' ? 'var(--cyan-primary)' : 'var(--text-muted)',
            fontWeight: activeTab === 'commercial' ? '700' : '500',
            fontSize: '0.92rem',
            cursor: 'pointer',
            transition: 'all 150ms ease'
          }}
        >
          <Briefcase size={16} />
          <span>Industrial Fleet Services ({services.length})</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('courses')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.35rem',
            borderRadius: 'var(--radius-full)',
            border: activeTab === 'courses' ? '1px solid var(--indigo-glow)' : '1px solid var(--border-subtle)',
            backgroundColor: activeTab === 'courses' ? 'rgba(99, 102, 241, 0.16)' : 'var(--bg-card)',
            color: activeTab === 'courses' ? '#a5b4fc' : 'var(--text-muted)',
            fontWeight: activeTab === 'courses' ? '700' : '500',
            fontSize: '0.92rem',
            cursor: 'pointer',
            transition: 'all 150ms ease'
          }}
        >
          <GraduationCap size={17} />
          <span>DGCA Pilot Training & Academy ({courses.length})</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('all')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.35rem',
            borderRadius: 'var(--radius-full)',
            border: activeTab === 'all' ? '1px solid var(--sky-blue)' : '1px solid var(--border-subtle)',
            backgroundColor: activeTab === 'all' ? 'rgba(56, 189, 248, 0.16)' : 'var(--bg-card)',
            color: activeTab === 'all' ? 'var(--sky-blue)' : 'var(--text-muted)',
            fontWeight: activeTab === 'all' ? '700' : '500',
            fontSize: '0.92rem',
            cursor: 'pointer',
            transition: 'all 150ms ease'
          }}
        >
          <Layers size={16} />
          <span>View All ({services.length + courses.length})</span>
        </button>
      </div>

      {/* Category Filter Pills for Commercial Services (if commercial or all tab active) */}
      {(activeTab === 'commercial' || activeTab === 'all') && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginRight: '0.25rem' }}>Industry Filter:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`quick-reply-pill ${selectedCategory === cat ? 'active' : ''}`}
              style={{
                padding: '0.35rem 0.85rem',
                fontSize: '0.82rem',
                backgroundColor: selectedCategory === cat ? 'var(--cyan-primary)' : 'rgba(255, 255, 255, 0.05)',
                color: selectedCategory === cat ? '#030712' : 'var(--text-muted)',
                border: selectedCategory === cat ? '1px solid var(--cyan-primary)' : '1px solid var(--border-subtle)',
                fontWeight: selectedCategory === cat ? '700' : '500'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* SECTION: Commercial Services Grid */}
      {(activeTab === 'commercial' || activeTab === 'all') && (
        <div style={{ marginBottom: activeTab === 'all' ? '4rem' : '2rem' }}>
          {activeTab === 'all' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
              <Briefcase size={20} style={{ color: 'var(--cyan-primary)' }} />
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Commercial Drone Services</h2>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.75rem' }}>
            {filteredCommercial.map((service) => (
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
                      <Button variant="primary" size="sm">
                        <span>Enquire for Service</span>
                        <ArrowRight size={14} />
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
                      <Bot size={15} />
                      <span>Ask Bot</span>
                    </Link>
                  </div>
                }
              >
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: '1.6' }}>
                  {service.fullDescription}
                </p>

                {/* Capabilities list */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    Operational Capabilities:
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                    {service.features.map((feat, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CheckCircle size={15} style={{ color: 'var(--cyan-primary)', flexShrink: 0 }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Meta details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-dim)', backgroundColor: 'var(--bg-input)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Users size={14} style={{ color: 'var(--sky-blue)' }} />
                    <span><strong>Target Sectors:</strong> {service.idealFor}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Clock size={14} style={{ color: 'var(--sky-blue)' }} />
                    <span><strong>Turnaround:</strong> {service.turnaroundTime}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: DGCA Pilot Training Courses Grid */}
      {(activeTab === 'courses' || activeTab === 'all') && (
        <div>
          {activeTab === 'all' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
              <GraduationCap size={22} style={{ color: '#a5b4fc' }} />
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>DGCA Pilot Courses & Certifications</h2>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.75rem' }}>
            {courses.map((course) => (
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
                    <Link to={`/contact?userType=Student&interest=${encodeURIComponent(course.title)}`}>
                      <Button variant="primary" size="sm">
                        <GraduationCap size={16} />
                        <span>Apply / Enquire</span>
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
                      <Bot size={15} />
                      <span>Ask Admission Bot</span>
                    </Link>
                  </div>
                }
              >
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1.15rem', lineHeight: '1.6' }}>
                  {course.fullDescription}
                </p>

                {/* Eligibility Box */}
                <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-input)', borderRadius: 'var(--radius-md)', marginBottom: '1.15rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <strong style={{ color: 'var(--cyan-primary)' }}>Eligibility:</strong> {course.eligibility}
                </div>

                {/* Syllabus Modules */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.5rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <BookOpen size={15} style={{ color: 'var(--cyan-primary)' }} />
                    <span>Curriculum Modules:</span>
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.84rem', color: 'var(--text-dim)' }}>
                    {course.syllabus.map((mod, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <CheckSquare size={14} style={{ color: 'var(--cyan-primary)', flexShrink: 0, marginTop: '0.2rem' }} />
                        <span>{mod}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Batch Schedule */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-dim)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                  <Calendar size={14} style={{ color: 'var(--cyan-primary)', flexShrink: 0 }} />
                  <span><strong>Schedule:</strong> {course.batchSchedule}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
