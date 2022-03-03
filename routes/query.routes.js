const express = require("express");
const router = express.Router();

//submits and creates a query
router.post("/create", (req, res) => {});

//shows a list of a trainee's queries
router.get("/:userId", (req, res) => {});

//shows a list of all active queries (for trainers)
router.get("/list", (req, res) => {});

//shows a query's details
router.get("/:queryId", (req, res) => {});

//returns the conversation
router.get("/:conversationId", (req, res) => {});

//add message to the conversation
router.post("/:conversationId", (req, res) => {});

module.exports = router;
