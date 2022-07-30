const { Schema, model } = require("mongoose");

const likeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "PropertyNew",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const LikeProperty = model("LikeProperty", likeSchema, "likeproperty");

// make this available to our users in our Node applications
module.exports = LikeProperty;
