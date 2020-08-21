const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const twitteSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },

  likes: [{ type: ObjectId, ref: "User" }],
  comments: [
    {
      text: String,
      postedBy: { type: ObjectId, ref: "User" },
    },
  ],
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model("Twitte", twitteSchema);
