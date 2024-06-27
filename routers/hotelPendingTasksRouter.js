import express from 'express';
import HotelPendingTasks from '../models/HotelPendingTasks.js';
import HotelEmployees from '../models/hotelEmployees.js';

const router = express.Router();

// Route to get pending tasks for a manager
router.get('/pending-tasks/:hotelId', async (req, res) => {
  const { hotelId } = req.params;
  try {
    console.log("Trying to fetch tasks");
    const tasks = await HotelPendingTasks.find({ hotel_id: hotelId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching pending tasks' });
  }
});

// Route to update the assigned person for a task
router.put('/pending-tasks/:taskId/assign', async (req, res) => {
  const { taskId } = req.params;
  const { assigned_to, time_of_assignment } = req.body;
  
  try {
    const updatedTask = await HotelPendingTasks.findByIdAndUpdate(
      taskId,
      { 'assigned_to': assigned_to, 'time_of_assignment': time_of_assignment },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating task assignment' });
  }
});

// Route to update the completion status for a task
router.put('/pending-tasks/:taskId/complete', async (req, res) => {
  const { taskId } = req.params;
  const { completed, time_of_completion } = req.body;
  
  try {
    const updatedTask = await HotelPendingTasks.findByIdAndUpdate(
      taskId,
      { completed: completed, 'time_of_completion': time_of_completion },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating task completion status' });
  }
});

// Endpoint to fetch completed tasks for a specific hotel
router.get('/:hotel_id/completed-tasks', async (req, res) => {
  try {
    const { hotel_id } = req.params;
    const completedTasks = await HotelPendingTasks.find({ hotel_id, completed: true });
    res.status(200).json(completedTasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching completed tasks', error });
  }
});


export { router as hotelPendingTasksRouter };
