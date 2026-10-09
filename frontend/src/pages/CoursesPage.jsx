import React from 'react';
import { Link } from 'react-router-dom';
import { Award, BookOpen, Calendar, CheckSquare, GraduationCap, ArrowRight, Bot } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import Button from '../components/Button';
import Card from '../components/Card';

export default function CoursesPage() {
  const { courses } = siteContent;

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2.5rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.25rem 0.8rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(99, 102, 241, 0.12)',
            color: '#a5b4fc',
            fontSize: '0.8rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.85rem'
          }}
        >
          Authorized Flight Training Academy
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: '800', marginBottom: '0.85rem' }}>
          DGCA Drone Pilot Licenses & Technical Courses
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>
          Kickstart your career in India's booming unmanned aviation industry. Learn from certified flight instructors at our DGCA-authorized airfield with cutting-edge simulators and hands-on dual control flying.
        </p>
      </div>

      {/* Courses List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
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
              <span><strong>Upcoming Schedule:</strong> {course.batchSchedule}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
