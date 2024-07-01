// completedTasks.js

import express from 'express';
import SelectedItems from '../models/selectedItemsSchema.js';

const router = express.Router();

// Endpoint to fetch completed tasks
router.get('/completedTasks', async (req, res) => {
  try {
    const completedTasks = await SelectedItems.find({ completed: true });
    res.status(200).json(completedTasks);
  } catch (error) {
    console.error('Error fetching completed tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
