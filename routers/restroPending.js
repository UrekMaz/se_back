import express from 'express';
import bcrypt from 'bcrypt';
import HotelLogin from '../models/hotelLogin.js';
import OrderSelected from '../models/orderSelected.js';

const router = express.Router();

router.post("/login", async (req, res) => {
  const { hotelId, userId, password } = req.body;
  try {
    console.log("backend works");
    const hotelLogin = await HotelLogin.findOne({ 'restaurant.hotel_id': hotelId, 'restaurant.user_id': userId });
    if (!hotelLogin) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const restaurant = hotelLogin.restaurant;
    
    // Validate password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, restaurant.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.status(200).json({ message: "User found", user: restaurant});
  } catch (error) {
    console.error('Error finding user:', error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to get pending orders for a restaurant
router.get('/pending-orders/:hotelId', async (req, res) => {
  const { hotelId } = req.params;
  try {
    console.log("Trying to fetch orders");
    const orders = await OrderSelected.find({ hotel_id: hotelId, completed: false, confirmed: true });
    console.log(orders);
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching pending orders' });
  }
});

// Route to get completed orders for a restaurant
router.get('/completed-orders/:hotelId', async (req, res) => {
  const { hotelId } = req.params;
  try {
    console.log("Trying to fetch completed orders");
    const orders = await OrderSelected.find({ hotel_id: hotelId, completed: true, confirmed: true });
    console.log(orders);
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status500().json({ message: 'Error fetching completed orders' });
  }
});

// Route to update the completion status for an order
router.put('/pending-orders/:orderId/complete', async (req, res) => {
  const { orderId } = req.params;
  const { completed, time_of_completion } = req.body;

  try {
    const updatedOrder = await OrderSelected.findByIdAndUpdate(
      orderId,
      { completed: completed, 'time_of_completion': time_of_completion },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating order completion status' });
  }
});

export { router as RestaurantRouter };
