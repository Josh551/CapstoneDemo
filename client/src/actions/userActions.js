import axios from "axios";

import { GET_USERS, GET_USER } from "./types";

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
