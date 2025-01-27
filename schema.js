// Import Mongoose
const mongoose = require("mongoose");

// Define the embedded profile schema
const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 0, // Ensure age is non-negative
  },
});

// Define the main user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true, // Removes unnecessary spaces
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, // Regex for email validation
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"], // Minimum length requirement
    },
    roles: {
      type: [String],
      default: ["user"], // Default role
      enum: ["user", "admin"], // Limit roles to predefined values
    },
    profile: {
      type: profileSchema, // Embedded document
      required: true,
    },
    lastLogin: {
      type: Date,
      default: null, // Default to null if no login has occurred yet
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the schema as a Mongoose model
const User = mongoose.model("User", userSchema);

module.exports = User;
