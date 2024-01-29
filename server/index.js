const express = require('express');
const connectDB = require('./database/db');
const authRoutes = require('./routes/authRoutes');

const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000; // Use the PORT environment variable

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/auth', authRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
