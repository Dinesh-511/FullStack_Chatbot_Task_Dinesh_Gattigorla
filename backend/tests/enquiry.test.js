const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Enquiry = require('../src/models/Enquiry');
const connectDB = require('../src/config/db');

let adminToken = '';
let testEnquiryId = '';

beforeAll(async () => {
  // Ensure DB connected
  if (mongoose.connection.readyState === 0) {
    await connectDB();
  }

  // Obtain admin JWT token
  const loginRes = await request(app)
    .post('/api/admin/login')
    .send({
      username: 'admin',
      password: 'admin123'
    });

  if (loginRes.body && loginRes.body.data) {
    adminToken = loginRes.body.data.token;
  }
});

afterAll(async () => {
  // Clean up any test records created
  if (testEnquiryId) {
    await Enquiry.findByIdAndDelete(testEnquiryId);
  }
  await mongoose.connection.close();
});

describe('DroneTV API Tests', () => {
  describe('Health Check', () => {
    it('GET /api/health should return 200 and operational status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.database).toBe('connected');
    });
  });

  describe('Admin Authentication', () => {
    it('POST /api/admin/login with correct credentials should return token', async () => {
      const res = await request(app)
        .post('/api/admin/login')
        .send({
          username: 'admin',
          password: 'admin123'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.token).toBeDefined();
    });

    it('POST /api/admin/login with wrong password should return 401', async () => {
      const res = await request(app)
        .post('/api/admin/login')
        .send({
          username: 'admin',
          password: 'wrongpassword'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Enquiry Submission & Validation', () => {
    it('POST /api/enquiries should succeed with valid data and return 201', async () => {
      const res = await request(app)
        .post('/api/enquiries')
        .send({
          name: 'Rahul Varma',
          email: 'rahul.varma@example.com',
          phone: '+91-9819123456',
          userType: 'Student',
          interest: 'DGCA Remote Pilot License (RPC)',
          message: 'Interested in the upcoming weekend training batch.'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data._id).toBeDefined();
      expect(res.body.data.referenceId).toMatch(/^DTV-/);
      testEnquiryId = res.body.data._id;
    });

    it('POST /api/enquiries should return 422 when required fields are missing', async () => {
      const res = await request(app)
        .post('/api/enquiries')
        .send({
          name: '',
          email: 'not-an-email'
        });

      expect(res.statusCode).toBe(422);
      expect(res.body.success).toBe(false);
      expect(res.body.errors).toBeDefined();
      expect(res.body.errors.name).toBeDefined();
      expect(res.body.errors.email).toBeDefined();
      expect(res.body.errors.phone).toBeDefined();
    });

    it('POST /api/enquiries should return 422 for invalid Indian phone number', async () => {
      const res = await request(app)
        .post('/api/enquiries')
        .send({
          name: 'Jane Doe',
          email: 'jane@example.com',
          phone: '12345', // Invalid
          userType: 'Customer',
          interest: 'Agricultural Spraying & Crop Health',
          message: 'Testing phone validation.'
        });

      expect(res.statusCode).toBe(422);
      expect(res.body.errors.phone).toBeDefined();
    });
  });

  describe('Protected Admin Enquiry Operations', () => {
    it('GET /api/enquiries without auth token should return 401', async () => {
      const res = await request(app).get('/api/enquiries');
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('GET /api/enquiries with admin token should return 200 with list and metrics', async () => {
      const res = await request(app)
        .get('/api/enquiries')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.pagination).toBeDefined();
      expect(res.body.metrics).toBeDefined();
    });

    it('GET /api/enquiries/:id with valid ID should return single enquiry', async () => {
      const res = await request(app)
        .get(`/api/enquiries/${testEnquiryId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data._id).toBe(testEnquiryId);
    });

    it('GET /api/enquiries/:id with invalid ObjectID format should return 400', async () => {
      const res = await request(app)
        .get('/api/enquiries/invalid-id-format')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('GET /api/enquiries/:id with non-existent ObjectID should return 404', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      const res = await request(app)
        .get(`/api/enquiries/${fakeId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it('PATCH /api/enquiries/:id should update status and return 200', async () => {
      const res = await request(app)
        .patch(`/api/enquiries/${testEnquiryId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'Contacted' });

      expect(res.statusCode).toBe(200);
      expect(res.body.data.status).toBe('Contacted');
    });

    it('DELETE /api/enquiries/:id should delete enquiry and return 200', async () => {
      const res = await request(app)
        .delete(`/api/enquiries/${testEnquiryId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);

      // Verify deletion
      const checkRes = await request(app)
        .get(`/api/enquiries/${testEnquiryId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(checkRes.statusCode).toBe(404);
      testEnquiryId = ''; // Cleared
    });
  });

  describe('Route Not Found Handler', () => {
    it('GET /api/nonexistent should return 404 JSON', async () => {
      const res = await request(app).get('/api/nonexistent');
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});
