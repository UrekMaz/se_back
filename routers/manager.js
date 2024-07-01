import express from 'express';
import bcrypt from 'bcrypt';
import HotelLogin from '../models/hotelLogin.js';

const router = express.Router();

router.post("/login", async (req, res) => {
  const { hotelId, userId, password } = req.body;
  try {
    console.log("backend works");
    console.log("Password while checking : " + password);
    console.log("User Id while checking : " + userId);
    console.log("Hotel Id while checking : " + hotelId);

    const hotel_id = hotelId;
    const user_id = userId;
    const hotelLogin = await HotelLogin.findOne({ 'manager.hotel_id': hotel_id, 'manager.user_id': user_id });
    console.log("Hotel Login weather found: " + hotelLogin);
    if (!hotelLogin) {
      return res.status(404).json({ message: "User does not exist" });
    }
    
    const manager = hotelLogin.manager;
    
    // Validate password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, manager.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.status(200).json({ message: "User found", user: manager });
  } catch (error) {
    console.error('Error finding user:', error);
    res.status(500).json({ message: "Server error" });
  }
});

export { router as ManagerRouter };
