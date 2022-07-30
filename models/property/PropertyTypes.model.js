const { Schema, model } = require("mongoose");

const PropertyTypeSchema = new Schema(
  {
    buildingType: {
      type: String,
      enum: ["residence", "commercial"],
      required: true,
    },
    type: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const ProperyType = model("ProperyType", PropertyTypeSchema, "ProperyType");

// make this available to our users in our Node applications
module.exports = ProperyType;
