import express from 'express';
import HotelDatabase from '../models/hotelDatabase.js';
import HotelEmployees from '../models/hotelEmployees.js';
import HotelLogin from '../models/hotelLogin.js';
import HotelRoom from '../models/HotelRoom.js';
import multer from 'multer';
import HousekeepingService from '../models/housekeeperinput.js';
import bcrypt from 'bcrypt';
const router = express.Router();
console.log("IN HOTEL DATABASE ROUTER");
// POST /hotels/add
router.post('/add', async (req, res) => {
  const { hotelName } = req.body;
  try {
    const hotelId = generateUniqueId();
    const newHotel = await HotelDatabase.create({
      hotelId,
      hotelName,
    });
    res.json(newHotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /hotels/get
router.get('/get', async (req, res) => {
  try {
    const hotels = await HotelDatabase.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper function to generate unique hotelId (for demo purposes)
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

// Function to generate a random 3-digit number
const generateRandomNumber = () => {
    return Math.floor(100 + Math.random() * 900); // Generates a random number between 100 and 999
  };
  
  // Function to generate user_id based on name and random numbers
  const generateUserId = (name) => {
    const lowercaseName = name.toLowerCase().replace(/\s/g, ''); // Convert name to lowercase and remove spaces
    const randomNumber = generateRandomNumber();
    return `${lowercaseName}${randomNumber}`;
  };
//   Function to generate Passwords
  function generatePassword(name) {
    const lowercaseName = name.toLowerCase().replace(/\s/g, ''); // Convert name to lowercase
    const randomNumbers = Math.floor(10000 + Math.random() * 90000); // Generate 5-digit random number
    
    const password = lowercaseName + randomNumbers.toString(); // Concatenate name and random number
    
    return password;
  }
  
  router.post('/employees/add', async (req, res) => {
    const { hotelId, employeeType, employeeDetails } = req.body;
    console.log("Trying to Add Employee");

    const user_id = generateUserId(employeeDetails.name);
    const pass = generatePassword(employeeDetails.name);
    console.log("Password : " + pass);
    
    try {
        let hotelEmployees = await HotelEmployees.findOne({ hotelId });
        if (!hotelEmployees) {
            hotelEmployees = await HotelEmployees.create({ hotelId });
        }
  
        // Ensure employeeDetails contains password before pushing to array
        employeeDetails.user_id = user_id;
        employeeDetails.password = pass;

        switch (employeeType) {
            case 'manager':
                hotelEmployees.managers.push(employeeDetails);
                break;
            case 'housekeeper':
                hotelEmployees.housekeepers.push(employeeDetails);
                break;
            case 'master':
                hotelEmployees.masters.push(employeeDetails);
                break;
            case 'restaurant':
                hotelEmployees.restaurant.push(employeeDetails);
                break;
            default:
                return res.status(400).json({ error: 'Invalid employee type' });
        }

        await hotelEmployees.save();
        console.log("Employee Added");

        const password = await bcrypt.hash(pass, 10);
        let schemaToUpdate;
        switch (employeeType) {
            case 'manager':
                schemaToUpdate = { manager: { hotel_id: hotelId, user_id, password } };
                break;
            case 'housekeeper':
                schemaToUpdate = { housekeeper: { hotel_id: hotelId, user_id, password } };
                break;
            case 'master':
                schemaToUpdate = { master: { hotel_id: hotelId, user_id, password } };
                break;
            case 'restaurant':
                schemaToUpdate = { restaurant: { hotel_id: hotelId, user_id, password } };
                break;
            default:
                return res.status(400).json({ error: 'Invalid employee type' });
        }

        const newEntry = new HotelLogin(schemaToUpdate);
        await newEntry.save();

        res.status(201).json({ message: 'Employee added successfully' });
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).json({ error: 'Failed to add employee' });
    }
});

// GET /employees/:hotelId
router.get('/employees/:hotelId', async (req, res) => {
  const { hotelId } = req.params;
  console.log("Fetching Different Hotel Employees");
  try {
    const hotelEmployees = await HotelEmployees.findOne({ hotelId });
    if (!hotelEmployees) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    res.json(hotelEmployees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Add a new hotel room
router.post('/hotelrooms/add', async (req, res) => {
  const { hotelId, room_no, occupied, type, type_of_beds } = req.body;
  const hotel_id = hotelId;
  try {
    console.log("Trying to Add hotel Room");
    const newRoom = new HotelRoom({
      hotel_id,
      room_no,
      occupied,
      type,
      type_of_beds,
    });

    await newRoom.save();
    console.log("Successfully Add hotel Room!");

    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: 'Error adding hotel room' });
  }
});

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Route to add a housekeeping service
router.post('/housekeeping-services/add', upload.single('image'), async (req, res) => {
  const { hotelId, serviceName, description, price, altText } = req.body;
  const imgSrc = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    // Ensure the price is a number
    const parsedPrice = Number(price);
    if (isNaN(parsedPrice)) {
      return res.status(400).json({ message: 'Invalid price value' });
    }

    console.log("Trying to add Housekeeping Services...");
    const newService = new HousekeepingService({
      hotelId,
      serviceName,
      description,
      price: parsedPrice,
      imgSrc,
      altText
    });

    await newService.save();
    console.log("Successfully Added Housekeeping Services!");
    res.status(201).json(newService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding housekeeping service' });
  }
});


export { router as HotelDatabaseRouter };
