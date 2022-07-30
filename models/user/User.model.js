const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    primary_email: { type: Schema.Types.ObjectId, ref: "ContactMech" },
    popular: { type: Boolean, default: false },
    is_active: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Accepted", "Rejected"],
    },

    address: {
      state: { type: String },
      city: { type: String },
      officeAddress: { type: String },
    },
    interests: {
      specialization: { type: String },
      languagePreference: { type: String },
      interest: { type: String },
    },
    companyName: { type: String },
    experience: { type: String },
    reraNumber: { type: String, unique: true },
    employees: { type: String },
    type: [
      {
        type: String,
        default: ["user"],
        enum: ["admin", "user"],
        // required: isUser,
      },
    ],
    is_verified: { type: Boolean, required: true, default: false },
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
