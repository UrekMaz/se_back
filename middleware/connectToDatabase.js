// import mongoose from 'mongoose';

// const connections = {};

// const connectToDatabase = (req, res, next) => {
//   const hotelId = req.query.hotelId || req.body.hotelId;
//   console.log("Connecting to Specific Database");
//   console.log("Database Name in connectToDatabase :" + hotelId);
//   if (!hotelId) {
//     return res.status(400).send("Database identifier (hotelId) is required");
//   }
  
//   const baseMongoURI = 'mongodb+srv://dcmaureenmiranda:yEQsQNpRxcPAvaOd@cluster0.oivkqrl.mongodb.net/';
//   const databaseName = `${hotelId}`;
//   const MONGODB_URI = `${baseMongoURI}${databaseName}?retryWrites=true&w=majority`;

//   if (mongoose.connection.readyState === 0 || mongoose.connection.name !== databaseName) {
//     if (mongoose.connection.readyState !== 0) {
//       mongoose.disconnect();
//     }
//     mongoose.connect(MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => {
//       console.log(`Successfully connected to MongoDB database: ${databaseName}`);
//       next();
//     })
//     .catch((error) => {
//       console.error('Error connecting to MongoDB:', error);
//       res.status(500).send("Error connecting to database");
//     });
//   } else {
//     next();
//   }
// };

// export default connectToDatabase;

import mongoose from 'mongoose';

const connections = {};

const connectToDatabase = (req, res, next) => {
  const hotelId = req.query.hotelId || req.body.hotelId;
  console.log("Connecting to Specific Database");
  console.log("Database Name in connectToDatabase: " + hotelId);
  
  if (!hotelId) {
    // If hotelId is not provided, you can choose to connect to a default/shared database
    // For example, connect to a database named 'shared' or 'default'
    const baseMongoURI = 'mongodb+srv://dcmaureenmiranda:yEQsQNpRxcPAvaOd@cluster0.oivkqrl.mongodb.net/';
    const databaseName = 'hotelDatbase'; // Example: default or shared database name
    const MONGODB_URI = `${baseMongoURI}${databaseName}?retryWrites=true&w=majority`;

    if (mongoose.connection.readyState === 0 || mongoose.connection.name !== databaseName) {
      if (mongoose.connection.readyState !== 0) {
        mongoose.disconnect();
      }
      mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log(`Successfully connected to MongoDB database: ${databaseName}`);
        next();
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        res.status(500).send("Error connecting to database");
      });
    } else {
      next();
    }
  } else {
    // If hotelId is provided, connect to the specific database
    const baseMongoURI = 'mongodb+srv://dcmaureenmiranda:yEQsQNpRxcPAvaOd@cluster0.oivkqrl.mongodb.net/';
    const databaseName = `${hotelId}`;
    const MONGODB_URI = `${baseMongoURI}${databaseName}?retryWrites=true&w=majority`;

    if (mongoose.connection.readyState === 0 || mongoose.connection.name !== databaseName) {
      if (mongoose.connection.readyState !== 0) {
        mongoose.disconnect();
      }
      mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log(`Successfully connected to MongoDB database: ${databaseName}`);
        next();
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        res.status(500).send("Error connecting to database");
      });
    } else {
      next();
    }
  }
};

export default connectToDatabase;

