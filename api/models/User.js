const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: "Unknown" },
    profilePic: { type: String, default: "" },
    phone: { type: String, default: "" },
    bio: { type: String, default: "" },
    address: { type: String, default: "" },
    dob: { type: String, default: "01-01-2023" },
    gender: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
