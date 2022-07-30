const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: Number,
      unique: true,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    address: {
      ref: "address",
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema, "user");

module.exports = User;
