import express from 'express';
// <<<<<<< yangBackend
// import User from '../models/UserSchema.js';
import HotelPendingTasks from '../models/HotelPendingTasks.js';
import HotelRoom from '../models/HotelRoom.js'; 
import HotelUser from '../models/User.js';

// =======
import User from '../models/UserSchema.js';  // Add .js extension
import HotelLogin from '../models/hotelLogin.js';
import RestroPending from '../models/restroPending.js';
import HotelRestro from '../models/hotelRestro.js';
import RoomBill from '../models/roomBills.js';
import RoomCurrentBillCycle from '../models/roomCurrentBillCycle.js';
// >>>>>>> main
const router = express.Router();

// router.post("/login", async (req, res) => {
//   const { userId, password } = req.body;
//   try {
//     const curr_user = await User.findOne({ userId });
//     if (!curr_user) {
//       return res.status(404).json({ message: "User does not exist" });
//     }

//     // Add password validation logic here, e.g., using bcrypt for hashing comparison
//     if (curr_user.password !== password) {
//       return res.status(401).json({ message: "Incorrect password" });
//     }

//     res.status(200).json({ message: "User found", user: curr_user });
//   } catch (error) {
//     console.error('Error finding user:', error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

export { router as UserRouter };
