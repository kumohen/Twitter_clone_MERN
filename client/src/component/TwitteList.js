import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { likeTweet } from "../actions/twitte";

const TwitteList = ({ item, authState, likeTweet }) => {
  return (
    <div className="twitteCard">
      <div className="left_m">
        <img
          src={item.postedBy.image}
          alt="your pic"
          style={{ height: "40px", width: "40px", borderRadius: "50%" }}
        />
      </div>
      <div className="right_m">
        <div className="font_top_section">
          <p>
            <Link
              to={
                item.postedBy._id !== authState._id
                  ? `/profile/${item.postedBy._id}`
                  : `/profile`
              }
            >
              {item.postedBy.name}{" "}
            </Link>{" "}
            <span style={{ fontWeight: "300" }}>
              {" "}
              {"@" + item.postedBy.lastname}{" "}
            </span>
            <Moment format="D MMM YYYY">{item.date}</Moment>
          </p>
          <p>{item.body}</p>
        </div>
        <hr />
        <div className="font_icons">
          {item && item.likes && item.likes.includes(authState._id) ? (
            <i
              className="fa fa-heart-o"
              aria-hidden="true"
              style={{ color: "red" }}
            >
              <b> {item.likes.length} </b>
            </i>
          ) : (
            <i
              className="fa fa-heart-o"
              aria-hidden="true"
              onClick={() => likeTweet(item._id)}
            >
              <b> {item.likes.length} </b>
            </i>
          )}{" "}
          <i className="fa fa-comment-o" aria-hidden="true">
            <Link to={`/tweet/${item._id}`}>
              {" "}
              <b> {item.comments.length} </b>{" "}
            </Link>
          </i>{" "}
          <i
            className="fa fa-thumbs-up"
            style={{ marginLeft: "10px" }}
            aria-hidden="true"
          ></i>
        </div>
        <hr />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    twitteList: state.twittes.twitteList,
    auth: state.auth.isLoginin,
    authState: state.auth.login.user,
  };
};
export default connect(mapStateToProps, { likeTweet })(TwitteList);
