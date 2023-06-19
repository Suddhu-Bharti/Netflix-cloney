import { createUserFailure, createUserStart, createUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, getUsersFailure, getUsersStart, getUsersSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "./UserActions";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

//Create user
export const createUser = async (user, dispatch) => {
  dispatch(createUserStart());

  try {
    const res = await axiosInstance.post("/auth/register", user);
    dispatch(createUserSuccess(res.data));
  } catch (err) {
    dispatch(createUserFailure());
  }
};

//Get users
export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());

  try {
    const res = await axiosInstance.get("/users", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

//Delete user
export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());

  try {
    await axiosInstance.delete("/users/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

//Update user
export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());

  try {
    const res = await axiosInstance.put("/users/" + id, user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};
