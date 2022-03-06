//TODO convert to async/await from promises

const express = require("express");
const router = express.Router();
const Conversation = require("../models/Conversation.model");
const Query = require("../models/Query.model");
const User = require("../models/User.model");
const isTrainee = require("../middleware/isTrainee");
const isTrainer = require("../middleware/isTrainer");
const { Types } = require("mongoose");

//submits and creates a query if logged in as a trainee
router.post("/create", isTrainee, (req, res) => {
  const { title, age, gender, goal, info, imgUrl } = req.body;
  Query.create({
    title,
    age,
    gender,
    goal,
    info,
    imgUrl,
    createdBy: req.session.user._id,
    isActive: true,
    conversations: [],
  })
    .then((createdQuery) => {
      return User.findByIdAndUpdate(
        req.payload._id,
        { $addToSet: { queriesCreated: createdQuery._id } },
        {
          new: true,
        }
      );
    })
    .then((response) => {
      res.status(201).json("Query created successfully!");
    })
    .catch((e) => res.status(500).json("Query creation failed" + e));
});

//shows a list of all active queries (for trainers) if logged in as a trainer
router.get("/", isTrainer, (req, res) => {
  Query.find()
    .then((queryList) => {
      res.status(200).json(queryList);
    })
    .catch((e) =>
      res.status(500).json("Failed to fetch trainee's queries" + e)
    );
});

//TODO convert "allow if user part of conversation" to middleware instead of if statement
//create a conversation or add message to the conversation if you are part of it
router.post("/conversations/:conversationId", async (req, res) => {
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
            $addToSet: {
              conversations: { senderId: req.session.user._id, message },
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
      const query = await Query.findById(queryId);
      await Conversation.create({
        trainerId: req.session.user._id, // because only one who can create a the conversation is the trainer
        traineeId: query.createdBy,
        queryId,
        conversations: [{ senderId: req.session.user._id, message }],
      });
      return res.status(200).json("Conversation created successfully!");
    } catch (e) {
      res.status(500).json("Failed to create conversation " + e);
    }
  }
});

//TODO convert "allow if user part of conversation" to middleware instead of if statement
//returns the conversation if you are part of it
router.get("/conversations/:conversationId", async (req, res) => {
  const { conversationId } = req.params;

  //check validity of ID. If invalid, assign value of null
  const conversation = Types.ObjectId.isValid(conversationId)
    ? await Conversation.findById(conversationId)
    : null;

  // Run code only if the conversation exists
  if (conversation) {
    if (
      conversation.trainerId == req.session.user._id ||
      conversation.traineeId == req.session.user._id
    ) {
      Conversation.findById(conversationId)
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

//shows a query's details
router.get("/:queryId", async (req, res) => {
  const { queryId } = req.params;
  try {
    const query = await Query.findById(queryId);
    const user = await User.findById(req.session.user._id);
    if (query.createdBy == req.session.user._id || user.type === "trainer") {
      res.status(200).json(query);
    }
  } catch (e) {
    res.status(500).json("Failed to fetch query " + e);
  }
});

module.exports = router;
