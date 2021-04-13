import React, { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import AppContext from "../context/AppContext";

import API from "../utils/API";

export default function LoginForm() {
  // eslint-disable-next-line no-unused-vars
  const { user, setUser } = useContext(AppContext);
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setLogin({
      //spread brings in everything that is current, when adding a new value with a comma ist says to bring in old values and new values
      ...login,
      [name]: value,
    });
  };
  const handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = login;
    const response = await API.postLogin(email, password);
    console.log(response.data.user);
    setUser(response.data.user);
    //REDIRECT TO LOGIN PAGE AFTER SUBMIT
    //console.log("handleSubmit:", signup);
  };

  return (
    <Container>
      <h3 className="text-center mb-3">LOGIN</h3>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            autoComplete="email"
            value={login.email}
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
            value={login.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          Login
        </Button>
      </Form>
    </Container>
  );
}
