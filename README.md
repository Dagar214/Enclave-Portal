<div align="center">

# 🔐 Secure Contact Portal

**A hardened, full-stack contact form pipeline — validated, rate-limited, logged, and production-deployed.**

[![Live Demo](https://img.shields.io/badge/demo-live-34D399?style=for-the-badge)](https://enclave-portal-six.vercel.app)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)

[Live Demo](https://enclave-portal-six.vercel.app) · [API Reference](#-api-reference) · [Local Setup](#-getting-started) · [Deployment](#-deployment)

</div>

<br />

## 📖 Overview

This project demonstrates a complete, real-world contact form pipeline — not just a form that sends an email, but a small system that **validates, throttles, logs, and persists** every submission securely.

- Visitors submit a message through a validated contact form.
- Submissions are checked against a strict schema, rate-limited per IP, and written to MongoDB.
- An admin dashboard lists all submissions and allows deleting them.
- Every request is logged (Morgan for HTTP access logs, Winston for application logs).

<br />

## ✨ Features

| | |
|---|---|
| 📝 **Contact Form** | Client-side and server-side validation with Zod |
| 🛡️ **Admin Dashboard** | View and delete submitted messages |
| 🚦 **Rate Limiting** | Configurable window and max requests per IP |
| 🔒 **Security Headers** | Enforced via Helmet |
| 📊 **Structured Logging** | Winston (app logs) + Morgan (HTTP access logs) |
| 🗄️ **Persistent Storage** | MongoDB Atlas via Mongoose |
| 📱 **Responsive UI** | Dark "systems console" theme, mobile-first |
| ☁️ **Independently Deployed** | Frontend and backend deployed as separate services |

<br />

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="33%">

**Frontend**
- React (Vite)
- React Router
- Axios

</td>
<td valign="top" width="33%">

**Backend**
- Node.js / Express
- MongoDB + Mongoose
- Zod
- express-rate-limit
- Helmet
- Winston + Morgan

</td>
<td valign="top" width="33%">

**Infrastructure**
- MongoDB Atlas
- Render (backend)
- Vercel (frontend)

</td>
</tr>
</table>

<br />

## 📁 Project Structure

```
Enclave-Portal/
├── client/                  React frontend (Vite)
│   ├── src/
│   │   ├── components/      ContactForm, ContactTable, BootSequence
│   │   ├── pages/           Admin
│   │   ├── services/        API client (contact.service.js)
│   │   └── App.jsx
│   └── .env                 VITE_API_BASE_URL
│
└── server/                  Express backend
    ├── src/
    │   ├── config/           MongoDB connection
    │   ├── controllers/      Route handlers
    │   ├── middlewares/      Validation, rate limiting
    │   ├── models/           Contact schema (Mongoose)
    │   ├── routes/           /api/contact, /api/admin
    │   ├── schemas/          Zod validation schemas
    │   └── server.js
    └── .env                  MONGO_URI, rate limit config
```

<br />

## 🔌 API Reference

| Method | Endpoint | Description |
|:------:|----------|-------------|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/contact` | Submit a new contact message |
| `GET` | `/api/admin/contacts` | Retrieve all submissions |
| `DELETE` | `/api/admin/contacts/:id` | Delete a submission by ID |

<br />

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- A MongoDB Atlas cluster (or local MongoDB instance)

### 1. Clone the repository
```bash
git clone https://github.com/Dagar214/Enclave-Portal.git
cd Enclave-Portal
```

### 2. Set up the backend
```bash
cd server
npm install
```

Create `server/.env`:
```env
PORT=8888
MONGO_URI=your_mongodb_connection_string
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=5
```

Run it:
```bash
npm run dev
```
→ Server runs at `http://localhost:8888`

### 3. Set up the frontend
```bash
cd ../client
npm install
```

Create `client/.env`:
```env
VITE_API_BASE_URL=http://localhost:8888/api
```

Run it:
```bash
npm run dev
```
→ App runs at `http://localhost:5173`

<br />

## ☁️ Deployment

This project is deployed as two independent services:

| Service | Platform | Root Directory | Build | Start |
|---------|----------|-----------------|-------|-------|
| Backend | [Render](https://render.com) | `server` | `npm install` | `npm start` |
| Frontend | [Vercel](https://vercel.com) | `client` | `npm run build` | — (static) |

Environment variables are configured directly in each platform's dashboard rather than committed to the repository.

<br />

## 🔒 Security Measures

- ✅ All input validated server-side with **Zod** before touching the database
- ✅ **Rate limiting** on the contact endpoint to prevent abuse
- ✅ **Helmet** middleware for secure HTTP headers
- ✅ No secrets committed to version control (`.env` files gitignored)
- ✅ Structured request/error logging for observability

<br />

<div align="center">

---

Built as part of an academic assignment demonstrating a secure, production-style MERN application.

</div>