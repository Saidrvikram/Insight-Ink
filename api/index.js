import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import imageRoute from './routes/imageRoute.js'; // Import the image route
import cookieParser from 'cookie-parser';
import axios from 'axios'; // Needed for Unsplash API requests
import cors from 'cors';

dotenv.config();

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// API Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoute); // Use the image route

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
