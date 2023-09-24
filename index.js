require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api/user", require("./routes/userRouter"));
app.use("/api", require("./routes/reportRouter"));
app.use("*", (req, res) => {
  res.status(400).json({ error: true, status: 404, msg: "404 Not Found! rashed" });
});

const PORT = process.env.PORT;
// mongodb live url
const URI = process.env.MONGODB_URL;

// Connect to MongoDB
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
// on database connection error
db.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});
// on database connection establish
db.once("open", () => {
  console.log("\x1b[34m" + "Database Connected" + "\x1b[34m");
});

// Start server
app.listen(PORT, () => {
  console.log(
    "\x1b[33m" + `Server is Connected to http://localhost:${PORT}` + "\x1b[33m"
  );
});
