import React from "react";
import "./watch.scss";
import { ArrowBackOutlined } from "@material-ui/icons";
import { useLocation, Link } from "react-router-dom";

const Watch = (props) => {
  const location = useLocation();
  //console.log(location);
  const movie = location.state;
  //console.log(movie);
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video
        className="video"
        src={movie.video}
        autoPlay
        progress
        controls
      ></video>
    </div>
  );
};

export default Watch;
