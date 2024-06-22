import mongoose from 'mongoose';

const FoodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String },
  description: { type: String }
});

const RestroSchema = new mongoose.Schema({
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  name: { type: String, required: true },
  menu: {
    starters: [FoodItemSchema],
    main: [FoodItemSchema],
    dessert: [FoodItemSchema]
  }
});

const UserOrderHistorySchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  restro_id: { type: String, required: true },
  food_items: [FoodItemSchema],
  date_of_order: { type: Date, required: true },
  time_of_order: { type: Date, required: true }
});

const UserHousekeepingHistorySchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  restro_id: { type: String, required: true },
  housekeeping_items: [FoodItemSchema],
  date_of_order: { type: Date, required: true },
  time_of_order: { type: Date, required: true }
});

const UserHousekeepingSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  service_name: { type: String, required: true },
  title: { type: String, required: true },
  cost: { type: Number, required: true },
  image: { type: String }
});

const HotelUserSchema = new mongoose.Schema({
  hotel_id: { type: String, required: true },
  restro: [RestroSchema],
  user_order_history: UserOrderHistorySchema,
  user_housekeeping_history: UserHousekeepingHistorySchema,
  user_housekeeping: UserHousekeepingSchema
});

const HotelUser = mongoose.model('HotelUser', HotelUserSchema);
export default HotelUser;
