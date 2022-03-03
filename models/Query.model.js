const { Schema, model } = require("mongoose");

const querySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    age: {
      type: Number,
      required: [true, "Age is required."],
    },
    gender: {
      type: String,
      required: [true, "Gender is required."],
    },
    goal: {
      type: String,
      required: [true, "Goal is required."],
    },
    info: {
      type: String,
    },
    imgUrl: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
    conversations: [{ type: Schema.Types.ObjectId, ref: "Conversation" }]
  },
  {
    timestamps: true,
  }
);

const Query = model("Query", querySchema);

module.exports = Query;
