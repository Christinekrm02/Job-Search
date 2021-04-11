import axios from "axios";

const API = {
  postSignUp: function (username, email, password) {
    console.log(password);
    return axios.post("/user/api/register/job-seeker", {
      username,
      email,
      password,
    });
  },
  postLogin: function (email, password) {
    return axios.post("/user/api/login", {
      email,
      password,
    });
  },
};

export default API;
