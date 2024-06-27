import mongoose from 'mongoose';

const HotelPendingTasksSchema = new mongoose.Schema({
  hotel_id: { type: String, required: true },
  room_no: { type: Number, required: true },
  time_of_request: { type: Date, required: true },

  requirement: { type: String, required: true },
  completed: { type: Boolean, required: true },
  time_of_assignment: { type: Date },
  time_of_completion: { type: Date },
  cost: { type: Number },
  assigned_to: {
    user_id: { type: String },  // Change to String type
    name: { type: String }
  }
});

const HotelPendingTasks = mongoose.model('HotelPendingTasks', HotelPendingTasksSchema);
export default HotelPendingTasks;
