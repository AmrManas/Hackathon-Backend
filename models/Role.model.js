const { Schema, model } = require("mongoose");
const roleSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
const Role = model("Role", roleSchema);

module.exports = Role;
