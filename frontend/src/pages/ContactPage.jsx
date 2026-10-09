import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Bot
} from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { validateEnquiryForm, validateField } from '../utils/validators';
import { submitEnquiry } from '../services/api';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import Card from '../components/Card';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const { contact, services, courses } = siteContent;

  const urlUserType = searchParams.get('userType') || 'Customer';
  const urlInterest = searchParams.get('interest') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userType: ['Student', 'Customer', 'Other'].includes(urlUserType) ? urlUserType : 'Customer',
    interest: urlInterest,
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successData, setSuccessData] = useState(null);

  // Sync if URL search params change
  useEffect(() => {
    if (urlInterest) {
      setFormData((prev) => ({ ...prev, interest: urlInterest }));
    }
    if (urlUserType && ['Student', 'Customer', 'Other'].includes(urlUserType)) {
      setFormData((prev) => ({ ...prev, userType: urlUserType }));
    }
  }, [urlInterest, urlUserType]);

  // Combined dropdown list of services and courses
  const interestOptions = [
    ...services.map((s) => ({ label: `[Service] ${s.title}`, value: s.title })),
    ...courses.map((c) => ({ label: `[Course] ${c.title}`, value: c.title })),
    { label: 'Other / General Inquiry', value: 'Other / General Inquiry' }
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleBlur = (field) => {
    const err = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validation = validateEnquiryForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitEnquiry(formData);
      if (res.success) {
        setSuccessData(res.data);
      } else {
        setServerError(res.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors);
      }
      setServerError(err.message || 'Unable to connect to DroneTV servers. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      userType: 'Customer',
      interest: '',
      message: ''
    });
    setErrors({});
    setServerError('');
    setSuccessData(null);
  };

  return (
    <div className="page-wrapper">
      {/* Page Title */}
      <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: '800', marginBottom: '0.85rem' }}>
          Connect with Drone<span style={{ color: 'var(--cyan-primary)' }}>TV</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>
          Have a commercial flight requirement or questions regarding DGCA pilot certification? Submit an enquiry below or visit our Bengaluru flight operations base.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'flex-start' }}>
        {/* Enquiry Form Box */}
        <div className="card" style={{ padding: '2rem' }}>
          {successData ? (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                <CheckCircle2 size={36} />
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.65rem' }}>
                Enquiry Received!
              </h2>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                Thank you, <strong>{successData.name}</strong>. Your enquiry has been registered in our system. A DroneTV flight advisor or admissions coordinator will contact you via email or phone within 1 business day.
              </p>

              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-input)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '1.75rem', display: 'inline-block' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)', display: 'block' }}>Reference Tracking ID:</span>
                <span style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--cyan-primary)', letterSpacing: '0.05em' }}>
                  {successData.referenceId || `DTV-${successData._id?.slice(-6).toUpperCase()}`}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem' }}>
                <Button variant="outline" size="md" onClick={handleReset}>
                  Submit Another Enquiry
                </Button>
                <Link to="/chat">
                  <Button variant="secondary" size="md">
                    <Bot size={16} />
                    <span>Try Chatbot</span>
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                Official Enquiry & Consultation Form
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Please fill in all required fields. We review and acknowledge every enquiry promptly.
              </p>

              {serverError && (
                <div style={{ padding: '0.85rem 1rem', marginBottom: '1.25rem', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-md)', color: '#f87171', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertCircle size={18} />
                  <span>{serverError}</span>
                </div>
              )}

              {/* User Type Selector */}
              <div style={{ marginBottom: '1.15rem' }}>
                <label className="form-label">
                  <span>I am inquiring as: <span className="form-required">*</span></span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '0.35rem' }}>
                  {['Student', 'Customer', 'Other'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleChange('userType', type)}
                      style={{
                        padding: '0.65rem 0.5rem',
                        borderRadius: 'var(--radius-md)',
                        border: formData.userType === type ? '1px solid var(--cyan-primary)' : '1px solid var(--border-subtle)',
                        backgroundColor: formData.userType === type ? 'rgba(0, 210, 211, 0.15)' : 'var(--bg-input)',
                        color: formData.userType === type ? 'var(--cyan-primary)' : 'var(--text-muted)',
                        fontSize: '0.88rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <Input
                id="contact-name"
                label="Full Name"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                placeholder="e.g. Priya Sundaram"
                error={errors.name}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <Input
                  id="contact-email"
                  type="email"
                  label="Email Address"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="e.g. priya@example.com"
                  error={errors.email}
                />

                <Input
                  id="contact-phone"
                  type="tel"
                  label="Mobile Number (India)"
                  required
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  placeholder="e.g. 9840234567"
                  error={errors.phone}
                  helperText="10-digit Indian mobile number"
                />
              </div>

              <Select
                id="contact-interest"
                label="Area of Interest"
                required
                value={formData.interest}
                onChange={(e) => handleChange('interest', e.target.value)}
                onBlur={() => handleBlur('interest')}
                options={interestOptions}
                placeholder="Select service or course"
                error={errors.interest}
              />

              <Input
                id="contact-message"
                label="Detailed Message / Requirement"
                required
                multiline
                rows={4}
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                onBlur={() => handleBlur('message')}
                placeholder="Provide project details, farm acreage, preferred training batch, or specific questions..."
                error={errors.message}
              />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', flexWrap: 'wrap', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                  <ShieldCheck size={16} style={{ color: 'var(--cyan-primary)' }} />
                  <span>Privacy guaranteed. No spam policy.</span>
                </div>

                <Button type="submit" variant="primary" size="md" loading={submitting}>
                  <Send size={16} />
                  <span>Submit Official Enquiry</span>
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Contact Info & Office Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card title="Flight Base & Headquarters">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.92rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <MapPin size={20} style={{ color: 'var(--cyan-primary)', flexShrink: 0, marginTop: '0.2rem' }} />
                <div>
                  <strong>Registered Office:</strong>
                  <div>{contact.officeAddress}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <MapPin size={20} style={{ color: 'var(--sky-blue)', flexShrink: 0, marginTop: '0.2rem' }} />
                <div>
                  <strong>Flight Test Range & RPTO Airfield:</strong>
                  <div>{contact.flyingFieldAddress}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={18} style={{ color: 'var(--cyan-primary)', flexShrink: 0 }} />
                <div>
                  <strong>Phone / WhatsApp:</strong> {contact.phone}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail size={18} style={{ color: 'var(--cyan-primary)', flexShrink: 0 }} />
                <div>
                  <strong>Direct Inquiries:</strong> {contact.email}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Clock size={18} style={{ color: 'var(--cyan-primary)', flexShrink: 0 }} />
                <div>
                  <strong>Hours:</strong> {contact.workingHours}
                </div>
              </div>
            </div>
          </Card>

          {/* Interactive Chatbot Callout */}
          <Card
            title="Prefer Instant Answers?"
            subtitle="Chat directly with our rule-based DroneTV AI assistant"
            style={{ backgroundColor: 'rgba(0, 210, 211, 0.05)', borderColor: 'var(--border-accent)' }}
          >
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
              Skip the wait! Our automated assistant answers predefined queries regarding DGCA licensing, course fees, fleet specifications, and can capture your lead directly in chat.
            </p>
            <Link to="/chat">
              <Button variant="primary" size="sm" style={{ width: '100%' }}>
                <Bot size={16} />
                <span>Open DroneTV Assistant</span>
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
