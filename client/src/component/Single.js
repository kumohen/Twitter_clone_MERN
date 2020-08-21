import React, { useEffect, useState } from "react";
import Navigation from "./Sidebar";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Follow from "./Follow";
import { singleTweetFetch, makeComment } from "../actions/twitte";
import { connect } from "react-redux";
import TwitteList from "./TwitteList";

const Single = (props) => {
  const [body, setBody] = useState("");
  useEffect(() => {
    props.singleTweetFetch(props.match.params.id);
  }, [props.match.params.id, props.twitteList]);

  const submitComment = (id, text) => {
    props.makeComment(id, text);
    setBody("");
  };

  const displayTweet = props && props.twitteList && props.twitteList.post && (
    <div className="twitteCard_ex">
      <div className="left_m">
        <img
          src={props.twitteList.post.postedBy.image}
          alt="your image"
          style={{ height: "40px", width: "40px", borderRadius: "50%" }}
        />
      </div>
      <div className="right_m">
        <p>
          <Link
            to={
              props.twitteList.post.postedBy._id !== props.authState._id
                ? `/profile/${props.twitteList.post.postedBy._id}`
                : `/profile`
            }
          >
            {props.twitteList.post.postedBy.name + " "}
          </Link>
          <Moment format="D MMM YYYY">{props.twitteList.post.date}</Moment>
        </p>
        <p>{props.twitteList.post.body}</p>
        <hr />
        <div className="font_icons">
          <i className="fa fa-heart-o" aria-hidden="true">
            {props.twitteList.post.likes.length}
          </i>

          <i className="fa fa-heart-o" aria-hidden="true"></i>
          <i
            class="fa fa-thumbs-up"
            style={{ marginRight: "15px" }}
            aria-hidden="true"
          ></i>
        </div>

        <hr />
      </div>
    </div>
  );

  const displayComment =
    props &&
    props.twitteList &&
    props.twitteList.post &&
    props.twitteList.post.comments &&
    props.twitteList.post.comments.map((item) => (
      <div className="" key={item.text} style={{ display: "flex" }}>
        <div style={{ width: "10%" }}>
          <img
            src={item.postedBy.image}
            alt="mohen"
            style={{ height: "35px", width: "35px", borderRadius: "50%" }}
          />
        </div>
        <div style={{ width: "80%" }}>
          <p>
            <b>{item.postedBy.name}</b>
          </p>
          <p className="comment_text">{item.text}</p>
        </div>
      </div>
    ));

  return (
    <div className="main">
      <div className="side_section">
        <i
          className="fa fa-twitter fa-3x"
          aria-hidden="true"
          style={{ marginBottom: "10%", marginLeft: "25px", color: "blue" }}
        ></i>
        <Navigation />
      </div>

      <div className="main_section">
        {displayTweet}
        <div className="create_item_form">
          <div className="form-group mt-2">
            <input
              className="form-control"
              type="text"
              placeholder="Body text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <button
            className="btn waves-effect waves-light #64b5f6 blue darken-1 mt-2 mb-2"
            onClick={() => submitComment(props.match.params.id, body)}
          >
            Comment
          </button>
        </div>
        {displayComment}
      </div>
      <div className="follow_section">
        <Follow />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    twitteList: state.twittes.singleTweet,
    authState: state.auth.login.user,
  };
};

export default connect(mapStateToProps, { singleTweetFetch, makeComment })(
  Single
);
