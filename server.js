import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import { UserRouter } from './routers/users.js';
import { ManagerRouter } from './routers/manager.js';
import { HousekeeperRouter } from './routers/housekeeper.js';
import { MasterRouter } from './routers/master.js';
// <<<<<<< middleware
// import { RestaurantRouter } from './routers/restaurant.js';
// import { RestaurantRouter  } from './routers/restroPending.js';
// =======
import { HotelRoomRouter } from './routers/hotelroom.js';
import completedTasksRouter from './routers/completedTasks.js';
import billingManagerRouter from './routers/billingManager.js';
// <<<<<<< hrishikeshSide
import { RestaurantRouter } from './routers/restroPending.js';
// >>>>>>> main
import { hotelPendingTasksRouter } from './routers/hotelPendingTasksRouter.js';
import { hotelEmployeesRouter } from './routers/hotelEmployeesRouter.js';
import { selectedItemsRouter } from './routers/selectedItemsRouter.js';
import { HotelDatabaseRouter } from './routers/hotelDatabseRouter.js';

import connectToDatabase from './middleware/connectToDatabase.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(connectToDatabase);

app.use('/user', UserRouter);
app.use('/manager', ManagerRouter);
app.use('/master', MasterRouter);
app.use('/housekeeper', HousekeeperRouter);
app.use('/restaurant', RestaurantRouter);
// <<<<<<< middleware
// =======
// <<<<<<< hrishikeshSide
app.use('/hotelroom', HotelRoomRouter);
app.use('/completedTasks', completedTasksRouter);
app.use('/billingManager', billingManagerRouter); 
// >>>>>>> main
app.use('/hotel-tasks', hotelPendingTasksRouter);
app.use('/hotel-employees', hotelEmployeesRouter);
app.use('/selected-items', selectedItemsRouter);
app.use('/hoteldatabase', HotelDatabaseRouter);

app.get("/", (req, res) => {
  res.send("hi");
});
app.get('/billing/:roomNumber', async (req, res) => {
  const { roomNumber } = req.params;

  try {
    const billingData = await RoomBill.findOne({ room_id: roomNumber });

    if (!billingData) {
      return res.status(404).json({ error: 'Billing data not found' });
    }

    res.status(200).json(billingData);
  } catch (error) {
    console.error('Error fetching billing data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
