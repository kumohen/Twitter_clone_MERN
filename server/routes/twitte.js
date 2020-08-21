const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const moment = require("moment");
const requireLogin = require("../middleware/requireLogin");
const Twitte = mongoose.model("Twitte");
const User = mongoose.model("User");

router.get("/allTwitte", requireLogin, (req, res) => {
  Twitte.find()
    .sort({ date: -1 })
    .populate("postedBy", "_id name image lastname ")

    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/createTwitte", requireLogin, (req, res) => {
  const { body } = req.body;
  if (!body) {
    return res.status(422).json({ error: "Plase add all the fields" });
  }
  req.user.password = undefined;
  const post = new Twitte({
    body,

    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      res.json({ twitte: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/user", requireLogin, (req, res) => {
  Twitte.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name image lastname ")
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/userTweet/:id", (req, res) => {
  Twitte.find({ postedBy: req.params.id })
    .populate("postedBy", "_id name image lastname ")
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/like", requireLogin, (req, res) => {
  Twitte.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "_id name image")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.get("/Singletweet/:id", requireLogin, (req, res) => {
  Twitte.findById(req.params.id)
    .populate("postedBy", "_id name image")
    .populate("comments.postedBy", "_id name image")
    .then((post) => {
      res.json({ post });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/comment", requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
    image: req.user.image,
  };
  Twitte.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name  ")
    .populate("postedBy", "_id name image")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

module.exports = router;
