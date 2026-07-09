# Secure Contact Portal

A production-style contact form portal built with the MERN stack, hardened with input validation, rate limiting, security headers, and structured logging. Includes a public contact form and an admin dashboard for managing submissions.

**Live demo:** [https://enclave-portal-six.vercel.app](https://enclave-portal-six.vercel.app)

---

## Overview

This project demonstrates a complete, real-world contact form pipeline — not just a form that sends an email, but a small system that validates, throttles, logs, and persists every submission securely.

- Visitors submit a message through a validated contact form.
- Submissions are checked against a strict schema, rate-limited per IP, and written to MongoDB.
- An admin dashboard lists all submissions and allows deleting them.
- Every request is logged (Morgan for HTTP access logs, Winston for application logs).

---

## Features

- **Contact form** with client-side and server-side validation (Zod)
- **Admin dashboard** to view and delete submitted messages
- **Rate limiting** to prevent spam/abuse (configurable window and max requests)
- **Security headers** via Helmet
- **Structured logging** with Winston + Morgan
- **MongoDB Atlas** persistence via Mongoose
- Fully responsive UI, dark "systems console" theme
- Deployed as two independent services (frontend / backend)

---

## Tech Stack

**Frontend**
- React (Vite)
- React Router
- Axios

**Backend**
- Node.js / Express
- MongoDB + Mongoose
- Zod (schema validation)
- express-rate-limit
- Helmet
- Winston + Morgan (logging)

**Infrastructure**
- MongoDB Atlas (database)
- Render (backend hosting)
- Vercel (frontend hosting)

---

## Project Structure

```
Enclave-Portal/
├── client/               # React frontend (Vite)
│   ├── src/
│   │   ├── components/   # ContactForm, ContactTable, BootSequence
│   │   ├── pages/        # Admin
│   │   ├── services/     # API client (contact.service.js)
│   │   └── App.jsx
│   └── .env               # VITE_API_BASE_URL
│
└── server/               # Express backend
    ├── src/
    │   ├── config/        # MongoDB connection
    │   ├── controllers/   # Route handlers
    │   ├── middlewares/   # Validation, rate limiting
    │   ├── models/        # Contact schema (Mongoose)
    │   ├── routes/        # /api/contact, /api/admin
    │   ├── schemas/       # Zod validation schemas
    │   └── server.js
    └── .env                # MONGO_URI, rate limit config
```

---

## API Endpoints

| Method | Endpoint              | Description                    |
|--------|------------------------|---------------------------------|
| GET    | `/api/health`          | Health check                    |
| POST   | `/api/contact`         | Submit a new contact message    |
| GET    | `/api/admin/contacts`  | Retrieve all submissions        |
| DELETE | `/api/admin/contacts/:id` | Delete a submission by ID  |

---

## Getting Started (Local Development)

### Prerequisites
- Node.js (v18+)
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

Create a `server/.env` file:
```env
PORT=8888
MONGO_URI=your_mongodb_connection_string
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=5
```

Run the backend:
```bash
npm run dev
```
Server runs at `http://localhost:8888`.

### 3. Set up the frontend
```bash
cd ../client
npm install
```

Create a `client/.env` file:
```env
VITE_API_BASE_URL=http://localhost:8888/api
```

Run the frontend:
```bash
npm run dev
```
App runs at `http://localhost:5173`.

---

## Deployment

This project is deployed as two independent services:

- **Backend** → [Render](https://render.com) (root directory: `server`, build: `npm install`, start: `npm start`)
- **Frontend** → [Vercel](https://vercel.com) (root directory: `client`, framework: Vite)

Environment variables are configured directly in each platform's dashboard rather than committed to the repository.

---

## Security Measures

- All input validated server-side with Zod before touching the database
- Rate limiting on the contact endpoint to prevent abuse
- Helmet middleware for secure HTTP headers
- No secrets committed to version control (`.env` files gitignored)
- Structured request/error logging for observability

---

## License

This project was built for educational purposes as part of an assignment.
