import React, { useContext, useState } from "react";
import "./navbar.scss";
import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logoutSuccess } from "../../authContext/AuthActions";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const {dispatch} = useContext(AuthContext)
  const navigate = useNavigate();

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate("/register");
  }

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png"
            alt=""
          />

          <Link to="/" className="link">
            <span className="navbarLink">Home</span>
          </Link>
          <Link to="/series" className="link">
            <span className="navbarLink">Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span className="navbarLink">Movies</span>
          </Link>
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <Search className="icon" />
          <Notifications className="icon" />
          <img
            src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className="icon"
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={handleLogout}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
