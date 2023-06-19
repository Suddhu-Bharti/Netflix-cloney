import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
  WcOutlined,
} from "@material-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./user.css";
import { useContext, useState } from "react";
import { updateUser } from "../../context/userContext/apiCalls";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { UserContext } from "../../context/userContext/UserContext";

export default function User() {
  const location = useLocation();
  const user = location.state;

  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);

  const [updatedUser, setUpdatedUser] = useState(null);
  const [updatedProfilePic, setUpdatedProfilePic] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [skip, setSkip] = useState(0);

  //console.log(updatedProfilePic);

  const handleChange = (e) => {
    const value = e.target.value;
    setUpdatedUser({ ...updatedUser, [e.target.name]: value });
    //console.log(updatedUser);
  };

  const upload = (item) => {
    //const uploadTask = storage.ref(`/items/${item.file.name}`).put(item);
    const fileName = new Date().getTime() + item.label + item.file.name;
    const storageRef = ref(storage, "/usersProfilePics/" + fileName);
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
          setUpdatedUser((prev) => {
            return { ...prev, [item.label]: url };
          });
          setUploaded(1);
        });
      }
    );
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (updatedProfilePic) {
      upload({ file: updatedProfilePic, label: "profilePic" });
    } else {
      alert("Please first choose the file.");
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUser(user._id, updatedUser, dispatch);
    navigate("/users");
    //console.log(updatedUser);
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={
                user.profilePic ||
                "https://cdn4.vectorstock.com/i/1000x1000/01/38/young-man-profile-vector-14770138.jpg"
              }
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.name}</span>
              <span className="userShowUserTitle">{user.bio}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{user.dob}</span>
            </div>
            <div className="userShowInfo">
              <WcOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">{user.gender}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{user.address}</span>
            </div>
          </div>
        </div>

        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder={user.name}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Bio</label>
                <input
                  name="bio"
                  type="text"
                  placeholder={user.bio}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  name="phone"
                  type="tel"
                  minLength={10}
                  maxLength={10}
                  placeholder={user.phone}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>D.O.B</label>
                <input
                  name="dob"
                  type="date"
                  placeholder={user.dob}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  name="address"
                  type="text"
                  placeholder={user.address}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Gender</label>
                <div className="newUserGender">
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="Male"
                    onChange={handleChange}
                  />
                  <label htmlFor="male">Male</label>
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="Female"
                    onChange={handleChange}
                  />
                  <label htmlFor="female">Female</label>
                  <input
                    type="radio"
                    name="gender"
                    id="other"
                    value="Other"
                    onChange={handleChange}
                  />
                  <label htmlFor="other">Other</label>
                </div>
              </div>
            </div>

            <div className="userUpdateRight">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  name="username"
                  type="text"
                  placeholder={user.username}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder={user.email}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="********"
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={
                    user.profilePic ||
                    "https://cdn4.vectorstock.com/i/1000x1000/01/38/young-man-profile-vector-14770138.jpg"
                  }
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setUpdatedProfilePic(e.target.files[0])}
                />
              </div>
              {uploaded || skip ? (
                <>
                  <button className="userUpdateButton" onClick={handleUpdate}>
                    UPDATE
                  </button>
                  {!uploaded && (
                    <button
                      className="userUpdateButton"
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
                  <button className="userUpdateButton" onClick={handleUpload}>
                    UPLOAD
                  </button>
                  <button
                    className="userUpdateButton"
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
      </div>
    </div>
  );
}
