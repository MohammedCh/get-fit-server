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
      enum: ['male', 'female'],
      required: [true, "Gender is required."],
    },
    goal: {
      type: String,
      required: [true, "Goal is required."],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "createdBy is required."],
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
