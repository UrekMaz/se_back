import mongoose from 'mongoose';

const RoomCurrentBillCycleSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  room_id: { type: String, required: true },
  current_bill_cycle_id: { type: mongoose.Schema.Types.ObjectId, required: true }
});

const RoomCurrentBillCycle = mongoose.model('RoomCurrentBillCycle', RoomCurrentBillCycleSchema);
export default RoomCurrentBillCycle;
