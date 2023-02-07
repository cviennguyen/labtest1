const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const roomRoute = require("./routes/roomRoute");
const messageRoute = require("./routes/messageRoute");
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 8000;
const app = express();

const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.use(cors());
app.use(express.json());

app.use("/api/", userRoute);
app.use("/api/room", roomRoute);
app.use("/api/message", messageRoute);

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
