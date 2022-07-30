const { Schema, model } = require("mongoose");

const panelSchema = new Schema({
  panelName: {
    type: String,
    default: "doing",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = model("Panels", panelSchema);
