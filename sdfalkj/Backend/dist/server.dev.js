"use strict";

require("dotenv").config();

var express = require("express");

var cors = require("cors");

var mongoose = require("mongoose");

var notesRouter = require("./routes/notes");

var aiRouter = require("./routes/ai");

var app = express();
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || "*"
}));
app.use(express.json()); // ✅ API Routes

app.use("/api/notes", notesRouter);
app.use("/api/ai", aiRouter);
var PORT = process.env.PORT || 4000; // ✅ MongoDB Connection

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log("✅ MongoDB connected");
})["catch"](function (err) {
  return console.error("MongoDB error:", err);
});
app.listen(PORT, function () {
  return console.log("\uD83D\uDE80 Server running on port ".concat(PORT));
});