const express = require("express");
const routes = express.Router();
const { sendMessage } = require("../controllers/messageController");

routes.route("/").post(sendMessage);

module.exports = routes;
