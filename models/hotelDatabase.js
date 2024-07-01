import mongoose from 'mongoose';

 const HotelDatabseSchema = new mongoose.Schema({
   hotelId: {
     type: String,
     required: true,
   },
   hotelName: {
     type: String,
     required: true,
   },
 });

 const HotelDatabase = mongoose.model('HotelDatabase', HotelDatabseSchema);
 export default HotelDatabase; 
