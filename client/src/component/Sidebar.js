import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { createTwitte } from "../actions/twitte";

const Sidebar = ({ logout, auth, createTwitte, authState }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [show, setShow] = useState(false);
  const [body, setBody] = useState("");

  useEffect(() => {
    setIsAuth(auth);
  }, [auth]);

  const userLogout = () => {
    logout();
  };
  const imageUrl =
    authState &&
    authState.login &&
    authState.login.user &&
    authState.login.user.image;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const postDetails = () => {
    if (body !== "") {
      createTwitte(body);
      setBody("");
      handleClose();
    } else {
      alert("enter the twitte body");
    }
  };
  return (
    <div>
      <ul>
        <Link to="/home">
          <i className="fa fa-home fa-1.5x" aria-hidden="true"></i>{" "}
          <b style={{ color: "black" }}> Home </b>
        </Link>
        <hr />
        <Link to="/">
          <i className="fa fa-bell" aria-hidden="true"></i>{" "}
          <b style={{ color: "black" }}>Notification</b>
        </Link>
        <hr />
        <Link to="/">
          <i className="fa fa-bookmark-o fa-1.5x" aria-hidden="true"></i>{" "}
          <b style={{ color: "black" }}>Bookmarks</b>
        </Link>
        <hr />
        <Link to="/">
          <i className="fa fa-list-alt" aria-hidden="true"></i>{" "}
          <b style={{ color: "black" }}>List</b>
        </Link>
        <hr />
        <Link to="/profile">
          <i className="fa fa-user" aria-hidden="true"></i>{" "}
          <b style={{ color: "black" }}>Profile</b>
        </Link>
        <hr />
      </ul>
      {isAuth ? (
        <li
          variant="outline-success"
          onClick={userLogout}
          style={{ marginLeft: "36px", marginBottom: "5px" }}
        >
          <i className="fa fa-sign-out" aria-hidden="true"></i>
          <b> Logout</b>
        </li>
      ) : (
        ""
      )}

      <Button
        variant="primary "
        style={{
          width: "70%",
          height: "43px",
          borderRadius: "25px",
          marginLeft: "10%",
        }}
        onClick={handleShow}
      >
        Tweet
      </Button>

      <Modal show={show} onHide={handleClose}>
        <div style={{ display: "flex" }}>
          <div style={{ width: "10%" }}>
            <img
              src={imageUrl}
              alt="mohen"
              style={{ height: "50px", width: "50px", borderRadius: "50%" }}
            />
          </div>
          <Form className="form_tweet" style={{ width: "90%" }}>
            <Form.Group controlId="ControlTextarea1">
              <Form.Control
                controlId="ControlTextarea1"
                as="textarea"
                rows="2"
                placeholder="What's happening?"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <hr />
            </Form.Group>
            <Button
              variant="primary"
              onClick={() => postDetails()}
              className="tweet_btn"
            >
              {" "}
              Tweet
            </Button>{" "}
          </Form>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth.isLoginin,
    authState: state.auth,
  };
};
export default connect(mapStateToProps, { logout, createTwitte })(Sidebar);
