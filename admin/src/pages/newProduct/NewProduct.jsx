import { useContext, useState } from "react";
import "./newProduct.css";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {
  const [movie, setMovie] = useState(null);
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
    setMovie({ ...movie, [e.target.name]: value });
  };

  // console.log(img);
  // console.log(movie);

  const upload = (items) => {
    items.forEach((item) => {
      //const uploadTask = storage.ref(`/items/${item.file.name}`).put(item);
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, "/items/" + fileName);
      const uploadTask = uploadBytesResumable(storageRef, item.file);

      uploadTask.on(
        "state_changed",
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
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (img && imgTitle && imgSm && trailer && video) {
      upload([
        { file: img, label: "img" },
        { file: imgTitle, label: "imgTitle" },
        { file: imgSm, label: "imgSm" },
        { file: trailer, label: "trailer" },
        { file: video, label: "video" },
      ]);
    } else {
      alert("Please choose all the files.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
    navigate("/movies");
    //console.log(movie);
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="Movie title"
            name="title"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="Movie description"
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Movie genre"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="Published year"
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="Age limit"
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Is Series</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="Video duration"
            name="duration"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Image</label>
          <input type="text" id="img" name="img" placeholder="Paste image url here" onChange={handleChange} />
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
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
        <div className="addProductItem">
          <label>Thumbnail</label>
          <input type="text" id="imgSm" name="imgSm" onChange={handleChange} placeholder="Paste image url here" />
          <input
            type="file"
            id="imgSm"
            name="imgSm"
            onChange={(e) => setImgSm(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
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
        <div className="addProductItem">
          <label>Video</label>
          <input type="text" id="video" name="video" onChange={handleChange} placeholder="Paste video url here" />
          <input
            type="file"
            name="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          {uploaded === 5 || skip ? (
            <>
              <button className="addProductButton" onClick={handleSubmit}>
                CREATE
              </button>
              {uploaded !== 5 && (
                <button
                  className="addProductButton"
                  onClick={(e) => {
                    e.preventDefault();
                    setSkip(0);
                  }}
                >
                  UNDO SKIP
                </button>
              )}
            </>
          ) : (
            <>
              <button className="addProductButton" onClick={handleUpload}>
                  UPLOAD
              </button>
              <button
                className="addProductButton"
                onClick={(e) => {
                  e.preventDefault();
                  setSkip(1);
                }}
              >
                SKIP
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
