import { Link, useLocation, useNavigate } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useContext, useState } from "react";

export default function Product() {
  const location = useLocation();
  const movie = location.state;

  const [updatedMovie, setUpdatedMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [skip, setSkip] = useState(0);

  const { dispatch } = useContext(MovieContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setUpdatedMovie({ ...updatedMovie, [e.target.name]: value });
  };

  const upload = (item) => {
    const fileName = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, "/movies/" + fileName);
      const uploadTask = uploadBytesResumable(storageRef, item.file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + " % done.");
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setUpdatedMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if(img){
        upload({file: img, label: "img"});
    }
    if(imgTitle){
        upload({file: imgTitle, label: "imgTitle"});
    }
    if(imgSm){
        upload({file: imgSm, label: "imgSm"});
    }
    if(trailer){
        upload({file: trailer, label: "trailer"});
    }
    if(video){
        upload({file: img, label: "video"});
    }
    if(!img && !imgTitle && !imgSm && !trailer && !video){
       alert("Please first choose the file.") 
    }
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    updateMovie(movie._id, updatedMovie, dispatch);
    console.log(updatedMovie);
    navigate("/movies");
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Edit Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">New</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={productData} dataKey="Movie" title="Movie Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.img} alt="" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey"> type:</span>
              <span className="productInfoValue">
                {movie.isSeries ? "Series" : "Movie"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="updateProduct">
        <h2 className="updateProductTitle">Edit Movie</h2>
        <form className="updateProductForm">
          <div className="updateProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder={movie.title}
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="updateProductItem">
            <label>Description</label>
            <input
              type="text"
              placeholder={movie.desc}
              name="desc"
              onChange={handleChange}
            />
          </div>
          <div className="updateProductItem">
            <label>Genre</label>
            <input
              type="text"
              placeholder={movie.genre}
              name="genre"
              onChange={handleChange}
            />
          </div>
          <div className="updateProductItem">
            <label>Year</label>
            <input
              type="text"
              placeholder={movie.year}
              name="year"
              onChange={handleChange}
            />
          </div>
          <div className="updateProductItem">
            <label>Age Limit</label>
            <input
              type="text"
              placeholder={movie.limit}
              name="limit"
              onChange={handleChange}
            />
          </div>
          <div className="updateProductItem">
            <label>Type</label>
            <select name="isSeries" id="isSeries" onChange={handleChange}>
              <option value="false">Movie</option>
              <option value="true">Series</option>
            </select>
          </div>
          <div className="updateProductItem">
            <label>Duration</label>
            <input
              type="text"
              placeholder={movie.duration}
              name="duration"
              onChange={handleChange}
            />
          </div>
          <div className="updateProductItem">
            <label>Image</label>
            <input type="text" id="img" name="img" placeholder="Paste image url here" onChange={handleChange} />
            <input
              type="file"
              id="img"
              name="img"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>
          <div className="updateProductItem">
            <label>Title Image</label>
            <input
            type="text"
            id="imgTitle"
            name="imgTitle"
            placeholder="Paste image url here"
            onChange={handleChange}
          />
            <input
              type="file"
              id="imgTitle"
              name="imgTitle"
              onChange={(e) => setImgTitle(e.target.files[0])}
            />
          </div>
          <div className="updateProductItem">
            <label>Thumbnail</label>
            <input type="text" id="imgSm" name="imgSm" onChange={handleChange} placeholder="Paste image url here" />
            <input
              type="file"
              id="imgSm"
              name="imgSm"
              onChange={(e) => setImgSm(e.target.files[0])}
            />
          </div>
          <div className="updateProductItem">
            <label>Trailer</label>
            <input
            type="text"
            id="trailer"
            name="trailer"
            placeholder="Paste video url here"
            onChange={handleChange}
          />
            <input
              type="file"
              name="trailer"
              onChange={(e) => setTrailer(e.target.files[0])}
            />
          </div>
          <div className="updateProductItem">
            <label>Video</label>
            <input type="text" id="video" name="video" onChange={handleChange} placeholder="Paste video url here" />
            <input
              type="file"
              name="video"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </div>
          <div className="updateProductItem">
          {uploaded === 5 || skip ? (
            <>
            <button className="updateProductButton" onClick={handleUpdateSubmit}>
              UPDATE
            </button>
            { uploaded !== 5 && (
                <button className="updateProductButton" onClick={(e)=> {e.preventDefault(); setSkip(0)}}>
            UNDO SKIP
          </button>
            )}
          </>
          ) : (
            <>
            <button className="updateProductButton" onClick={handleUpload}>
              UPLOAD
            </button>
            <button className="updateProductButton" onClick={(e)=> {e.preventDefault(); setSkip(1)}}>
              SKIP
            </button>
            </>
          )}
          </div>
        </form>
      </div>
    </div>
  );
}
