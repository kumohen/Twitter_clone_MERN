import React, { Component } from "react";
import { connect } from "react-redux";
import { userLogin } from "../../actions/auth";
import { Form, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
//import history from "../../component/history";

class Login extends Component {
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
    this.props.userLogin(email, password);
  };
  render() {
    return (
      <div>
        <div className="login">
          <i className="fa fa-badge"></i>
          <i
            className="fa fa-twitter fa-3x"
            aria-hidden="true"
            id="twitter_icons"
          ></i>
          <Form onSubmit={this.submitForm} className="login_form">
            <p className="login_title">Log in to Twitter</p>
            <Form.Group as={Col} controlId="formGridPasswsdordL">
              <Form.Control
                controlId="formGridPasswsdordL"
                type="email1"
                name="email"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.handleInput}
              />
            </Form.Group>
            <hr />
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
            </Form.Group>
            <hr />
            <Button type="submit" className="login_btn" block>
              Login
            </Button>
            <p className="login_footer">
              If You don't have account ,Please{" "}
              <Link to="/signup">
                <b style={{ color: "black" }}> Signup </b>
              </Link>
              first
            </p>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect(null, { userLogin })(Login);
