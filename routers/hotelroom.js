// routers/hotelroom.js
import express from 'express';
import HotelRoom from '../models/HotelRoom.js';

const router = express.Router();

// Endpoint to fetch all hotel rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await HotelRoom.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotel rooms', error });
  }
});

export { router as HotelRoomRouter };
