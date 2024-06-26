import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, default: '' },
  description: { type: String, default: '' }
});

const orderSchema = new Schema({
  order_id: { type: String, required: true },
  items: [itemSchema]
});

const restroSchema = new Schema({
  restro_id: { type: String, required: true },
  order_id: { type: String, required: true },
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  rating: { type: String, default: '' },
  menu: {
    starters: [{
      name: { type: String, required: true },
      cost: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, default: '' },
      description: { type: String, default: '' }
    }],
    main: [{
      name: { type: String, required: true },
      cost: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, default: '' },
      description: { type: String, default: '' }
    }],
    dessert: [{
      name: { type: String, required: true },
      cost: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, default: '' },
      description: { type: String, default: '' }
    }]
  } // Array to store multiple orders
});

const hotelUserSchema = new Schema({
  hotel_id: { type: String, required: true },
  user_id: { type: String, required: true },
  confirmed:{type:Boolean,default:false},
  restro: [restroSchema], // Nested schema for restros under each hotel user
  date_of_order: { type: Date, required: true },
  time_of_order: { type: String, required: true },
  completed: { type: Boolean, default: false },
  time_of_completion: { type: Date, required: false},
});

const OrderSelected = mongoose.model('OrderSelected', hotelUserSchema);

export default OrderSelected;