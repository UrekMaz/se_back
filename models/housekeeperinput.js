import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const housekeepingServiceSchema = new Schema({
  hotelId: { type: String, required: true },
  serviceName: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  imgSrc: { type: String, required: true },
  altText: { type: String, default: '' }
});

const HousekeepingService = mongoose.model('HousekeepingService', housekeepingServiceSchema);

export default HousekeepingService;
