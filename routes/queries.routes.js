//TODO convert to async/await from promises

const express = require("express");
const router = express.Router();
const Query = require("../models/Query.model");
const User = require("../models/User.model");
const isTrainee = require("../middleware/isTrainee");

//submits and creates a query if logged in as a trainee
router.post("/create", isTrainee, async (req, res) => {
  try {
    const { title, age, gender, goal, info } = req.body;
    const createdQuery = await Query.create({
      title,
      age,
      gender,
      goal,
      info,
      createdBy: req.payload._id,
      isActive: true,
      conversations: [],
    });
    await User.findByIdAndUpdate(
      req.payload._id,
      { $addToSet: { queriesCreated: createdQuery._id } },
      {
        new: true,
      }
    );
    return res.status(201).json({
      createdQueryId: createdQuery._id,
      message: "Query created successfully!",
    });
  } catch (e) {
    return res.status(500).json("Query creation failed" + e);
  }
});

//TODO sorting/filtering then pagination
//return a list of queries
router.get("/", async (req, res) => {
  try {
    //if trainer, return all queries. If user, return user's queries
    const queryList =
      req.payload.type === "trainer"
        ? await Query.find()
        : await Query.find({ createdBy: req.payload._id });
    return res.status(200).json(queryList);
  } catch (e) {
    return res.status(500).json("Failed to fetch trainee's queries" + e);
  }
});

router.delete("/:queryId/delete", async (req, res) => {
  try {
    const { queryId } = req.params;

    const query = await Query.findByIdAndRemove(queryId);
    return res.status(200).json(query);
  } catch (e) {
    return res.status(500).json("Failed to fetch query " + e);
  }
});

router.put("/:queryId/update", isTrainee, async (req, res) => {
  try {
    const { queryId } = req.params;
    const { title, age, gender, goal, info } = req.body;

    const query = await Query.findByIdAndUpdate(
      queryId,
      { title, age, gender, goal, info },
      { new: true }
    );

    return res.status(200).json(query);
  } catch (e) {
    return res.status(500).json("Failed to fetch query " + e);
  }
});

//shows a query's details
router.get("/:queryId", async (req, res) => {

  try {
    const { queryId } = req.params;
    const query = await Query.findById(queryId).populate("conversations");

    //if trainer remove conversations, else if creator return whole query,
    //else deny access cause they arent the trainer or owner of the query
    if (req.payload.type === "trainer") {
      delete query.conversations;
      return res.status(200).json(query);
    } else if (query.createdBy == req.payload._id) {
      return res.status(200).json(query);
    } else {
      return res
        .status(403)
        .json("Neither trainer nor owner of the query " + e);
    }
  } catch (e) {
    return res.status(500).json("Failed to fetch query " + e);
  }
});

module.exports = router;
