const express = require("express");
const router = express.Router();

//gets the query creation form
router.get("/create", (req, res) => {});

//submits and creates a query
router.post("/create", (req, res) => {});

//shows a list of a trainees queries
router.get("/my-queries", (req, res) => {});

//shows a list of all active queries (for trainers)
router.get("/list", (req, res) => {});

//shows a query's details
router.get("/:queryId", (req, res) => {});

//returns the conversation
router.get("/:conversationId", (req, res) => {});

//add message to the conversation
router.post("/:conversationId", (req, res) => {});

module.exports = router;
