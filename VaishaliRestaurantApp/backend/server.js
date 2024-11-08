import express from 'express';
import mongoose from 'mongoose';
import inventoryRoutes from './routes/inventoryRoutes.js'; // Import inventory routes
import { mongoDBURL } from './config.js'; // Make sure to provide your DB URL here

const app = express();

// Middleware to parse JSON data in the request body
app.use(express.json());

// Use the inventory routes for inventory-related endpoints
app.use('/inventory', inventoryRoutes);

// Connect to MongoDB and start the server
mongoose.connect(mongoDBURL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Database connection error:', err);
  });
