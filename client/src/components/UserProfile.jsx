import React from "react";

export default function UserProfile(props) {
  return <div>Welcome {props.match.params.slug} </div>;
}
