import React, { useState, useEffect, useCallback } from 'react';
import {
  Shield,
  Search,
  Filter,
  Trash2,
  Eye,
  LogOut,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Inbox,
  User,
  Phone,
  Mail,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { getEnquiries, updateEnquiryStatus, deleteEnquiry } from '../services/api';
import AdminLoginPage from './AdminLoginPage';
import Button from '../components/Button';
import Card from '../components/Card';
import Modal from '../components/Modal';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { ToastContainer } from '../components/Toast';

export default function AdminDashboardPage() {
  const [token, setToken] = useState(() => localStorage.getItem('dronetv_admin_token') || '');
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Filtering & Pagination State
  const [search, setSearch] = useState('');
  const [userType, setUserType] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const [metrics, setMetrics] = useState({ total: 0, new: 0, contacted: 0, inProgress: 0, closed: 0 });

  // Detail Modal & Delete Modal State
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type, duration: 4000 }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch enquiries callback
  const fetchEnquiries = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await getEnquiries(token, {
        search,
        userType,
        status,
        page,
        limit
      });

      if (res.success) {
        setEnquiries(res.data || []);
        if (res.pagination) setPagination(res.pagination);
        if (res.metrics) setMetrics(res.metrics);
      } else {
        setErrorMsg(res.message || 'Failed to fetch enquiries.');
      }
    } catch (err) {
      if (err.status === 401) {
        handleLogout();
        addToast('Your session has expired. Please log in again.', 'error');
      } else {
        setErrorMsg(err.message || 'Unable to connect to DroneTV backend.');
      }
    } finally {
      setLoading(false);
    }
  }, [token, search, userType, status, page, limit]);

  useEffect(() => {
    if (token) {
      fetchEnquiries();
    }
  }, [fetchEnquiries, token]);

  const handleLogout = () => {
    localStorage.removeItem('dronetv_admin_token');
    localStorage.removeItem('dronetv_admin_user');
    setToken('');
  };

  // Status Change Handler
  const handleStatusChange = async (enquiryId, newStatus) => {
    try {
      const res = await updateEnquiryStatus(token, enquiryId, newStatus);
      if (res.success) {
        addToast(`Status updated to "${newStatus}"`, 'success');
        // Update local state smoothly
        setEnquiries((prev) =>
          prev.map((item) => (item._id === enquiryId ? { ...item, status: newStatus } : item))
        );
        if (selectedEnquiry && selectedEnquiry._id === enquiryId) {
          setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
        }
        // Refresh metrics
        fetchEnquiries();
      }
    } catch (err) {
      addToast(err.message || 'Failed to update status', 'error');
    }
  };

  // Delete Handler
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setActionLoading(true);
    try {
      const res = await deleteEnquiry(token, deleteTarget._id);
      if (res.success) {
        addToast('Enquiry deleted successfully', 'success');
        setDeleteTarget(null);
        if (selectedEnquiry?._id === deleteTarget._id) {
          setSelectedEnquiry(null);
        }
        fetchEnquiries();
      }
    } catch (err) {
      addToast(err.message || 'Failed to delete enquiry', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Status badge styling helper
  const getBadgeClass = (s) => {
    switch (s) {
      case 'New': return 'badge-new';
      case 'Contacted': return 'badge-contacted';
      case 'In Progress': return 'badge-progress';
      case 'Closed': return 'badge-closed';
      default: return 'badge-new';
    }
  };

  // Render Login Screen if not authenticated
  if (!token) {
    return <AdminLoginPage onLoginSuccess={(newToken) => setToken(newToken)} />;
  }

  return (
    <div className="page-wrapper" style={{ paddingBottom: '5rem' }}>
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Admin Dashboard Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--cyan-primary)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>
            <Shield size={14} />
            <span>Operational Console</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: '800' }}>Enquiry & Lead Management</h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Button variant="secondary" size="sm" onClick={fetchEnquiries} loading={loading}>
            <RefreshCw size={14} />
            <span>Refresh</span>
          </Button>

          <Button variant="danger" size="sm" onClick={handleLogout}>
            <LogOut size={14} />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {/* Summary Count Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Total Leads</span>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-main)', marginTop: '0.2rem' }}>{metrics.total}</div>
        </div>

        <div className="card" style={{ padding: '1.25rem', borderColor: 'rgba(56, 189, 248, 0.3)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--status-new-text)', textTransform: 'uppercase', fontWeight: '600' }}>New Enquiries</span>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--status-new-text)', marginTop: '0.2rem' }}>{metrics.new}</div>
        </div>

        <div className="card" style={{ padding: '1.25rem', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--status-contacted-text)', textTransform: 'uppercase', fontWeight: '600' }}>Contacted</span>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--status-contacted-text)', marginTop: '0.2rem' }}>{metrics.contacted}</div>
        </div>

        <div className="card" style={{ padding: '1.25rem', borderColor: 'rgba(192, 132, 252, 0.3)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--status-progress-text)', textTransform: 'uppercase', fontWeight: '600' }}>In Progress</span>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--status-progress-text)', marginTop: '0.2rem' }}>{metrics.inProgress}</div>
        </div>

        <div className="card" style={{ padding: '1.25rem', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--status-closed-text)', textTransform: 'uppercase', fontWeight: '600' }}>Closed</span>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--status-closed-text)', marginTop: '0.2rem' }}>{metrics.closed}</div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'center' }}>
          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input
              type="text"
              placeholder="Search name, email, phone..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="form-control"
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>

          {/* User Type Filter */}
          <select
            value={userType}
            onChange={(e) => {
              setUserType(e.target.value);
              setPage(1);
            }}
            className="form-control"
          >
            <option value="">All User Types</option>
            <option value="Student">Students</option>
            <option value="Customer">Customers</option>
            <option value="Other">Other</option>
          </select>

          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="form-control"
          >
            <option value="">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>

          {/* Reset Filters */}
          {(search || userType || status) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearch('');
                setUserType('');
                setStatus('');
                setPage(1);
              }}
            >
              Reset Filters
            </Button>
          )}
        </div>
      </div>

      {/* Main Enquiries Content Area */}
      {loading ? (
        <Loader label="Loading enquiries from database..." fullPage />
      ) : errorMsg ? (
        <div style={{ padding: '1.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-lg)', color: '#f87171', textAlign: 'center' }}>
          <AlertCircle size={28} style={{ margin: '0 auto 0.5rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{errorMsg}</h3>
          <Button variant="secondary" size="sm" onClick={fetchEnquiries} style={{ marginTop: '1rem' }}>
            Try Again
          </Button>
        </div>
      ) : enquiries.length === 0 ? (
        <EmptyState
          icon={<Inbox size={32} />}
          title="No Enquiries Found"
          description={
            search || userType || status
              ? 'No records match your active search or filters. Try adjusting your query.'
              : 'There are currently no customer or student enquiries in the database.'
          }
          action={
            (search || userType || status) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearch('');
                  setUserType('');
                  setStatus('');
                  setPage(1);
                }}
              >
                Clear Filters
              </Button>
            )
          }
        />
      ) : (
        <>
          {/* Responsive Table for Desktop / Card layout for Mobile */}
          <div style={{ overflowX: 'auto', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-card)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-input)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '1rem' }}>Lead Name & Type</th>
                  <th style={{ padding: '1rem' }}>Contact Info</th>
                  <th style={{ padding: '1rem' }}>Interest</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                  <th style={{ padding: '1rem' }}>Date</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((item) => (
                  <tr
                    key={item._id}
                    style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background-color 150ms' }}
                  >
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>{item.name}</div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--cyan-primary)', fontWeight: '600' }}>
                        {item.userType}
                      </span>
                    </td>

                    <td style={{ padding: '1rem' }}>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{item.email}</div>
                      <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>{item.phone}</div>
                    </td>

                    <td style={{ padding: '1rem', maxWidth: '240px' }}>
                      <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-main)' }} title={item.interest}>
                        {item.interest}
                      </div>
                    </td>

                    <td style={{ padding: '1rem' }}>
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                        className={`badge ${getBadgeClass(item.status)}`}
                        style={{ border: 'none', cursor: 'pointer', padding: '0.25rem 0.5rem', outline: 'none' }}
                      >
                        <option value="New" style={{ background: '#0f172a', color: '#fff' }}>New</option>
                        <option value="Contacted" style={{ background: '#0f172a', color: '#fff' }}>Contacted</option>
                        <option value="In Progress" style={{ background: '#0f172a', color: '#fff' }}>In Progress</option>
                        <option value="Closed" style={{ background: '#0f172a', color: '#fff' }}>Closed</option>
                      </select>
                    </td>

                    <td style={{ padding: '1rem', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                      {new Date(item.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>

                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.45rem' }}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedEnquiry(item)}
                          title="View complete details"
                          style={{ padding: '0.35rem' }}
                        >
                          <Eye size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteTarget(item)}
                          title="Delete enquiry"
                          style={{ padding: '0.35rem', color: 'var(--status-danger-text)' }}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Showing {enquiries.length} of {pagination.total} enquiries (Page {page} of {pagination.totalPages})
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Button
                variant="secondary"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </Button>

              <Button
                variant="secondary"
                size="sm"
                disabled={page >= pagination.totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Enquiry Detail Modal */}
      <Modal
        isOpen={!!selectedEnquiry}
        onClose={() => setSelectedEnquiry(null)}
        title={selectedEnquiry ? `Enquiry from ${selectedEnquiry.name}` : ''}
        footer={
          selectedEnquiry && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Change Status:</span>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => handleStatusChange(selectedEnquiry._id, e.target.value)}
                  className={`badge ${getBadgeClass(selectedEnquiry.status)}`}
                  style={{ cursor: 'pointer', outline: 'none' }}
                >
                  <option value="New" style={{ background: '#0f172a' }}>New</option>
                  <option value="Contacted" style={{ background: '#0f172a' }}>Contacted</option>
                  <option value="In Progress" style={{ background: '#0f172a' }}>In Progress</option>
                  <option value="Closed" style={{ background: '#0f172a' }}>Closed</option>
                </select>
              </div>

              <Button variant="secondary" size="sm" onClick={() => setSelectedEnquiry(null)}>
                Close
              </Button>
            </div>
          )
        }
      >
        {selectedEnquiry && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.92rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', backgroundColor: 'var(--bg-input)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Reference ID</span>
                <div style={{ fontWeight: '700', color: 'var(--cyan-primary)' }}>
                  DTV-{selectedEnquiry._id.slice(-6).toUpperCase()}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>User Type</span>
                <div style={{ fontWeight: '600' }}>{selectedEnquiry.userType}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Email</span>
                <div>{selectedEnquiry.email}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Phone</span>
                <div>{selectedEnquiry.phone}</div>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
                Service / Course Interest
              </span>
              <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)', marginTop: '0.2rem' }}>
                {selectedEnquiry.interest}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
                Client Message / Requirements
              </span>
              <div style={{ padding: '0.85rem', backgroundColor: 'var(--bg-input)', borderRadius: 'var(--radius-md)', marginTop: '0.35rem', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                {selectedEnquiry.message}
              </div>
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
              Received on {new Date(selectedEnquiry.createdAt).toLocaleString()}
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Enquiry Record?"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setDeleteTarget(null)} disabled={actionLoading}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={confirmDelete} loading={actionLoading}>
              Confirm Delete
            </Button>
          </>
        }
      >
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
          Are you sure you want to permanently delete the enquiry from <strong>{deleteTarget?.name}</strong> ({deleteTarget?.email})? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
