import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { userProfile, followUser } from "../actions/auth";
import { userTweetList } from "../actions/twitte";
import Navigation from "./Sidebar";
import TwitteList from "./TwitteList";
import Follow from "./Follow";

const Userprofile = (props) => {
  const [show, setShow] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  useEffect(() => {
    props.userProfile(props.match.params.id);
    props.userTweetList(props.match.params.id);
  }, [props]);

  //const { back_image } = props && props.userP && props.userP.user;

  const followUserFun = (followId, name, image) => {
    props.followUser(followId, name, image);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFClose = () => setShowFollowing(false);
  const handleFShow = () => setShowFollowing(true);
  const userId =
    props &&
    props.auth &&
    props.auth.login &&
    props.auth.login.user &&
    props.auth.login.user._id;
  const Username =
    props && props.userP && props.userP.user && props.userP.user.name;
  const Userimage =
    props && props.userP && props.userP.user && props.userP.user.image;

  const findId =
    props &&
    props.userP &&
    props.userP.user &&
    props.userP.user.followers &&
    props.userP.user.followers.find((item) => item.followedBy === userId);

  let match = false;
  if (findId !== undefined && findId.followedBy === userId) {
    match = true;
  }

  const displayUserTweet =
    props &&
    props.twittes &&
    props.twittes.userTweet &&
    props.twittes.userTweet.map((item) => (
      <TwitteList key={item._id} item={item} />
    ));

  const displayFollowers =
    props &&
    props.userP &&
    props.userP.user &&
    props.userP.user.followers &&
    props.userP.user.followers.map((item) => (
      <div className="twitteCard" key={item.image}>
        <div className="m_left">
          <img
            src={item.image}
            alt=""
            style={{ height: "50px", width: "50px", borderRadius: "50%" }}
          />
        </div>
        <div className="m_right">
          <p>
            <b>{item.name}</b>
          </p>
        </div>
      </div>
    ));
  const displayFollowing =
    props &&
    props.userP &&
    props.userP.user &&
    props.userP.user.following &&
    props.userP.user.following.map((item) => (
      <div className="twitteCard">
        <div className="m_left">
          <img
            src={item.image}
            alt=""
            style={{ height: "50px", width: "50px", borderRadius: "50%" }}
          />
        </div>
        <div className="m_right">
          <p>{item.name}</p>
        </div>
      </div>
    ));
  return (
    <div className="main">
      <div className="side_section">
        <Navigation />
      </div>
      <div className="main_section">
        <p>Profile</p>
        <img
          src={
            props &&
            props.userP &&
            props.userP.user &&
            `${props.userP.user.back_image}`
          }
          alt=""
          className="back_image"
        />
        <img
          src={
            props &&
            props.userP &&
            props.userP.user &&
            `${props.userP.user.image}`
          }
          alt=""
          className="profile_image"
        />
        <p>
          <b>
            {props &&
              props.userP &&
              props.userP.user &&
              props.userP.user.name &&
              props.userP.user.name.toUpperCase()}
          </b>
        </p>
        <p>
          {props && props.userP && props.userP.user && props.userP.user.bio}
        </p>
        <div className="desc">
          <p>
            {" "}
            <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
            {props &&
            props.userP &&
            props.userP.user &&
            props.userP.user.location
              ? props.userP.user.location
              : "unknown"}
          </p>
          <p>
            <i className="fa fa-calendar" aria-hidden="true"></i> joined Octobar
            2019
          </p>
        </div>
        <div className="follow">
          <p>
            {" "}
            <li onClick={handleShow}>
              {props &&
                props.userP &&
                props.userP.user &&
                props.userP.user.followers &&
                props.userP.user.followers.length}{" "}
              Followers{" "}
            </li>
          </p>
          <p>
            <li onClick={handleFShow}>
              {" "}
              {props &&
                props.userP &&
                props.userP.user &&
                props.userP.user.following &&
                props.userP.user.following.length}{" "}
              Followeing{" "}
            </li>
          </p>
        </div>
        {match === true ? (
          <button className="btn btn-primary follow_user ">Following</button>
        ) : (
          <button
            onClick={() =>
              followUserFun(props.match.params.id, Username, Userimage)
            }
            className="btn btn-primary follow_user"
          >
            Follow
          </button>
        )}
        <div>{displayUserTweet}</div>
      </div>
      <div className="follow_section">
        <Follow />
      </div>
      <Modal show={show} onHide={handleClose}>
        <h4>Follower</h4>
        {displayFollowers}
      </Modal>
      <Modal show={showFollowing} onHide={handleFClose}>
        <h4>Following List</h4>
        {displayFollowing}
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userP: state.auth.userP,
    auth: state.auth,
    twittes: state.twittes,
  };
};

export default connect(mapStateToProps, {
  userProfile,
  followUser,
  userTweetList,
})(Userprofile);
