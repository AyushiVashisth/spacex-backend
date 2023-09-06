const mongoose = require("mongoose"); // Import Mongoose for MongoDB interactions
require("dotenv").config(); // Load environment variables from a .env file

// Establish a connection to the MongoDB database using the provided URL in the environment variables
const connection = mongoose.connect(`${process.env.mongoURL}`);

module.exports = connection; // Export the database connection for use in other parts of the application
