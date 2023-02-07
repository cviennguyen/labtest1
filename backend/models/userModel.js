const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please add a username"],
    primaryKey: true,
    validate: {
      validator: async (username) => {
        const usernameCount = await mongoose.models.User.countDocuments({
          username,
        });
        return !usernameCount;
      },
      message: "Username already exists",
    },
  },

  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("User", UserSchema);
