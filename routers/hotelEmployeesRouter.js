import express from 'express';
import HotelEmployees from '../models/hotelEmployees.js';


const router = express.Router();

// Route to get all housekeepers for a specific hotel
router.get('/housekeepers/:hotelId', async (req, res) => {
  const { hotelId } = req.params;
  try {
    console.log("Fetching Housekeepers");
    const employees = await HotelEmployees.find({ 'housekeeper.hotel_id': hotelId });
    if (employees.length > 0) {
      const housekeepers = employees.map(emp => emp.housekeeper).flat().map(hk => ({
        user_id: hk.user_id,
        name: hk.name
      }));
      res.status(200).json(housekeepers);
      console.log("Fetched Housekeepers");
    } else {
      res.status(404).json({ message: 'Housekeepers not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching housekeepers' });
  }
});

export { router as hotelEmployeesRouter };
