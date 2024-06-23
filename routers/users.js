// routes/userRoutes.js
import express from 'express';
import HotelRestro from '../models/hotelRestro.js';

const router = express.Router();

router.get("/in-room-dining", async (req, res) => {
  const { hotelId } = req.query;

  try {
    const hotelRestro = await HotelRestro.findOne({ hotel_id: hotelId }).exec();

    if (!hotelRestro) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    const restaurants = hotelRestro.restro; // Access the restro array from hotelRestro
    res.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export { router as UserRouter };
