const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const otpRoutes = require('./routes/otpRoutes');
const ambulanceRoutes = require('./routes/ambulanceRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const ambulanceDriverRoutes = require('./routes/ambulanceDriverRoutes');
const userRoutes = require('./routes/userRoutes'); // Added import

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret-key', // Replace with a strong secret in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 * 60 } // 1 hour
}));

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/ambulance', ambulanceRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/ambulanceDrivers', ambulanceDriverRoutes);
app.use('/api/users', userRoutes); // Added route

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
