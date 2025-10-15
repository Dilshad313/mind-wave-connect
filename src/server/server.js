import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Error Handler
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello from MindWave Backend!');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
