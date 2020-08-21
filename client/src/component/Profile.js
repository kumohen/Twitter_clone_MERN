import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Navigation from "./Sidebar";
import { connect } from "react-redux";
import { updateProfile } from "../actions/auth";
import { profileTweet } from "../actions/twitte";
import TwitteList from "./TwitteList";
import Follow from "./Follow";

const Profile = (props) => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  const [image, setImage] = useState("");
  const [backImage, setBackImage] = useState("");
  const [name, setName] = useState("");
  const [following, setFollowing] = useState([]);
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFFollowing, setShowFFollowing] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/profile`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUser(result);
      });
  }, [props]);

  useEffect(() => {
    props.profileTweet();
  }, [props]);

  useEffect(() => {
    const bioo =
      props &&
      props.auth &&
      props.auth.login &&
      props.auth.login.user &&
      props.auth.login.user.bio === undefined
        ? "unkown"
        : props.auth.login.user.bio;
    const locatione =
      props.auth.login.user.location === undefined
        ? "unknown"
        : props.auth.login.user.location;

    setFollowing(props.auth.login.user.following);
    setName(props.auth.login.user.name);
    setLocation(locatione);
    setBio(bioo);
  }, [props]);
  const userId =
    props && props.auth && props.auth.isLoginin
      ? props.auth.login.user._id
      : null;

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "voting");
      data.append("cloud_name", "dvfpkko1z");
      fetch("https://api.cloudinary.com/v1_1/dvfpkko1z/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch("http://localhost:5000/profilePic", {
            method: "put",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              image: data.url,
              userId: userId,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              setData(result);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);
  useEffect(() => {
    if (backImage) {
      const data = new FormData();
      data.append("file", backImage);
      data.append("upload_preset", "voting");
      data.append("cloud_name", "dvfpkko1z");
      fetch("https://api.cloudinary.com/v1_1/dvfpkko1z/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch("http://localhost:5000/backPic", {
            method: "put",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              image: data.url,
              userId: userId,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              setData(result);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [backImage]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleFClose = () => setShowFollowing(false);
  const handleFShow = () => setShowFollowing(true);
  const handleFFClose = () => setShowFFollowing(false);
  const handleFFShow = () => setShowFFollowing(true);

  const updateProfileDetail = (name, bio, location) => {
    props.updateProfile(name, bio, location);
    handleClose();
  };

  const displayTweetList =
    props &&
    props.twittes &&
    props.twittes.profileUser &&
    props.twittes.profileUser.map((item) => (
      <TwitteList key={item._id} item={item} />
    ));
  // { auth, updateProfile, profileTweet, twittes }
  const displayFollowers =
    props &&
    props.auth &&
    props.auth.login &&
    props.auth.login.user &&
    props.auth.login.user.followers &&
    props.auth.login.user.followers.map((item) => (
      <div className="twitteCard">
        <div className="m_left">
          <img
            src={item.image}
            alt=""
            style={{ height: "50px", width: "50px", borderRadius: "50%" }}
          />
        </div>
        <div className="m_right">
          <p style={{ marginLeft: "5px" }}>
            <b>{item.name}</b>
          </p>
        </div>
        <hr />
      </div>
    ));

  // const displayFollowing =
  //   user.following &&
  //   user.following.map((item) =>
  //     console.log(item)

  //   );

  const displayFollowing =
    user &&
    user.length > 0 &&
    user[0].following.map((item) => (
      <div className="twitteCard">
        <div className="m_left">
          <img
            src={item.image}
            alt=""
            style={{ height: "50px", width: "50px", borderRadius: "50%" }}
          />
        </div>
        <div className="m_right">
          <p style={{ marginLeft: "5px" }}>
            <b>{item.name}</b>
          </p>
        </div>
        <hr />
      </div>
    ));
  const fetchDetail =
    user &&
    user.map((item) => (
      <div key={item._id}>
        <img
          src={item.back_image && `${item.back_image}`}
          alt=""
          className="back_image"
        />
        <img
          src={item.image && `${item.image}`}
          alt=""
          className="profile_image"
        />
        <p>
          <b>{item.name.toUpperCase()}</b>
        </p>
        <p>{item.bio && item.bio}</p>
        <div className="desc">
          <p>
            {" "}
            <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
            {item.location ? item.location : "unknown"}
          </p>
          <p>
            <i className="fa fa-calendar" aria-hidden="true"></i> joined Octobar
            2019
          </p>
        </div>
        <div className="follow">
          <p>
            <li onClick={handleFShow}>
              {" "}
              {item.followers && item.followers.length} Followers{" "}
            </li>
          </p>
          <p>
            <li onClick={handleFFShow}>
              {" "}
              {item.following && item.following.length} Following{" "}
            </li>
          </p>
        </div>

        <button className="edit_button" onClick={handleShow}>
          Edit
        </button>
      </div>
    ));
  const updatePhoto = (file) => {
    setImage(file);
  };
  const updateBackPhoto = (file) => {
    setBackImage(file);
  };
  return (
    <div className="main">
      <div className="side_section">
        <Navigation />
      </div>

      <div className="main_section">
        <h3> Profile </h3>
        <Modal show={show} onHide={handleClose}>
          <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
              <label>Upload Profile</label>
              <input
                type="file"
                onChange={(e) => updatePhoto(e.target.files[0])}
                className="file-input"
              />
            </div>
          </div>
          <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
              <label>Upload Background Image</label>
              <input
                type="file"
                onChange={(e) => updateBackPhoto(e.target.files[0])}
                className="file-input"
              />
            </div>
          </div>
          <div className="create_item_form">
            <div className="form-group mt-2">
              <input
                className="form-control"
                type="text"
                placeholder="Body text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group mt-2">
              <input
                className="form-control"
                type="text"
                placeholder="Body text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className="form-group mt-2">
              <input
                className="form-control"
                type="text"
                placeholder="Body text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button
              className="btn waves-effect waves-light #64b5f6 blue darken-1 mt-2 mb-2"
              onClick={() => updateProfileDetail(name, bio, location)}
            >
              Update Profile
            </button>
          </div>
        </Modal>

        {fetchDetail}
        <div>{displayTweetList}</div>
      </div>
      <div className="follow_section">
        <Follow />
      </div>
      <Modal show={showFollowing} onHide={handleFClose}>
        <p>Follower List</p>
        {displayFollowers}
      </Modal>
      <Modal show={showFFollowing} onHide={handleFFClose}>
        <p>Following List</p>
        {displayFollowing}
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    twittes: state.twittes,
  };
};
export default connect(mapStateToProps, { updateProfile, profileTweet })(
  Profile
);
