const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    rquired: true,
  },
  address: {
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    officeAddress: {
      type: String,
    },
  },
  interests: {
    specialization: {
      type: String,
    },
    languagePreference: {
      type: String,
    },
    interest: {
      type: String,
    },
  },
});

module.exports = model("Profile", profileSchema);
