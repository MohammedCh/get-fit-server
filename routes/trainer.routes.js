const express = require("express");
const router = express.Router();

//returns a trainer's profile
router.get("/:userId", (req, res) => {});

//returns a list of all conversations the trainer has responded to
router.get("/conversations", (req, res) => {});


module.exports = router;
