import mongoose from 'mongoose';

const ManagerSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  hotel_id: { type: String, required: true },
});

const HousekeeperSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  hotel_id: { type: String, required: true },
});

const MasterSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  hotel_id: { type: String, required: true },
});

const RestaurantSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  hotel_id: { type: String, required: true },
});

const HotelEmployeesSchema = new mongoose.Schema({
  manager: ManagerSchema,
  housekeeper: HousekeeperSchema,
  master: MasterSchema,
  restaurant: RestaurantSchema
});

const HotelEmployees = mongoose.model('HotelEmployees', HotelEmployeesSchema);
export default HotelEmployees;
