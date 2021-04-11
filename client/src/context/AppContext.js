import React from "react";

const AppContext = React.createContext({
  user: {
    id: "",
    username: "",
    email: "",
    password: "",
  },
  setUser: () => {},
});

export default AppContext;
