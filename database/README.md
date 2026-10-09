# DroneTV Database Setup & Schema Guide

This document describes the database architecture, schema definitions, and step-by-step setup instructions for both local MongoDB instances and cloud-hosted MongoDB Atlas.

---

## 1. Schema Description

The application uses **MongoDB** managed via **Mongoose ORM** (`backend/src/models/Enquiry.js`).

### `Enquiry` Collection
Captures customer and student inquiries submitted through the interactive chatbot and the Contact page form.

| Field | Type | Required | Constraints / Enums | Description |
| :--- | :--- | :--- | :--- | :--- |
| `name` | `String` | Yes | `trim: true`, `maxlength: 100` | Full name of the prospect |
| `email` | `String` | Yes | `trim: true`, `lowercase: true`, `maxlength: 120` | Valid email address |
| `phone` | `String` | Yes | `trim: true`, `maxlength: 20` | Indian mobile format (10 digits starting 6–9) |
| `userType` | `String` | Yes | Enum: `['Student', 'Customer', 'Other']` | Role of the user |
| `interest` | `String` | Yes | `trim: true`, `maxlength: 150` | Chosen service, course, or custom requirement |
| `message` | `String` | Yes | `trim: true`, `maxlength: 2000` | Inquiry details or project scope |
| `status` | `String` | No | Enum: `['New', 'Contacted', 'In Progress', 'Closed']`, default: `'New'` | Operational lead pipeline status |
| `createdAt` | `Date` | Auto | Managed by Mongoose `timestamps: true` | Record creation timestamp |
| `updatedAt` | `Date` | Auto | Managed by Mongoose `timestamps: true` | Last modification timestamp |

### Indexes
To optimize dashboard queries, filtering, and sorting:
- `enquirySchema.index({ status: 1 });` — Rapid status count metrics and status filtering
- `enquirySchema.index({ userType: 1 });` — Filtering between Students and Customers
- `enquirySchema.index({ createdAt: -1 });` — High-efficiency sorting for newest enquiries first

---

## 2. Option A: Local MongoDB Setup

### Prerequisites
- Install **MongoDB Community Server** and **mongosh** (MongoDB Shell) from [mongodb.com](https://www.mongodb.com/try/download/community).

### Steps (Windows)
1. Verify the MongoDB Windows service is running:
   ```powershell
   Get-Service -Name *mongo*
   ```
2. If stopped, start it via PowerShell (Administrator):
   ```powershell
   Start-Service -Name MongoDB
   ```
3. Set your backend connection string in `backend/.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/dronetv_db
   ```

### Steps (macOS / Linux)
1. Start MongoDB with Homebrew or systemd:
   ```bash
   brew services start mongodb-community
   # Or on Ubuntu/Debian:
   sudo systemctl start mongod
   ```

---

## 3. Option B: MongoDB Atlas Setup (Free Cloud Cluster)

1. Sign up for a free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free shared cluster (M0 sandbox tier).
3. Under **Database Access**, create a database user (e.g., `dronetv_admin`) with a secure password and "Read and write to any database" privileges.
4. Under **Network Access**, click **Add IP Address** and choose **Allow Access from Anywhere (`0.0.0.0/0`)** for development/interview demoing.
5. In your cluster dashboard, click **Connect** -> **Drivers** (Node.js) to copy the connection string.
6. Replace the credentials in `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://dronetv_admin:<your_password>@cluster0.abcde.mongodb.net/dronetv_db?retryWrites=true&w=majority
   ```

---

## 4. Seeding Sample Data

To populate the database with realistic sample enquiries:

```bash
cd backend
npm run seed
```

This imports all records from `database/seed-data.json`, assigning staggered timestamps across the past week to demonstrate the admin dashboard analytics.

---

## 5. Sample Documents

Here are sample documents as stored in MongoDB:

```json
{
  "_id": "67a7a514d0f7f3699b6c41a1",
  "name": "Aarav Sharma",
  "email": "aarav.sharma@example.com",
  "phone": "+91-9820123456",
  "userType": "Student",
  "interest": "DGCA Remote Pilot License (RPC)",
  "message": "Hello DroneTV team, I am a final year aerospace engineering student looking to obtain my DGCA certified drone pilot license. When is the next batch starting in Bengaluru?",
  "status": "New",
  "createdAt": "2026-10-09T08:30:00.000Z",
  "updatedAt": "2026-10-09T08:30:00.000Z"
}
```

```json
{
  "_id": "67a7a514d0f7f3699b6c41a2",
  "name": "Priya Sundaram",
  "email": "priya.sundaram@greenfarms.org",
  "phone": "+91-9840234567",
  "userType": "Customer",
  "interest": "Agricultural Spraying & Crop Health",
  "message": "We manage 45 acres of paddy and sugarcane in Tamil Nadu. We are looking for drone-based liquid fertilizer spraying contracts for the upcoming season.",
  "status": "Contacted",
  "createdAt": "2026-10-08T18:30:00.000Z",
  "updatedAt": "2026-10-09T09:15:00.000Z"
}
```
