const { Schema, model } = require("mongoose");
const address = new Schema({
  country: {
    type: String,
    default: "India",
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pin: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    maxLength: 200,
    minLength: 10,
    required: true,
  },
});
module.exports = model("Address", address);
