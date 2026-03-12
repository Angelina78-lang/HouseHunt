import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB().then(async () => {
  try {
    const { default: User } = await import('./models/User.js');
    const { default: Property } = await import('./models/Property.js');
    const { default: bcrypt } = await import('bcryptjs');

    const adminExists = await User.findOne({ email: 'admin@househunt.com' });

    if (!adminExists) {
      console.log('Database empty: Auto-seeding initial data...');

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('123456', salt);

      const users = await User.insertMany([
        { name: 'Admin User', email: 'admin@househunt.com', password: hashedPassword, role: 'admin' },
        { name: 'John Doe', email: 'john@example.com', password: hashedPassword, role: 'user' },
        { name: 'Jane Smith', email: 'jane@example.com', password: hashedPassword, role: 'user' },
      ]);

      await Property.insertMany([
        {
          title: 'Modern Downtown Loft',
          description: 'A beautiful modern loft in the heart of the city.',
          price: 150,
          location: { address: '123 Main St, New York, NY', lat: 40.7128, lng: -74.006 },
          images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800'],
          bedrooms: 1,
          bathrooms: 1,
          amenities: ['WiFi', 'Air Conditioning', 'Kitchen'],
          availableFrom: new Date(),
          furnished: true,
          petFriendly: false,
          ownerId: users[1]._id,
          status: 'approved'
        }
      ]);

      console.log('Database seeded automatically.');
    }
  } catch (error) {
    console.error('Auto-seed failed', error);
  }
});

const app = express();

// Middleware
app.use(express.json());

// ✅ Fix CORS for deployed frontend
app.use(cors({
  origin: [
    "http://localhost:5173", // local Vite frontend
    "https://househunt-5.onrender.com" // deployed frontend
  ],
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/upload', uploadRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('HouseHunt API is running...');
});

// Static uploads folder
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});