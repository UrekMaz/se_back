import mongoose from 'mongoose';

const ManagerSchema = new mongoose.Schema({
  hotel_id: { type: String, required: true },
  user_id: { type: String, required: true },
  password: { type: String, required: true }
});

const HousekeeperSchema = new mongoose.Schema({
  hotel_id: { type: String, required: true },
  user_id: { type: String, required: true },
  password: { type: String, required: true }
});

const MasterSchema = new mongoose.Schema({
  hotel_id: { type: String, required: true },
  user_id: { type: String, required: true },
  password: { type: String, required: true }
});

const RestaurantSchema = new mongoose.Schema({
  hotel_id: { type: String, required: true },
  user_id: { type: String, required: true },
  password: { type: String, required: true }
});

const HotelLoginSchema = new mongoose.Schema({
  manager: ManagerSchema,
  housekeeper: HousekeeperSchema,
  master: MasterSchema,
  restaurant: RestaurantSchema
});

const HotelLogin = mongoose.model('HotelLogin', HotelLoginSchema);
export default HotelLogin;
