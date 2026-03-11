const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: { type: String, default: "Untitled" },
  content: { type: String, default: "" },
  // react-flow stores { x, y } etc
  position: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
  },
  // metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

NoteSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Note", NoteSchema);
