# DroneTV AI Support & Lead Assistant - REST API Documentation

This document describes all REST API endpoints provided by the DroneTV backend service.

- **Base URL**: `http://localhost:5000/api`
- **Content-Type**: `application/json`
- **Authentication**: JWT Bearer Token (`Authorization: Bearer <token>`)

---

## Standard JSON Response Format

All responses follow a predictable JSON schema:

```json
{
  "success": true,
  "message": "Human readable status message",
  "data": {},
  "errors": {}
}
```

### HTTP Status Code Reference

| Status Code | Meaning | Usage |
| :--- | :--- | :--- |
| **200 OK** | Success | Fetching records, updating status, admin login |
| **201 Created** | Created | Successfully creating a new lead enquiry |
| **400 Bad Request** | Bad Input | Invalid ObjectId format, missing login fields |
| **401 Unauthorized**| Unauthorized | Missing or expired JWT authentication token |
| **404 Not Found** | Not Found | Enquiry ID does not exist in the database |
| **422 Unprocessable**| Validation Failed| Field validation failed (e.g. invalid phone number) |
| **429 Too Many Req** | Rate Limited | Too many submissions or failed login attempts |
| **500 Server Error**| Server Error | Unexpected internal server error |

---

## 1. System Health Check

### `GET /health`
Returns system status, server uptime, and MongoDB connectivity.

- **Auth Required**: No (Public)
- **cURL Example**:
  ```bash
  curl -X GET http://localhost:5000/api/health
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "DroneTV AI Support & Lead Assistant API is operational",
    "timestamp": "2026-10-09T11:00:00.000Z",
    "uptime": 124,
    "database": "connected"
  }
  ```

---

## 2. Admin Authentication

### `POST /admin/login`
Authenticates the administrator and issues a JWT token.

- **Auth Required**: No (Rate limited)
- **Request Body**:
  ```json
  {
    "username": "admin",
    "password": "admin123"
  }
  ```
- **cURL Example**:
  ```bash
  curl -X POST http://localhost:5000/api/admin/login \
    -H "Content-Type: application/json" \
    -d "{\"username\":\"admin\",\"password\":\"admin123\"}"
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Login successful. Welcome back, Admin.",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "admin": {
        "username": "admin",
        "role": "admin"
      }
    }
  }
  ```
- **Error Response (401 Unauthorized)**:
  ```json
  {
    "success": false,
    "message": "Invalid credentials. Please verify your username and password."
  }
  ```

---

## 3. Public Lead Enquiry Creation

### `POST /enquiries`
Submits a customer or student enquiry from the interactive chatbot or Contact page form.

- **Auth Required**: No (Public, rate limited)
- **Request Body**:
  ```json
  {
    "name": "Kavita Rao",
    "email": "kavita.rao@example.com",
    "phone": "+91-9845112233",
    "userType": "Student",
    "interest": "DGCA Remote Pilot License (RPC)",
    "message": "Interested in weekend flight training batches."
  }
  ```
- **cURL Example**:
  ```bash
  curl -X POST http://localhost:5000/api/enquiries \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Kavita Rao",
      "email": "kavita.rao@example.com",
      "phone": "+91-9845112233",
      "userType": "Student",
      "interest": "DGCA Remote Pilot License (RPC)",
      "message": "Interested in weekend flight training batches."
    }'
  ```
