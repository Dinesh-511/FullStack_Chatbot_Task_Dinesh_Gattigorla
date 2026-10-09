/**
 * DroneTV API Service
 * ============================================================================
 * Centralized HTTP client communicating with the Express backend REST API.
 * Uses native fetch with robust error handling and friendly offline messages.
 * ============================================================================
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Standard HTTP error helper
 */
class ApiError extends Error {
  constructor(message, status = 500, errors = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

/**
 * Generic request helper with timeout and friendly error parsing
 * 
 * @param {string} endpoint - API path relative to API_BASE_URL
 * @param {Object} options - Fetch options
 * @returns {Promise<any>}
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    let data;
    try {
      data = await response.json();
    } catch {
      data = { message: 'Unexpected server response.' };
    }

    if (!response.ok) {
      throw new ApiError(
        data.message || `Request failed with status ${response.status}`,
        response.status,
        data.errors || null
      );
    }

    return data;
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new ApiError('Request timed out. The server might be busy, please try again.', 408);
    }
    if (err instanceof ApiError) {
      throw err;
    }
    // Network error (server down, CORS blocked, etc.)
    throw new ApiError('Unable to connect to DroneTV server. Please verify your connection or try again shortly.', 0);
  }
}

/**
 * Public: Submit customer or student lead enquiry
 * 
 * @param {Object} enquiryData - { name, email, phone, userType, interest, message }
 * @returns {Promise<{ success: boolean, message: string, data: Object }>}
 */
export async function submitEnquiry(enquiryData) {
  return apiRequest('/enquiries', {
    method: 'POST',
    body: JSON.stringify(enquiryData)
  });
}

/**
 * Admin: Login with username & password to receive JWT
 * 
 * @param {{ username: string, password: string }} credentials
 * @returns {Promise<{ success: boolean, data: { token: string, admin: Object } }>}
 */
export async function loginAdmin(credentials) {
  return apiRequest('/admin/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
}

/**
 * Admin: Get paginated enquiries with optional search & filters
 * 
 * @param {string} token - Admin JWT token
 * @param {Object} params - { search, userType, status, page, limit }
 * @returns {Promise<{ success: boolean, data: Array, pagination: Object, metrics: Object }>}
 */
export async function getEnquiries(token, params = {}) {
  const query = new URLSearchParams();
  if (params.search) query.append('search', params.search);
  if (params.userType) query.append('userType', params.userType);
  if (params.status) query.append('status', params.status);
  if (params.page) query.append('page', params.page);
  if (params.limit) query.append('limit', params.limit);

  const queryString = query.toString() ? `?${query.toString()}` : '';

  return apiRequest(`/enquiries${queryString}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

/**
 * Admin: Get single enquiry detail
 * 
 * @param {string} token - Admin JWT
 * @param {string} id - Enquiry ID
 */
export async function getEnquiryById(token, id) {
  return apiRequest(`/enquiries/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

/**
 * Admin: Update enquiry status
 * 
 * @param {string} token - Admin JWT
 * @param {string} id - Enquiry ID
 * @param {string} status - 'New' | 'Contacted' | 'In Progress' | 'Closed'
 */
export async function updateEnquiryStatus(token, id, status) {
  return apiRequest(`/enquiries/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
}

/**
 * Admin: Delete enquiry
 * 
 * @param {string} token - Admin JWT
 * @param {string} id - Enquiry ID
 */
export async function deleteEnquiry(token, id) {
  return apiRequest(`/enquiries/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

/**
 * System: Health check
 */
export async function checkSystemHealth() {
  return apiRequest('/health', { method: 'GET' });
}
