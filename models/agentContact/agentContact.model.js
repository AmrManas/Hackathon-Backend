const { Schema, model } = require("mongoose");

const agentContactSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    isContacted: { type: Boolean, default: false },
    remarks: { type: String },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Bookmark = model("AgentContact", agentContactSchema, "agentCOntact");

module.exports = Bookmark;
