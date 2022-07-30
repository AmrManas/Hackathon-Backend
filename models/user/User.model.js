const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    primary_email: { type: Schema.Types.ObjectId, ref: "ContactMech" },
    address: {
      state: { type: String },
      city: { type: String },
      officeAddress: { type: String },
    },
    phonumber: {
      countryCode: { type: String },
      number: { type: String },
    },
    jobTitle: { type: String },

    role: { type: String, default: "user", enum: ["user", "admin"] },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const User = model("User", userSchema, "user");

module.exports = User;

// function isUser() {
//   if (this.role === "user") return true;
//   return false;
// }
