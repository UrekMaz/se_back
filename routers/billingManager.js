import express from 'express';
import SelectedItems from '../models/selectedItemsSchema.js';

const router = express.Router();

// API endpoint to fetch billing data for a specific room number
router.get('/:roomNumber', async (req, res) => {
  const { roomNumber } = req.params;

  try {
    const billingData = await SelectedItems.findOne({ roomId: roomNumber, completed: true });

    if (!billingData) {
      return res.status(404).json({ error: 'Billing data not found' });
    }

    res.status(200).json(billingData);
  } catch (error) {
    console.error('Error fetching billing data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;