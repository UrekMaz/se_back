import express from 'express';
import HotelRestro from '../models/hotelRestro.js';
import HotelUser from '../models/User.js';
const router = express.Router();
import HotelUserSelected from '../models/hotelUserMenu.js';
import mongoose from 'mongoose';
import OrderSelected from '../models/orderSelected.js';
let storedArray = [];
import HousekeepingService from '../models/housekeeperinput.js';
import SelectedItems from '../models/selectedItemsSchema.js';
router.get("/in-room-dining/:hotelId/:userId", async (req, res) => {
  const { hotelId } = req.params;

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

router.get("/in-room-dining/:hotelId/:restoId/:userId", async (req, res) => {
  const { hotelId, restoId } = req.params; 

  try {
    const hotelRestro = await HotelRestro.findOne({ hotel_id: hotelId }).exec();

    if (!hotelRestro) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    const restaurant = hotelRestro.restro.find(restro => restro.restro_id === restoId);

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.json(restaurant); 
  } catch (error) {
    console.error('Error fetching restaurant menu:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post("/in-room-dining/:hotelId/:restoId/:userId", async (req, res) => {
  const { hotelId, restoId, userId } = req.params;
  const { selectedItems } = req.body;

  console.log(selectedItems);

  try {
    // Find the hotel user based on hotelId and userId
    let hotelUser = await HotelUserSelected.findOne({ hotel_id: hotelId, user_id: userId });

    if (!hotelUser) {
      // Create a new hotel user if not found
      hotelUser = new HotelUserSelected({
        hotel_id: hotelId,
        user_id: userId,
        restro: []
      });
    }

    // Find or create the specific restaurant within the hotel user's restro array
    let restaurant = hotelUser.restro.find(restro => restro.restro_id === restoId);
    if (!restaurant) {
      // Create a new restaurant object if not found
      restaurant = {
        restro_id: restoId,
        name: '',
        description: '',
        rating: '',
        menu: {
          starters: [],
          main: [],
          dessert: []
        }
      };
      hotelUser.restro.push(restaurant);
    }

    // Fetch restaurant details from HotelRestro schema
    const hotelRestro = await HotelRestro.findOne({ hotel_id: hotelId });
    const restaurantDetails = hotelRestro.restro.find(restro => restro.restro_id === restoId);

    if (restaurantDetails) {
      // Update restaurant details
      restaurant.name = restaurantDetails.name;
      restaurant.description = restaurantDetails.description;
      restaurant.rating = restaurantDetails.rating;
    }

    // Store selectedItems into the appropriate menu category (starters, main, dessert)
    selectedItems.forEach(item => {
      const newItem = {
        name: item.title,
        cost: item.price,
        quantity: item.quantity,
        image: item.image,
        description: item.description,
        category: item.category // Ensure each item has a 'category' field
      };

      // Determine where to push the new item based on its category
      if (item.category === 'starters') {
        restaurant.menu.starters.push(newItem);
      } else if (item.category === 'main') {
        restaurant.menu.main.push(newItem);
      } else if (item.category === 'dessert') {
        restaurant.menu.dessert.push(newItem);
      } else {
        console.error(`Unknown category for item: ${item.title}`);
      }
    });

    // Save the updated or new hotel user document
    //await hotelUser.save();

    // Prepare the current selected items to be saved in the order
    const orderItems = selectedItems.map(item => ({
      name: item.title,
      cost: item.price,
      quantity: item.quantity,
      image: item.image,
      description: item.description,
      category: item.category // Ensure 'category' field is included
    }));

    // Generate a new order ID
    const orderId = new mongoose.Types.ObjectId().toString();

    // Filter orderItems into starters, main, dessert arrays
    const starters = orderItems.filter(item => item.category === 'starters');
    const main = orderItems.filter(item => item.category === 'main');
    const dessert = orderItems.filter(item => item.category === 'dessert');
    const now = new Date();
    const orderDate = now.toISOString().split('T')[0]; // Extract the date part
    const orderTime = now.toTimeString().split(' ')[0];
    // Save the new order with only the current selected items
    const newOrder = new OrderSelected({
      
      hotel_id: hotelId,
      user_id: userId,
      restro: [{
        order_id: orderId,
        restro_id: restoId,
        name: restaurant.name,
        description: restaurant.description,
        rating: restaurant.rating,
        menu: {
          starters: starters,
          main: main,
          dessert: dessert
        }
      }],
  
      date_of_order: orderDate, // Set current date
      time_of_order: orderTime 
    });

    await newOrder.save();

    // Send back the order ID in the response
    res.json({ message: 'Selected items stored successfully', orderId: orderId, newOrder });
  } catch (error) {
    console.error('Error storing selected items:', error);
    res.status(500).json({ error: 'Server error' });
  }
});




router.get('/orderconfirmation/:hotelId/:restoId/:userId/:orderId', async (req, res) => {
  const { hotelId, restoId, userId, orderId } = req.params;

  try {
    // Find the specific order based on hotelId, userId, restoId, and orderId
    const order = await OrderSelected.findOne({
      hotel_id: hotelId,
      user_id: userId,
      'restro.restro_id': restoId,
      'restro.order_id': orderId
    }).exec();

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Find the specific restaurant order
    const restaurantOrder = order.restro.find(
      restro => restro.restro_id === restoId && restro.order_id === orderId
    );

    if (!restaurantOrder) {
      return res.status(404).json({ error: 'Restaurant order not found for this user' });
    }

    // Prepare menu object with non-empty categories
    const menu = {};

    if (restaurantOrder.menu.starters && restaurantOrder.menu.starters.length > 0) {
      menu.starters = restaurantOrder.menu.starters.map(item => ({
        title: item.name,
        price: item.cost,
        quantity: item.quantity,
        image: item.image,
        description: item.description
      }));
    }

    if (restaurantOrder.menu.main && restaurantOrder.menu.main.length > 0) {
      menu.main = restaurantOrder.menu.main.map(item => ({
        title: item.name,
        price: item.cost,
        quantity: item.quantity,
        image: item.image,
        description: item.description
      }));
    }

    if (restaurantOrder.menu.dessert && restaurantOrder.menu.dessert.length > 0) {
      menu.dessert = restaurantOrder.menu.dessert.map(item => ({
        title: item.name,
        price: item.cost,
        quantity: item.quantity,
        image: item.image,
        description: item.description
      }));
    }

    // Return the menu with selected items
    res.json({ menu });
  } catch (error) {
    console.error('Error fetching order confirmation details:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get("/orderhistory/:hotelId/:userId", async (req, res) => {
  const {hotelId, userId } = req.params;

  try {
    console.log("Trying to fetch order history....");
    console.log("My hotel Id is: " + hotelId);
    const orders = await OrderSelected.find({ user_id: userId });
    console.log(orders);
    if (orders.length > 0) {
      res.json(orders);
    } else {
      res.status(404).json({ error: "No orders found for this user." });
    }
    console.log("Order history Fetched!");

  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ error: "Server error" });
  }
});

router.patch('/orderconfirmation/:orderId', async (req, res) => {
  const orderId = req.params.orderId;

  try {
    console.log("Trying to confirm order...");
    // Find the order by orderId and update the confirmed field
    console.log("The order Id is : " + orderId);
    const updatedOrder = await OrderSelected.findOneAndUpdate(
      { 'restro.order_id': orderId },
      { $set: { confirmed: true } }, // Update confirmed directly
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    console.log("Order Confirmed!");

    // Send back the updated order (optional)
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});



router.get('/housekeeping/:hotelId/:userId', async (req, res) => {
  const { hotelId } = req.params;

  try {
    const services = await HousekeepingService.find({ hotelId });
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching housekeeping services:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




router.post('/housekeeping/:hotelId/:userId', async (req, res) => {
  const { hotelId, userId } = req.params;
  const { items } = req.body;
  const orderId = new mongoose.Types.ObjectId().toString();

  try {
    // Check if there's an existing SelectedItems document with the orderId
    let selectedItems = await SelectedItems.findOne({ orderId });

    if (!selectedItems) {
      // If no existing SelectedItems, create a new one
      selectedItems = new SelectedItems({
        orderId,
        roomId: userId,
        hotelId,
        completed: false,
        date_of_order: new Date(),
        time_of_order: new Date().toISOString().split('T')[1].substring(0, 8),
        items: items // Assuming `items` is an array of objects with `serviceName` and `quantity`
      });

      await selectedItems.save();
    } else {
      // If found, update the items array by pushing new items or updating existing ones
      items.forEach(newItem => {
        const existingItem = selectedItems.items.find(item => item.serviceName === newItem.serviceName);
        if (existingItem) {
          // If item already exists, update quantity
          existingItem.quantity = newItem.quantity;
        } else {
          // If item doesn't exist, push it to the array
          selectedItems.items.push(newItem);
        }
      });

      await selectedItems.save();
    }

    res.status(200).json({ message: 'Order submitted successfully' });
  } catch (error) {
    console.error('Error submitting order:', error);
    res.status(500).json({ error: 'Failed to submit order' });
  }
});










export { router as UserRouter };
