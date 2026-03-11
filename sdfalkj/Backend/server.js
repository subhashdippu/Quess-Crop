require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const notesRouter = require("./routes/notes");
const aiRouter = require("./routes/ai");

const app = express();

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || "*" }));
app.use(express.json());

// ✅ API Routes
app.use("/api/notes", notesRouter);
app.use("/api/ai", aiRouter);

const PORT = process.env.PORT || 4000;

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
