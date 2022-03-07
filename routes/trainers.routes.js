const express = require("express");
const router = express.Router();
const Conversation = require("../models/Conversation.model");
const User = require("../models/User.model");

//returns a trainer's profile
router.get("/profile/:trainerId", async (req, res) => {
  try {
    const trainerId =
      req.payload.type === "trainer" ? req.payload._id : req.params.trainerId;

    //TODO add if (req.payload.type === "trainee") then check if trainer profile has responded to one of their queries - if not dont return
    const profile = await User.findById(trainerId);
    return res.status(200).json(profile);
  } catch (e) {
    return res.status(500).json("Error fetching profile " + e);
  }
});

module.exports = router;
