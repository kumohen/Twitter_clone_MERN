const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  back_image: {
    type: String,
  },
  followers: [
    {
      name: String,
      image: String,
      followedBy: { type: ObjectId, ref: "User" },
    },
  ],
  following: [
    {
      name: String,
      image: String,
      followingBy: { type: ObjectId, ref: "User" },
    },
  ],
  // following: [{ type: ObjectId, ref: "User" }],
});

mongoose.model("User", userSchema);
