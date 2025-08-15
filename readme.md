# 💰 Expense Tracker

A full-stack **Personal Expense Tracker** built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
It allows users to manage their transactions, track their account balance, and analyze spending patterns with features like filtering, pagination, and rate limiting.

---

## 🚀 Features

### Backend
- **User Authentication** – Secure login & signup with JWT.
- **Login Attempt Tracking** – Records and limits failed login attempts.
- **Rate Limiting** – Prevents brute-force and abuse of API endpoints.
- **Pagination & Filtering** – Efficiently handles large transaction datasets.
- **Transaction Management** – Create, read, update, and delete transactions.
- **Secure API** – Middleware for token verification.

### Frontend
- **React UI** – Responsive and clean user interface.
- **Transaction Overview** – Displays account balance and transaction history.
- **Modals** – Add, update, and delete transactions via modals.
- **Notifications** – Alerts for success/error states.
- **Context API** – Global state management.

---

## 📂 Project Structure

Expense-Tracker/
│
├── BACKEND/ # Node.js + Express backend
│ ├── middleware/ # Rate limiting, login attempt tracking
│ ├── models/ # Mongoose models (Users, Transactions)
│ ├── routes/ # API routes
│ ├── verify.js # JWT verification middleware
│ ├── db.js # MongoDB connection
│ ├── index.js # App entry point
│ ├── package.json
│
├── frontend/ # React frontend
│ ├── public/
│ ├── src/
│ │ ├── components/ # UI components (Navbar, Modals, etc.)
│ │ ├── context/ # Global context
│ │ ├── App.js # Main app component
│ │ ├── index.js # React entry point
│ ├── package.json
│
├── .gitignore

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Context API
- CSS

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose

**Security & Utilities:**
- JWT Authentication
- Express-rate-limit
- bcrypt.js

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/Expense-Tracker.git
cd Expense-Tracker
```

### 2️⃣ Backend Setup
```
cd BACKEND
npm install
```
Create a `.env` file inside `BACKEND/` with:
```
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
PORT=5000
```
Start the backend:
```
npm start
```

### 3️⃣ Frontend Setup
```
cd ../frontend
npm install
npm start
```

---

## 📌 API Endpoints

**Auth Routes**
- `POST /api/auth/signup` – Register user
- `POST /api/auth/login` – Login user

**Transaction Routes**
- `GET /api/transactions` – Get all transactions (supports pagination & filtering)
- `POST /api/transactions` – Add transaction
- `PUT /api/transactions/:id` – Update transaction
- `DELETE /api/transactions/:id` – Delete transaction

---

## 🔒 Security Features

- JWT Authentication to protect routes.
- Rate Limiting to prevent spam.
- Login Attempt Limit to block