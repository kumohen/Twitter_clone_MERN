import React, { Component } from "react";
import { connect } from "react-redux";
import Image from "./twitter.PNG";
import { Link } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { userLogin } from "../../actions/auth";

class FirstPage extends Component {
  state = {
    email: "",
    password: "",
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  submitForm = (e) => {
    e.preventDefault();
    const { password, email } = this.state;
    console.log(password, email);
    this.props.userLogin(email, password);
  };
  render() {
    return (
      <div className="landing_page">
        <div className="landing_left">
          <img
            src={Image}
            style={{ height: "100%", width: "100%" }}
            alt="image_teitter"
          />
        </div>
        <div className="landing_right">
          <div className="landing_right_top">
            <Form onSubmit={this.submitForm} className="registation_form">
              <Form.Row>
                <Form.Group as={Col} controlId="formGridPasswsdordL">
                  <Form.Control
                    controlId="formGridPasswsdordL"
                    type="email1"
                    name="email"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.handleInput}
                  />
                  <hr />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPasswsdordL">
                  <Form.Control
                    controlId="formGridPasswsdordL"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.handleInput}
                    style={{ marginLeft: "0px", width: "99%" }}
                  />
                  <hr />
                </Form.Group>
                <Button type="submit" className="login_btn">
                  Login
                </Button>
              </Form.Row>
            </Form>
          </div>
          <div className="landing_right_down">
            <i
              className="fa fa-twitter fa-3x"
              aria-hidden="true"
              style={{ color: "blue" }}
            ></i>
            <h3 style={{ fontWeight: "bold" }}>See what’s happening in </h3>
            <h3 style={{ fontWeight: "bold" }}> the world right now </h3>
            <p style={{ fontWeight: "bold", marginTop: "50px" }}>
              Join Twitter today.
            </p>
            <Link to={"/signup"}>
              <Button
                variant="primary"
                style={{
                  width: "100%",
                  borderRadius: "30px",
                  marginBottom: "10px",
                }}
              >
                Sign Up
              </Button>
            </Link>
            <Link to={"/"}>
              {" "}
              <Button
                variant="outline-info"
                style={{ width: "100%", borderRadius: "30px" }}
              >
                Log On
              </Button>{" "}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(null, { userLogin })(FirstPage);
