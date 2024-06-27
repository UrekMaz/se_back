import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const hotelUserSchema = new Schema({
  hotel_id: { type: String, required: true },
  user_id: { type: String, required: true },
  restro: [{
    restro_id: { type: String, required: true },
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
    }
  }]
});

const HotelUserSelected = mongoose.model('HotelUserSelected', hotelUserSchema);
export default HotelUserSelected;
