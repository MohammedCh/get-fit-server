const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required."],
      unique: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    imgUrl: {
      type: String,
    },
    type: {
      type: String,
      enum: ["trainer", "trainee"],
    },
    queriesCreated: [{ type: Schema.Types.ObjectId, ref: "Query" }],
    queriesRespondedTo: [{ type: Schema.Types.ObjectId, ref: "Query" }],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
