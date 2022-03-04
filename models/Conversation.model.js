const { Schema, model } = require("mongoose");

const conversationSchema = new Schema(
  {
    trainerId: {
      type: Schema.Types.ObjectId,
      ref: "Trainer",
      required: true,
    },
    traineeId: {
      type: Schema.Types.ObjectId,
      ref: "Trainee",
      required: true,
    },
    queryId: {
      type: Schema.Types.ObjectId,
      ref: "Query",
      required: [true, "queryId is required."],
    },
    conversations: [
      {
        senderId: { type: Schema.Types.ObjectId },
        message: { type: String },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Conversation = model("Conversation", conversationSchema);

module.exports = Conversation;
