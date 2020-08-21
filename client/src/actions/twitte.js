import {
  CREATE_TWITTE,
  FETCH_TWITTES,
  PROFILE_TWEET,
  USER_TWEET,
  LIKE_TWEET,
  FETCH_TWEET,
  MAKE_COMMENT,
} from "./types";

import axios from "../api/post";
import history from "../component/history";

export const createTwitte = (body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  };
  const response = await axios.post("/createTwitte", { body }, config);

  dispatch({
    type: CREATE_TWITTE,
    payload: response.data,
  });
  history.push("/home");
};

export const fetchTwitte = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  };
  const response = await axios.get("/allTwitte", config);
  dispatch({
    type: FETCH_TWITTES,
    payload: response.data,
  });
};

export const profileTweet = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  };
  const response = await axios.get("/user", config);
  dispatch({
    type: PROFILE_TWEET,
    payload: response.data,
  });
};

export const userTweetList = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  };
  const response = await axios.get(`/userTweet/${id}`, config);
  dispatch({
    type: USER_TWEET,
    payload: response.data,
  });
};

export const likeTweet = (postId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  };
  const response = await axios.put(`/like`, { postId }, config);
  dispatch({
    type: LIKE_TWEET,
    payload: response.data,
  });
};

export const singleTweetFetch = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  };
  const response = await axios.get(`/Singletweet/${id}`, config);
  dispatch({
    type: FETCH_TWEET,
    payload: response.data,
  });
};

export const makeComment = (postId, text) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  };
  const response = await axios.put(`/comment`, { postId, text }, config);
  dispatch({
    type: MAKE_COMMENT,
    payload: response.data,
  });
};