- **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Thank you for reaching out! Your enquiry has been received.",
    "data": {
      "_id": "67a7a514d0f7f3699b6c41b8",
      "referenceId": "DTV-6C41B8",
      "name": "Kavita Rao",
      "email": "kavita.rao@example.com",
      "phone": "+91-9845112233",
      "userType": "Student",
      "interest": "DGCA Remote Pilot License (RPC)",
      "status": "New",
      "createdAt": "2026-10-09T11:05:00.000Z"
    }
  }
  ```
- **Error Response (422 Unprocessable Entity - Validation Failed)**:
  ```json
  {
    "success": false,
    "message": "Validation failed. Please correct the highlighted errors.",
    "errors": {
      "phone": "Please enter a valid 10-digit Indian mobile number (e.g. 9820123456 or +91-9820123456)"
    }
  }
  ```

---

## 4. Get All Enquiries (Admin Only)

### `GET /enquiries`
Retrieves a paginated list of enquiries with search and filtering capabilities.

- **Auth Required**: Yes (`Bearer <token>`)
- **Query Parameters**:
  - `search` (optional): Filter across name, email, phone, interest, or message
  - `userType` (optional): `Student` | `Customer` | `Other`
  - `status` (optional): `New` | `Contacted` | `In Progress` | `Closed`
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Records per page (default: 10, max: 100)
- **cURL Example**:
  ```bash
  curl -X GET "http://localhost:5000/api/enquiries?page=1&limit=10&status=New" \
    -H "Authorization: Bearer <your_admin_jwt_token>"
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "67a7a514d0f7f3699b6c41a1",
        "name": "Aarav Sharma",
        "email": "aarav.sharma@example.com",
        "phone": "+91-9820123456",
        "userType": "Student",
        "interest": "DGCA Remote Pilot License (RPC)",
        "message": "When is the next batch starting in Bengaluru?",
        "status": "New",
        "createdAt": "2026-10-09T08:30:00.000Z"
      }
    ],
    "pagination": {
      "total": 8,
      "page": 1,
      "limit": 10,
      "totalPages": 1
    },
    "metrics": {
      "total": 8,
      "new": 3,
      "contacted": 2,
      "inProgress": 2,
      "closed": 1
    }
  }
  ```

---

## 5. Get Single Enquiry By ID (Admin Only)

### `GET /enquiries/:id`
- **Auth Required**: Yes (`Bearer <token>`)
- **cURL Example**:
  ```bash
  curl -X GET http://localhost:5000/api/enquiries/67a7a514d0f7f3699b6c41a1 \
    -H "Authorization: Bearer <your_admin_jwt_token>"
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "67a7a514d0f7f3699b6c41a1",
      "name": "Aarav Sharma",
      "email": "aarav.sharma@example.com",
      "phone": "+91-9820123456",
      "userType": "Student",
      "interest": "DGCA Remote Pilot License (RPC)",
      "message": "When is the next batch starting in Bengaluru?",
      "status": "New",
      "createdAt": "2026-10-09T08:30:00.000Z"
    }
  }
  ```
- **Error Response (404 Not Found)**:
  ```json
  {
    "success": false,
    "message": "Enquiry not found."
  }
  ```

---

## 6. Update Enquiry Status (Admin Only)

### `PATCH /enquiries/:id`
- **Auth Required**: Yes (`Bearer <token>`)
- **Request Body**:
  ```json
  {
    "status": "Contacted"
  }
  ```
- **cURL Example**:
  ```bash
  curl -X PATCH http://localhost:5000/api/enquiries/67a7a514d0f7f3699b6c41a1 \
    -H "Authorization: Bearer <your_admin_jwt_token>" \
    -H "Content-Type: application/json" \
    -d "{\"status\":\"Contacted\"}"
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Enquiry updated successfully.",
    "data": {
      "_id": "67a7a514d0f7f3699b6c41a1",
      "status": "Contacted"
    }
  }
  ```

---

## 7. Delete Enquiry (Admin Only)

### `DELETE /enquiries/:id`
- **Auth Required**: Yes (`Bearer <token>`)
- **cURL Example**:
  ```bash
  curl -X DELETE http://localhost:5000/api/enquiries/67a7a514d0f7f3699b6c41a1 \
    -H "Authorization: Bearer <your_admin_jwt_token>"
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Enquiry deleted successfully.",
    "data": {
      "_id": "67a7a514d0f7f3699b6c41a1"
    }
  }
  ```
