const asyncHandler = require("express-async-handler");

const Room = require("../models/roomModel");
exports.getAllRooms = asyncHandler(async (req, res) => {
  const rooms = await Room.find();
  res.status(200).json({
    status: true,
    data: {
      rooms,
    },
  });
});

exports.createRoom = asyncHandler(async (req, res) => {
  const room = await Room.create(req.body);
  res.status(201).json({
    status: true,
    data: {
      room,
    },
  });
});

exports.getRoom = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id)
    .populate("users", "-lastName -password -createdOn -username -__v")
    .populate("messages");
  res.status(200).json({
    status: true,
    data: {
      room,
    },
  });
});

exports.addToRoom = asyncHandler(async (req, res) => {
  const { roomId, userId } = req.body;

  const added = await Room.findByIdAndUpdate(
    roomId,
    { $push: { users: userId } },
    { new: true }
  ).populate("users", "-lastName -password -createdOn -username -__v");

  res.status(200).json({
    status: true,
    data: {
      added,
    },
  });
});

exports.removeFromRoom = asyncHandler(async (req, res) => {
  const { roomId, userId } = req.body;

  const added = await Room.findByIdAndUpdate(
    roomId,
    { $pull: { users: userId } },
    { new: true }
  ).populate("users", "-lastName -password -createdOn -username -__v");

  res.status(200).json({
    status: true,
    data: {
      added,
    },
  });
});
