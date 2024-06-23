// server.js

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { UserRouter } from './routers/users.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import HotelLogin from './models/hotelLogin.js';
import { ManagerRouter } from './routers/manager.js';
import { HousekeeperRouter } from './routers/housekeeper.js';
import { MasterRouter } from './routers/master.js';
import { RestaurantRouter } from './routers/restaurant.js';
import HotelRestro from './models/hotelRestro.js';
import cors from 'cors'; // Import the cors package
// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173', // Allow your frontend's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies to be sent
}));

// MongoDB connection string from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


// Function to create an entry


// Use the UserRouter for routes starting with /userhttps://cloud.mongodb.com/v2/6671ace65520dc7ff34515f8#/deviceSync
app.use('/user', UserRouter);
app.use('/manager', ManagerRouter);
app.use('/master', MasterRouter);
app.use('/housekeeper', HousekeeperRouter);
app.use('/restaurant', RestaurantRouter);
app.get("/",(req,res)=>{
  res.send("hi");
})








// Example function to create a new manager


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
