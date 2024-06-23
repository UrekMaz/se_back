import mongoose from 'mongoose';

const MenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  image: { type: String },
  description: { type: String }
});

const RestroSchema = new mongoose.Schema({
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  name: { type: String, required: true },
  imageSrc: { type: String },
  restro_id: { type: String, required: true },
  menu: {
    starters: [MenuSchema],
    main: [MenuSchema],
    dessert: [MenuSchema]
  }
});

const HotelRestroSchema = new mongoose.Schema({
  hotel_id: { type: String, required: true },
  restro: [RestroSchema]
});

const HotelRestro = mongoose.model('HotelRestro', HotelRestroSchema);
export default HotelRestro;
