import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class NavigationComponent extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/login"> Login </NavLink>
        <NavLink to="/signup"> Sign Up </NavLink>
      </div>
    );
  }
}
