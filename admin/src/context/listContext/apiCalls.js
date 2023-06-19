import {
  getListsStart,
  getListsSuccess,
  getListsFailure,
  deleteListStart,
  deleteListSuccess,
  deleteListFailure,
  createListStart,
  createListSuccess,
  createListFailure,
  updateListStart,
  updateListSuccess,
  updateListFailure,
} from "./ListActions";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

//Create list
export const createList = async (list, dispatch) => {
  dispatch(createListStart());
  try {
    const res = await axiosInstance.post("/lists/create", list, {
      //list as body here
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createListSuccess(res.data));
  } catch (err) {
    dispatch(createListFailure());
  }
};

//Get lists
export const getLists = async (dispatch) => {
  dispatch(getListsStart());

  try {
    const res = await axiosInstance.get("/lists", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getListsSuccess(res.data));
  } catch (err) {
    dispatch(getListsFailure());
  }
};

//Delete list
export const deleteList = async (id, dispatch) => {
  dispatch(deleteListStart());

  try {
    await axiosInstance.delete("/lists/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteListSuccess(id));
  } catch (err) {
    dispatch(deleteListFailure());
  }
};

//Update list
export const updateList = async (id, list, dispatch) => {
  dispatch(updateListStart());

  try {
    const res = await axiosInstance.put("/lists/" + id, list, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateListSuccess(res.data));
  } catch (err) {
    dispatch(updateListFailure());
  }
};
