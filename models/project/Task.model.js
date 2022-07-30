const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    panel: { default: "todo", type: String, enum: ["todo", "doing", "done"] },
    timeSheet: {
      startTime: { type: Date },
      endTime: { type: Date },
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Task = model("Task", taskSchema, "task");

module.exports = Task;
