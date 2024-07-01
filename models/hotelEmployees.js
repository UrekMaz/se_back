import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
});

const HotelEmployeesSchema = new mongoose.Schema({
  hotelId: { type: String, required: true },
  managers: [EmployeeSchema],
  housekeepers: [EmployeeSchema],
  masters: [EmployeeSchema],
  restaurant: [EmployeeSchema],
});

const HotelEmployees = mongoose.model('HotelEmployees', HotelEmployeesSchema);
export default HotelEmployees;
