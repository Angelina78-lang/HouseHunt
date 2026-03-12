# HouseHunt – MERN Real Estate Booking Platform

HouseHunt is a full-stack real estate booking platform built with the **MERN stack (MongoDB, Express, React, Node.js)**.
The application allows users to explore properties, book stays, and manage listings through a role-based admin system.

This project was built as a **demo-ready platform for hackathons and SkillWallet submissions**.

---

# ✨ Features

### 🔐 Authentication & Roles

* JWT-based authentication
* User and Admin roles
* Secure protected routes

### 🏠 Property Listings

* View modern property cards
* Image gallery and property details
* Location information and pricing

### 🗺️ Maps & Virtual Tours

* Leaflet map integration
* Property location visualization

### 🔎 Advanced Filtering

Users can filter properties by:

* Location search
* Price range
* Bedrooms
* Amenities

### 📅 Booking System

* React Datepicker booking calendar
* Automatic price calculation
* Prevents date conflicts

### ❤️ Favorites

* Save properties using the heart icon

### 🧑‍💼 Admin Dashboard

Admins can:

* Approve pending property listings
* View analytics
* Monitor platform usage

### 📊 Analytics

* Chart.js integration
* Property location pricing visualization

### 📱 Responsive UI

* Built with **Bootstrap 5**
* Mobile friendly layout

---

# 🧱 Tech Stack

**Frontend**

* React (Vite)
* React Router
* Axios
* Bootstrap 5
* React Datepicker
* Chart.js
* Leaflet

**Backend**

* Node.js
* Express.js
* JWT Authentication
* Multer (image uploads)

**Database**

* MongoDB / MongoDB Memory Server

---

# 🚀 Live Deployment

### Frontend

https://househunt-5.onrender.com

### Backend API

https://househunt-4.onrender.com

---

# 💻 Running the Project Locally

## 1️⃣ Clone the repository

```bash
git clone https://github.com/Angelina78-lang/HouseHunt.git
cd HouseHunt
```

---

# Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
PORT=5000
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm run dev
```

Backend will run on:

```
http://localhost:5000
```

---

# Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

Frontend will run on:

```
http://localhost:3000
```

---

# 🔑 Demo Login Accounts

### Admin Account

Email

```
admin@househunt.com
```

Password

```
123456
```

### User Accounts

Email

```
john@example.com
```

Password

```
123456
```

or

Email

```
jane@example.com
```

Password

```
123456
```

---

# ⚙️ Deployment

The application is deployed using **Render**.

### Backend Deployment

1. Create a **Render Web Service**
2. Root Directory:

```
backend
```

3. Build Command:

```
npm install
```

4. Start Command:

```
node server.js
```

---

### Frontend Deployment

1. Create a **Render Static Site**
2. Root Directory:

```
frontend
```

3. Build Command:

```
npm install --legacy-peer-deps && npm run build
```

4. Publish Directory:

```
dist
```

---

# 🧠 Database Behavior

If no external MongoDB database is configured, the project automatically uses **MongoDB Memory Server**.

This means:

* Demo data is automatically seeded
* Properties and users are available instantly
* Data resets if the server restarts

---

# 📂 Project Structure

```
HouseHunt
│
├── backend
│   ├── config
│   ├── models
│   ├── routes
│   ├── middleware
│   └── server.js
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   └── context
│
└── README.md
```

---

# 📌 Future Improvements

* Persistent MongoDB Atlas database
* Payment integration
* Email notifications
* Real-time booking updates
* Property reviews and ratings

---

# 👨‍💻 Author

Developed as a **MERN full-stack demo project** for learning and SkillWallet submission.

---
