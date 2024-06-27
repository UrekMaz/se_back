import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const selectedItemsSchema = new Schema({
  roomId: { type: String, required: true },
  hotelId: { type: String, required: true },
  completed:{type:Boolean,required:true},
  date_of_order: { type: Date, required: true },
  time_of_order: { type: String, required: true },
  time_of_completion: { type: String, default: '' },
  orderId: {type: String, default: '' },
  items: [
    {
        
        serviceName: { type: String, required: true },
        price: { type: Number, required: true },
        imgSrc: { type: String, required: true },
        altText: { type: String, default: '' },
      quantity: { type: Number, required: true, default: 0 },
     
    }
  ],
});

const SelectedItems = mongoose.model('SelectedItems', selectedItemsSchema);

export default SelectedItems;