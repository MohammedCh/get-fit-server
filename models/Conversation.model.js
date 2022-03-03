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
    conversations: [
      {
        senderId: { type: Schema.Types.ObjectId },
        message: { type: String },
        timestamps: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Conversation = model("Conversation", conversationSchema);

module.exports = Conversation;
