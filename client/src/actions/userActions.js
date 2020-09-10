import axios from "axios";

import { GET_USERS, GET_USER, GET_ERRORS } from "./types";

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
export const getUser = (handle) => (dispatch) => {
  axios
    .get(`/api/admins/uv/${handle}`)
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
