import mongoose from 'mongoose';

const RoomBillSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  room_id: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date },
  orders: [{
    order_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    description: { type: String, required: true },
    cost: { type: Number, required: true }
  }]
});

const RoomBill = mongoose.model('RoomBill', RoomBillSchema);
export default RoomBill;
