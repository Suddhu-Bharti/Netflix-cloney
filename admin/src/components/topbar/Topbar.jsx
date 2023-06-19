import React, { useContext } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { AuthContext } from "../../context/authContext/AuthContext";

export default function Topbar() {

  const {user} = useContext(AuthContext);
  
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">suddhu-admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src={user.profilePic} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
