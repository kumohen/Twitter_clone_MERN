import React, { useEffect } from "react";
import { connect } from "react-redux";
import { findUser, followUser, clearUserProple } from "../actions/auth";
import { Link } from "react-router-dom";

const Follow = ({
  findUser,
  followUsers,
  followUser,
  auth,
  clearUserProple,
}) => {
  useEffect(() => {
    findUser();
  }, [followUsers]);
  useEffect(() => {
    clearUserProple();
  }, []);
  const Username =
    auth && auth.userP && auth.userP.user && auth.userP.user.name;
  const Userimage =
    auth && auth.userP && auth.userP.user && auth.userP.user.image;

  const disPlayUser =
    followUsers &&
    followUsers.map((item) => (
      <div key={item.image} className="follow_people">
        <hr />
        <div className="follow_img">
          <img
            src={item.image}
            alt="mohen "
            style={{ height: "50px", width: "50px", borderRadius: "50%" }}
          />
        </div>
        <div className="follow_des">
          <p>
            <Link to={`/profile/${item._id}`}>{item.name}</Link>
          </p>

          <p className="lastname_text">{item.lastname}</p>
        </div>
        <div className="follow_btn_right">
          <button
            onClick={() => followUser(item._id, item.name, item.image)}
            className="follow_btn_"
          >
            Follow
          </button>
        </div>
      </div>
    ));
  return (
    <div className="follow_side">
      <p>
        <b>Who To Follow</b>
      </p>
      {disPlayUser}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    followUsers: state.auth.findUser,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  findUser,
  followUser,
  clearUserProple,
})(Follow);
