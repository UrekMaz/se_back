import mongoose from 'mongoose';

const RestroPendingSchema = new mongoose.Schema({
  hotel_id: { type: String, required: true },
  room_no: { type: Number, required: true },
  items: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  time_of_order: { type: Date, required: true },
  completed: { type: Boolean, required: true },
  time_of_completion: { type: Date, required: true },

});

const RestroPending = mongoose.model('RestroPending', RestroPendingSchema);
export default RestroPending;


