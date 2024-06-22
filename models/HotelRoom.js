import mongoose from 'mongoose';

const HotelRoomSchema = new mongoose.Schema({
  hotel_id: { type: String, required: true },
  room_no: { type: Number, required: true },
  occupied: { type: Boolean, required: true },
  type: { type: String, required: true },
  type_of_beds: { type: String, required: true }
});

const HotelRoom = mongoose.model('HotelRoom', HotelRoomSchema);
export default HotelRoom;
