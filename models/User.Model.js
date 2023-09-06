const mongoose = require("mongoose"); // Import Mongoose for MongoDB interactions

// Define the user schema
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true }, // User's name (required)
    email: { type: String, required: true }, // User's email (required)
    password: { type: String, required: true } // User's password (required)
  },
  {
    versionKey: false // Disable the "__v" field in the document
  }
);

// Create a User model based on the schema
const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel; // Export the User model for use in other parts of the application
