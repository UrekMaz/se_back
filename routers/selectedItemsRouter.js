import express from 'express';
import SelectedItems from '../models/selectedItemsSchema.js';

const router = express.Router();

// Route to get selected items for a specific hotel, optionally filtered by userId
router.get('/selected-items/:hotelId', async (req, res) => {
    const { hotelId } = req.params;
    const { userId } = req.query;
  
    try {
      console.log("Trying to fetch selected items");
      let query = { hotelId, completed: false }; // Ensure only incomplete items are fetched
  
      if (userId) {
        query['assigned_to.user_id'] = userId;
      }
  
      const items = await SelectedItems.find(query);
      res.status(200).json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching selected items' });
    }
  });

// Route to update the assigned person for an item
router.put('/selected-items/:itemId/assign', async (req, res) => {
  const { itemId } = req.params;
  const { assigned_to, time_of_assignment } = req.body;
  
  try {
    const updatedItem = await SelectedItems.findByIdAndUpdate(
      itemId,
      { 'assigned_to': assigned_to, 'time_of_assignment': time_of_assignment },
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating item assignment' });
  }
});

// Route to update the completion status for an item
router.put('/selected-items/:itemId/complete', async (req, res) => {
  const { itemId } = req.params;
  const { completed, time_of_completion } = req.body;
  
  try {
    const updatedItem = await SelectedItems.findByIdAndUpdate(
      itemId,
      { completed: completed, 'time_of_completion': time_of_completion },
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating item completion status' });
  }
});

// Endpoint to fetch completed items for a specific hotel
router.get('/:hotelId/completed-items', async (req, res) => {
  try {
    const { hotelId } = req.params;
    const completedItems = await SelectedItems.find({ hotelId, completed: true });
    res.status(200).json(completedItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching completed items', error });
  }
});

export { router as selectedItemsRouter };
