const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const Room = require("../models/roomModel");
const User = require("../models/userModel");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, senderId, roomId } = req.body;
  var newMessage = {
    sender: senderId,
    content: content,
    room: roomId,
  };

  var message = await Message.create(newMessage);
  message = await message.populate("sender");
  message = await message.populate("room");
  message = await User.populate(message, {
    path: "room.users",
  });

  await Room.findByIdAndUpdate(req.body.roomId, { message: message });
});

exports.sendMessage = sendMessage;
