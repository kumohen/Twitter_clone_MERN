import axios from "../api/post";
import history from "../component/history";

export const userRegister = (firstname, lastname, password, email) => async (
  dispatch
) => {
  const response = await axios.post("/signup", {
    firstname,
    lastname,
    password,
    email,
  });
  console.log(response.data);
  dispatch({
    type: "USER_REGISTER",
    payload: response.data,
  });
  history.push("/");
};

export const userLogin = (email, password) => async (dispatch) => {
  const response = await axios.post("/signin", { email, password });
  console.log(response.data);
  dispatch({
    type: "USER_LOGIN",
    payload: response.data,
  });
  localStorage.setItem("jwt", response.data.token);
  localStorage.setItem("user", JSON.stringify(response.data.user));
  history.push("/home");
};

export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({
    type: "USER_LOGOUT",
  });

  history.push("/landing");
};

export const userProfile = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  };
  const response = await axios.get(`/user/${id}`, config);
  dispatch({
    type: "USER_PROFILE",
    payload: response.data,
  });
};
export const clearUserProple = () => async (dispatch) => {
  dispatch({
    type: "USER_PROPLE_CLEAR",
    payload: {},
  });
};

export const followUser = (followId, name, image) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  };
  const response = await axios.put(
    `/follow`,
    { followId, name, image },
    config
  );
  console.log(response.data);
  dispatch({
    type: "FOLLOW_PROFILE",
    payload: response.data,
  });
};

export const updateProfile = (name, bio, location) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  };
  const response = await axios.patch(
    `/updateP`,
    { name, bio, location },
    config
  );
  dispatch({
    type: "UPDATE_PROFILE",
  });
};

export const findUser = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  };
  const response = await axios.get(
    `/findPeople`,

    config
  );
  dispatch({
    type: "FIND_PROFILE",
    payload: response.data,
  });
};
