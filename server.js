const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://fardosa:1+!qas2w@nodecrush.k6agoag.mongodb.net/reservations?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error connecting to MongoDB:', error);
});

// Create a schema for the reservation
const reservationSchema = new mongoose.Schema({
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

// Create a model based on the schema
const Reservation = mongoose.model('Reservation', reservationSchema);

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (CSS and client-side JavaScript)
app.use(express.static(__dirname + '/public'));

// Handle form submission
app.post('/reservation', (req, res) => {
  // Validate form data
  const { checkInDate, checkOutDate, name, email } = req.body;
  if (!checkInDate || !checkOutDate || !name || !email) {
    return res.status(400).send('Missing required fields');
  }

  // Create a new reservation instance based on the form data
  const newReservation = new Reservation({
    checkInDate,
    checkOutDate,
    name,
    email
  });

  // Save the reservation to the database
  newReservation.save().then(() => {
    console.log('Reservation saved:', newReservation);
    res.send('Reservation confirmed');
  }).catch((error) => {
    console.log('Error saving reservation:', error);
    if (error.code === 11000) {
      return res.status(409).send('Email already exists');
    }
    res.status(500).send('Error confirming reservation');
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
