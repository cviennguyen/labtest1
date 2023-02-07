const express = require("express");
const routes = express.Router();
const { protect } = require("../controllers/authController");
const {
  getAllRooms,
  createRoom,
  getRoom,
  addToRoom,
  removeFromRoom,
} = require("../controllers/roomController");

routes
  .get("/", protect, getAllRooms)
  .post("/", protect, createRoom)
  .get("/:id", getRoom)
  .put("/roomAdd", addToRoom)
  .put("/roomRemove", removeFromRoom);

module.exports = routes;
