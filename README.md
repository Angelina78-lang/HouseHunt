# HouseHunt - MERN Boilerplate

A complete, feature-rich real estate booking platform built with the MERN stack (MongoDB, Express, React, Node.js). 
Designed to be demo-ready for hackathons and SkillWallet.

## Features Included
- **User & Admin Auth**: Full JWT authentication. Roles determine dashboard access.
- **Virtual Tours & Maps**: Leaflet maps for properties and YouTube/Vimeo embeds.
- **Advanced Filters**: Location keyword search, price slider, bedrooms, amenities checkboxes.
- **Booking Calendar**: React-datepicker integration with automatic price calculation and date-conflict checking.
- **Favorites**: Click the heart on a property card to save it.
- **Admin Workflow**: Pending properties require an Admin to approve before showing publicly.
- **Charts/Analytics**: Admin dashboard has a Chart.js bar chart for property location pricing.
- **Responsive Design**: Modern UI utilizing Bootstrap 5.

---

## 🚀 Setup & Run Locally

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Database (Local or Atlas)
- Cloudinary Account (for Image Uploads)

### 1. Backend Setup

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` file with your credentials:
   - `MONGO_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: Any secret string (e.g. `mysecret123`).
   - `CLOUDINARY_*`: Find these in your Cloudinary Dashboard.

5. **Seed the Database** with 10 sample properties and an Admin user:
   ```bash
   npm run seed
   ```
   *Logs: `Admin Email: admin@househunt.com`, `Password: 123456`*

6. Start the backend DEV server:
   ```bash
   npm run dev
   ```
   *Server runs on `http://localhost:5000`*

### 2. Frontend Setup

1. Open a **new** terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies (if you haven't already):
   ```bash
   npm install --legacy-peer-deps
   ```
3. Start the Vite React app:
   ```bash
   npm run dev
   ```
   *App opens on `http://localhost:3000`*

---

## 🌍 Deployment Options

### Recommended Stack: Render (Backend) + Vercel (Frontend)

**Deploying the Backend on Render:**
1. Create a "Web Service" on [Render.com](https://render.com).
2. Connect your GitHub repository.
3. Configure the settings:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add all your `.env` variables under Environment Variables in Render.
5. Deploy and grab the Render URL (e.g. `https://househunt-api.onrender.com`).

**Deploying the Frontend on Vercel:**
1. Import your GitHub repository to [Vercel.com](https://vercel.com).
2. Set the Root Directory to `frontend`.
3. Before deploying, you need to configure API routes to point to the remote Backend instead of `localhost`.
   - Update `axiosConfig.js` to point to the remote backend:
     ```javascript
     const instance = axios.create({
       baseURL: 'https://househunt-api.onrender.com', // Your deployed Render link
     });
     ```
4. Deploy the frontend on Vercel.

>(Optional) **Heroku Deployment for Backend**:
If you prefer Heroku, create a `Procfile` in the `backend` folder containing: `web: node server.js`. Deploy the `backend` folder and add config vars in Heroku.

---

## 🔑 Initial Admin Access
After running the `npm run seed` command, you can login with:
- **Email**: `admin@househunt.com`
- **Password**: `123456`
- **Role**: Admin (can approve properties and view stats)

Regular User accounts: `john@example.com` or `jane@example.com` with password `123456`.
