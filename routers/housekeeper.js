import express from 'express';
import bcrypt from 'bcrypt';
import HotelLogin from '../models/hotelLogin.js';

const router = express.Router();

router.post("/login", async (req, res) => {
  const { hotelId, userId, password } = req.body;
  try {
    console.log("backend works");
    const hotelLogin = await HotelLogin.findOne({ 'housekeeper.hotel_id': hotelId, 'housekeeper.user_id': userId });
    if (!hotelLogin) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const housekeeper = hotelLogin.housekeeper;
    
    // Validate password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, housekeeper.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.status(200).json({ message: "User found", user: housekeeper });
  } catch (error) {
    console.error('Error finding user:', error);
    res.status(500).json({ message: "Server error" });
  }
});

export { router as HousekeeperRouter };
