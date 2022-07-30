const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
  },
  {
    username: { type: String, unique: true, required: true },
  },
  {
    password: { type: String, unique: true, required: true },
  },
  {
    phoneNumber: { type: String, unique: true, required: true },
  },
  {
    timestamps: { type: String, unique: true, required: true },
  }
);
module.exports = mongoose.model("User", UserSchema);
