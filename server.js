import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import { UserRouter } from './routers/users.js';
import { ManagerRouter } from './routers/manager.js';
import { HousekeeperRouter } from './routers/housekeeper.js';
import { MasterRouter } from './routers/master.js';
// import { RestaurantRouter } from './routers/restaurant.js';
import { RestaurantRouter  } from './routers/restroPending.js';
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
app.use('/hotel-tasks', hotelPendingTasksRouter);
app.use('/hotel-employees', hotelEmployeesRouter);
app.use('/selected-items', selectedItemsRouter);
app.use('/hoteldatabase', HotelDatabaseRouter);

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
