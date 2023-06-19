import { Link, useLocation, useNavigate } from "react-router-dom";
import "./list.css";
import { useContext, useEffect, useState } from "react";
import { getMovies } from "../../context/movieContext/apiCalls";
import { ListContext } from "../../context/listContext/ListContext";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { updateList } from "../../context/listContext/apiCalls";

export default function List() {
  const location = useLocation();
  const list = location.state;

  const [updatedList, setUpdatedList] = useState(null);
  const navigate = useNavigate();

  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setUpdatedList({ ...updatedList, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setUpdatedList({ ...updatedList, [e.target.name]: value });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    updateList(list._id, updatedList, dispatch);
    //console.log(updatedList);
    navigate("/lists");
  };
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Edit List</h1>
        <Link to="/newlist">
          <button className="productAddButton">NEW</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{list._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">{list.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey"> Type:</span>
              <span className="productInfoValue">{list.type}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="updateProduct">
        <h1 className="updateProductTitle">Edit</h1>
        <form className="updateProductForm">
          <div>
            <div className="updateProductItem">
              <label>Title</label>
              <input
                type="text"
                placeholder="e.g. Popular Movies"
                name="title"
                onChange={handleChange}
              />
            </div>
            <div className="updateProductItem">
              <label>Genre</label>
              <input
                type="text"
                placeholder="e.g. Action"
                name="genre"
                onChange={handleChange}
              />
            </div>
            <div className="updateProductItem">
              <label>Type</label>
              <select name="type" onChange={handleChange}>
                <option>Choose</option>
                <option value="movie">Movie</option>
                <option value="series">Series</option>
              </select>
            </div>
          </div>
          <div>
            <div className="updateProductItem">
              <label>Content</label>
              <select
                multiple
                name="content"
                onChange={handleSelect}
                style={{ height: "282px" }}
              >
                {movies.map((movie) => (
                  <option key={movie._id} value={movie._id}>
                    {movie.title}
                  </option>
                ))}
              </select>
              <button
              className="updateProductButton"
              onClick={handleUpdateSubmit}
            >
              UPDATE
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
