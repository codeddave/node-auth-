const express = require("express");
require("dotenv").config();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
/* app.use("/", (req, res, next) => {
  res.send("welcome");
  next();
}); */

app.use("/api/auth", authRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 4500;

const server = app.listen(PORT, () =>
  console.log(`listening on port: ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged error: ${err}`);
  server.close(() => process.exit(1));
});
