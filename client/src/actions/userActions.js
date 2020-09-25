import axios from "axios";

import { GET_USERS, GET_USER, GET_ERRORS, USER_LOADING } from "./types";

export const getUsers = () => (dispatch) => {
  axios
    .get("/api/admins/uv")
    .then((res) =>
      dispatch({
        type: GET_USERS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_USERS,
        payload: null,
      })
    );
};

export const getUser = () => (dispatch) => {
  dispatch(setUserLoading());
  axios
    .get(`/api/users/current`)
    .then((res) =>
      dispatch({
        type: GET_USER,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_USER,
        payload: null,
      })
    );
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};
export const VerifyUser = (id) => (dispatch) => {
  axios
    .post(`/api/admins/uv/${id}`)
    .then((res) => dispatch(getUsers()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Create Profile
export const createProfile = (id) => (dispatch) => {
  axios
    .post(`/api/profile/user/${id}`)
    .then((res) => dispatch(getUsers()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
