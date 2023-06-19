import {
    deleteMovieStart,
  deleteMovieSuccess,
  deleteMovieFailure,
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
  createMovieStart,
  createMovieSuccess,
  createMovieFailure,
  updateMovieStart,
  updateMovieSuccess,
  updateMovieFailure
} from "./MovieActions";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

//Create movie
export const createMovie = async (movie, dispatch) => {
  dispatch(createMovieStart());

  try {
      const res = await axiosInstance.post("/movies", movie, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createMovieSuccess(res.data));
  } catch (err) {
    dispatch(createMovieFailure());
  }
};

//Get movies
export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());

  try {
    const res = await axiosInstance.get("/movies", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getMoviesSuccess(res.data));
  } catch (err) {
    dispatch(getMoviesFailure());
  }
};

//Delete movie
export const deleteMovie = async (id, dispatch) => {
    dispatch(deleteMovieStart());
  
    try {
        await axiosInstance.delete("/movies/"+id, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      dispatch(deleteMovieSuccess(id));
    } catch (err) {
      dispatch(deleteMovieFailure());
    }
  };

//Update movie
export const updateMovie = async (id, movie, dispatch) => {
  dispatch(updateMovieStart());

  try {
      const res = await axiosInstance.put("/movies/"+id, movie, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateMovieSuccess(res.data));
  } catch (err) {
    dispatch(updateMovieFailure());
  }
};
