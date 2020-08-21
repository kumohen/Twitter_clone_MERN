import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createTwitte, fetchTwitte } from "../actions/twitte";
import { Form, Button } from "react-bootstrap";
import TwitteList from "./TwitteList";

const TwitteSection = ({
  createTwitte,
  fetchTwitte,
  twitteList,
  authState,
}) => {
  const [body, setBody] = useState("");

  useEffect(() => {
    fetchTwitte();
  }, [twitteList]);
  const imageUrl = authState && authState.image;
  const postDetails = () => {
    if (body.length > 160 || body.length <= 0) {
      alert("You can not type more than 240 word");
      return;
    } else {
      createTwitte(body);

      setBody("");
    }
  };

  const displayList =
    twitteList &&
    twitteList.map((item) => {
      return <TwitteList key={item._id} item={item} />;
    });
  return (
    <div>
      <h3>Home</h3>
      <hr />
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
      <div className="line"></div>
      {displayList}
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
export default connect(mapStateToProps, { createTwitte, fetchTwitte })(
  TwitteSection
);
