import express from 'express';
import User from '../models/UserSchema.js';  // Add .js extension

const router = express.Router();

router.post("/login", async (req, res) => {
  const { userId, password } = req.body;
  try {
    const curr_user = await User.findOne({ userId });
    if (!curr_user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Add password validation logic here, e.g., using bcrypt for hashing comparison
    if (curr_user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.status(200).json({ message: "User found", user: curr_user });
  } catch (error) {
    console.error('Error finding user:', error);
    res.status(500).json({ message: "Server error" });
  }
});

export { router as UserRouter };
