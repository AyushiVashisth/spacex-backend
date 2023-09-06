// Import required libraries and modules
const express = require("express"); // Import Express.js framework
require("dotenv").config(); // Load environment variables from a .env file
const connection = require("./config/db"); // Import database connection configuration
const app = express(); // Create an Express application instance

// Middleware setup
app.use(express.json()); // Parse incoming JSON data
const cors = require("cors"); // Enable Cross-Origin Resource Sharing (CORS)
app.use(cors()); // Use CORS middleware for handling cross-origin requests

// Define routes
const userRouter = require("./routes/User.Route"); // Import user-related routes
app.use("/users", userRouter); // Use the user router for requests to /users route

// Define a simple root endpoint
app.get("/", (req, res) => {
  res.setHeader("Content-type", "text/html");
  res.send(`<h1>Space User Authentication</h1>`); // Send a basic HTML response for the root endpoint
});

// Start the server and connect to the database
const port = process.env.PORT; // Get the port number from environment variables
app.listen(port, async () => {
  try {
    await connection; // Wait for the database connection to be established
    console.log("connected to Database");
  } catch (error) {
    console.log("unable to connect to database");
    res.status(404).send(error.message); // Handle database connection error
  }
  console.log(`Server is running on port ${port}`); // Print a message indicating the server is running
});
