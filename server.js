const express = require('express');
const { connectToDatabase } = require('./src/database/db');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Import routes
const contactRoutes = require('./src/routes/contactRoutes');

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// API routes
app.use('/contacts', contactRoutes);

// Start server and connect to database
async function startServer() {
    try {
        // Connect to MongoDB
        const db = await connectToDatabase();

        // Make database available to requests
        app.locals.db = db;

        // Start server
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
            console.log('Connected to MongoDB');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();