const express = require("express");
const router = express.Router();

//gets trainers' landing page
router.get("/", (req, res) => {});

//returns a trainer's profile
router.get("/:profileId", (req, res) => {});

//returns a list of all conversations the trainer has responded to
router.get("/conversations", (req, res) => {});


module.exports = router;
