import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import API from "../utils/API";

export default function SignUpForm() {
  //state,set after actions
  const [signup, setSignup] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = event => {
    const { name, value } = event.target;
    setSignup({
      //spread brings in everything that is current, when adding a new value with a comma ist says to bring in old values and new values
      ...signup,
      [name]: value,
    });
  };
  const handleSubmit = async event => {
    event.preventDefault();
    const { username, email, password } = signup;
    console.log(password);
    const response = await API.postSignUp(username, email, password);
    console.log(response);
    //REDIRECT TO LOGIN PAGE AFTER SUBMIT
    //console.log("handleSubmit:", signup);
  };
  //ADD FILE ATTRIBUTES TO EACH FORM CONTROL
  return (
    <Container>
      <h3 className="text-center mb-3">SIGN UP</h3>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            autoComplete="email"
            value={signup.email}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicUserName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            autoComplete="username"
            value={signup.username}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            autoComplete="password"
            value={signup.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          Register
        </Button>
      </Form>
    </Container>
  );
}
