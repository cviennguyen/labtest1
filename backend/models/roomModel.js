const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  users: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Message",
    },
  ],
});

module.exports = mongoose.model("Room", RoomSchema);
