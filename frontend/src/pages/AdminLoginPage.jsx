import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, AlertCircle, KeyRound } from 'lucide-react';
import { loginAdmin } from '../services/api';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

export default function AdminLoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password) {
      setErrorMsg('Please enter both username and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await loginAdmin({ username: username.trim(), password });
      if (res.success && res.data?.token) {
        localStorage.setItem('dronetv_admin_token', res.data.token);
        localStorage.setItem('dronetv_admin_user', JSON.stringify(res.data.admin));
        if (onLoginSuccess) {
          onLoginSuccess(res.data.token);
        } else {
          navigate('/admin');
        }
      } else {
        setErrorMsg(res.message || 'Login failed.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Unable to log in. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
      <div style={{ maxWidth: '420px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'rgba(0, 210, 211, 0.12)',
              color: 'var(--cyan-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              boxShadow: '0 0 20px rgba(0, 210, 211, 0.25)'
            }}
          >
            <Shield size={30} />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Admin Portal Login</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
            DroneTV Operational Enquiries & Lead Management
          </p>
        </div>

        <Card>
          <form onSubmit={handleLogin} noValidate>
            {errorMsg && (
              <div
                style={{
                  padding: '0.75rem',
                  marginBottom: '1.25rem',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  color: '#f87171',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            <Input
              id="admin-username"
              label="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
            />

            <Input
              id="admin-password"
              type="password"
              label="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            {/* Quick Demo Hint */}
            <div
              style={{
                padding: '0.75rem',
                backgroundColor: 'rgba(0, 210, 211, 0.08)',
                borderRadius: 'var(--radius-md)',
                border: '1px dashed rgba(0, 210, 211, 0.3)',
                fontSize: '0.78rem',
                color: 'var(--cyan-primary)',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem'
              }}
            >
              <KeyRound size={15} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
              <div>
                <strong>Default Demo Credentials:</strong>
                <div>Username: <code>admin</code> • Password: <code>admin123</code></div>
              </div>
            </div>

            <Button type="submit" variant="primary" size="md" loading={loading} style={{ width: '100%' }}>
              <Lock size={16} />
              <span>Sign In to Admin Dashboard</span>
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
