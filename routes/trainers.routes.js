const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const isTrainer = require("../middleware/isTrainer");
const router = express.Router();
const Conversation = require("../models/Conversation.model");
const User = require("../models/User.model");

//returns a trainer's profile
router.get("/profile", isLoggedIn, isTrainer, async (req, res) => {
  try {
    const profile = await User.find({
      _id: req.session.user._id,
    });
    res.status(200).json(profile);
  } catch (e) {
    (e) => res.status(500).json("Error fetching profile " + e);
  }
});

//returns a list of all conversations the trainer has responded to
router.get("/conversations", isLoggedIn, isTrainer, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      trainerId: req.session.user._id,
    });
    res.status(200).json(conversations);
  } catch (e) {
    (e) => res.status(500).json("Error fetching conversations " + e);
  }
});

module.exports = router;
