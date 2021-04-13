import React from "react";
import cartoon from "../static/styles/images/not-found2.jpeg";
import "../static/styles/not-found.css";

export default function NoMatch404Error() {
  return (
    <div className="error404-wrapper">
      <img className="not-found-img" src={cartoon} alt="cartoon" />
      <p>Page not found, try searching for something that exists</p>
    </div>
  );
}
