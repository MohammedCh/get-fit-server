const express = require("express");
const router = express.Router();
const Conversation = require("../models/Conversation.model");
const Query = require("../models/Query.model");
const { Types } = require("mongoose");

//returns a list of all conversations the user is part of
router.get("/", async (req, res) => {
  try {
    const conversations =
      req.payload.type === "trainer"
        ? await Conversation.find({
            trainerId: req.payload._id,
          }).populate("queryId")
        : await Conversation.find({
            traineeId: req.payload._id,
          }).populate("queryId");
    res.status(200).json(conversations);
  } catch (e) {
    (e) => res.status(500).json("Error fetching conversations " + e);
  }
});

//TODO convert "allow if user part of conversation" to middleware instead of if statement
//create a conversation or add message to the conversation if you are part of it
router.post("/:conversationId", async (req, res) => {
  const { conversationId } = req.params;
  const { message, queryId } = req.body;

  //check validity of ID. If invalid, assign value of null
  const conversation = Types.ObjectId.isValid(conversationId)
    ? await Conversation.findById(conversationId)
    : null;

  // Run code only if the conversation exists
  if (conversation) {
    // Only append message if user is part of it
    if (
      conversation.trainerId == req.payload._id ||
      conversation.traineeId == req.payload._id
    ) {
      try {
        const response = await Conversation.findByIdAndUpdate(
          conversationId,
          {
            $push: {
              conversations: { senderId: req.payload._id, message },
            },
          },
          {
            new: true,
          }
        );
        return res
          .status(200)
          .json("Message added to conversation successfully!");
      } catch (e) {
        return res.status(500).json("Failed to update conversation " + e);
      }
    } else {
      res
        .status(403)
        .json("Can't access this conversation as you are not part of it.");
    }
  } else {
    try {
      const query = await Query.findById(queryId)
      const newConversation = await Conversation.create({
        trainerId: req.payload._id, // because only one who can create a the conversation is the trainer
        traineeId: query.createdBy,
        queryId,
        conversations: [{ senderId: req.payload._id, message }],
      });
      await Query.findByIdAndUpdate(queryId,
        { $push: { conversations: newConversation._id } },
        {
          new: true,
        });
      return res.status(200).json(newConversation);
    } catch (e) {
      res.status(500).json("Failed to create conversation " + e);
    }
  }
});

//TODO convert "allow if user part of conversation" to middleware instead of if statement
//returns the conversation if you are part of it
router.get("/:conversationId", async (req, res) => {
  const { conversationId } = req.params;

  //check validity of ID. If invalid, assign value of null
  const conversation = Types.ObjectId.isValid(conversationId)
    ? await Conversation.findById(conversationId)
    : null;

  // Run code only if the conversation exists
  if (conversation) {
    if (
      conversation.trainerId == req.payload._id ||
      conversation.traineeId == req.payload._id
    ) {
      Conversation.findById(conversationId)
        .populate("queryId")
        .then((conversation) => {
          res.status(200).json(conversation);
        })
        .catch((e) => res.status(500).json("Failed to fetch this query" + e));
    } else {
      res
        .status(403)
        .json("Can't access this conversation as you are not part of it.");
    }
  } else {
    res.status(404).json("No conversations found with id " + conversationId);
  }
});

//shows a list of a trainee's queries
// router.get("/:traineeId", (req, res) => {
//   const { traineeId } = req.params;

//   User.findById(traineeId)
//     .populate("queriesCreated")
//     .then((user) => {
//       res.status(200).json(user.queriesCreated);
//     })
//     .catch((e) =>
//       res.status(500).json("Failed to fetch trainee's queries" + e)
//     );
// });

module.exports = router;
