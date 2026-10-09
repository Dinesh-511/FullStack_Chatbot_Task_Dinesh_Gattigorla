import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, X, ShieldCheck } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { validateEnquiryForm, validateField } from '../utils/validators';
import { submitEnquiry } from '../services/api';
import Button from './Button';
import Input from './Input';
import Select from './Select';

/**
 * In-Chat Lead / Enquiry Drawer Form
 * Embedded right within the chat experience for seamless lead capture.
 */
export default function ChatEnquiryForm({
  isOpen,
  onClose,
  initialUserType = 'Customer',
  initialInterest = '',
  onSubmitted
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userType: initialUserType || 'Customer',
    interest: initialInterest || '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successInfo, setSuccessInfo] = useState(null);

  // Sync initial preselection when passed from chatbot intent
  useEffect(() => {
    if (initialUserType) {
      setFormData((prev) => ({
        ...prev,
        userType: initialUserType,
        interest: initialInterest || prev.interest
      }));
    }
  }, [initialUserType, initialInterest]);

  if (!isOpen) return null;

  // Build combined interest dropdown options from siteContent
  const interestOptions = [
    { label: '-- Industrial Drone Services --', value: '', disabled: true },
    ...siteContent.services.map((s) => ({ label: `Service: ${s.title}`, value: s.title })),
    { label: '-- DGCA & Technical Courses --', value: '', disabled: true },
    ...siteContent.courses.map((c) => ({ label: `Course: ${c.title}`, value: c.title })),
    { label: 'Other / General Inquiry', value: 'Other / General Inquiry' }
  ].filter((opt) => !opt.disabled);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear inline error when typing
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
        setSuccessInfo(res.data);
        if (onSubmitted) {
          onSubmitted(res.data);
        }
      } else {
        setServerError(res.message || 'Unable to submit enquiry. Please try again.');
      }
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors);
      }
      setServerError(err.message || 'A network error occurred. Please try again.');
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
    setSuccessInfo(null);
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-accent)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        margin: '0.75rem 0',
        animation: 'slideUp 200ms ease-out'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--cyan-primary)' }} />
          <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)' }}>
            DroneTV Quick Enquiry & Consultation
          </h4>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close enquiry form"
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.2rem' }}
        >
          <X size={18} />
        </button>
      </div>

      {successInfo ? (
        <div style={{ padding: '1.25rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem', color: '#10b981' }}>
            <CheckCircle2 size={24} />
            <h5 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#10b981' }}>
              Enquiry Submitted Successfully!
            </h5>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            Thank you, <strong>{successInfo.name}</strong>. A DroneTV technical representative will review your request and get in touch shortly.
          </p>
          <div style={{ padding: '0.65rem 0.85rem', backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', marginBottom: '1rem' }}>
            Reference ID: <strong style={{ color: 'var(--cyan-primary)' }}>{successInfo.referenceId || `DTV-${successInfo._id?.slice(-6).toUpperCase()}`}</strong>
          </div>
          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <Button variant="outline" size="sm" onClick={handleReset}>
              Submit Another Enquiry
            </Button>
            <Button variant="secondary" size="sm" onClick={onClose}>
              Return to Chat
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {serverError && (
            <div style={{ padding: '0.75rem', marginBottom: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-md)', color: '#f87171', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={16} />
              <span>{serverError}</span>
            </div>
          )}

          {/* User Type Radio Toggle */}
          <div style={{ marginBottom: '1rem' }}>
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
                    padding: '0.5rem 0.35rem',
                    borderRadius: 'var(--radius-md)',
                    border: formData.userType === type ? '1px solid var(--cyan-primary)' : '1px solid var(--border-subtle)',
                    backgroundColor: formData.userType === type ? 'rgba(0, 210, 211, 0.15)' : 'var(--bg-input)',
                    color: formData.userType === type ? 'var(--cyan-primary)' : 'var(--text-muted)',
                    fontSize: '0.85rem',
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
            id="chat-enquiry-name"
            label="Full Name"
            required
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            placeholder="e.g. Aarav Sharma"
            error={errors.name}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <Input
              id="chat-enquiry-email"
              type="email"
              label="Email Address"
              required
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              placeholder="e.g. aarav@example.com"
              error={errors.email}
            />

            <Input
              id="chat-enquiry-phone"
              type="tel"
              label="Mobile Number (India)"
              required
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
              placeholder="e.g. 9820123456"
              error={errors.phone}
              helperText="10-digit Indian format (e.g. 9820123456)"
            />
          </div>

          <Select
            id="chat-enquiry-interest"
            label="Area of Interest"
            required
            value={formData.interest}
            onChange={(e) => handleChange('interest', e.target.value)}
            onBlur={() => handleBlur('interest')}
            options={interestOptions}
            placeholder="Select a service or course"
            error={errors.interest}
          />

          <Input
            id="chat-enquiry-message"
            label="Enquiry Details"
            required
            multiline
            rows={3}
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            onBlur={() => handleBlur('message')}
            placeholder="Tell us about your requirements, project scope, or preferred batch schedule..."
            error={errors.message}
          />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              <ShieldCheck size={14} style={{ color: 'var(--cyan-primary)' }} />
              <span>We never share your contact details.</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button variant="ghost" size="sm" onClick={onClose} disabled={submitting}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" loading={submitting}>
                <Send size={15} />
                <span>Submit Enquiry</span>
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
