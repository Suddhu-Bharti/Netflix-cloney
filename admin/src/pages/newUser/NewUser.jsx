import { useContext, useState } from "react";
import "./newUser.css";
import { Publish } from "@material-ui/icons";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { UserContext } from "../../context/userContext/UserContext"
import { createUser } from "../../context/userContext/apiCalls"
import { useNavigate } from "react-router-dom";

export default function NewUser() {
  const [user, setUser] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [skip, setSkip] = useState(0);
  const [profilePic, setProfilePic] = useState(null);

  const {dispatch} = useContext(UserContext);

  const navigate = useNavigate();

  //console.log(profilePic);

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  //console.log(user);

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
          setUser((prev) => {
            return { ...prev, [item.label]: url };
          });
          setUploaded(1);
        });
      }
    );
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (profilePic) {
      upload({ file: profilePic, label: "profilePic" });
      // console.log("profilePic is set");
    } else {
      alert("Please first choose the file.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser( user, dispatch)
    
    setTimeout(()=> {
      //console.log(user);
      navigate("/users");
    }, 3000);
  };
  return (
    <div className="newUser">
      <div className="userUpdate">
        <h1>New User</h1>
        <form className="userUpdateForm">
          <div className="userUpdateLeft">
            <div className="userUpdateItem">
              <label>Full Name</label>
              <input
                name="name"
                type="text"
                placeholder="e.g. Suddhu Kumar"
                className="userUpdateInput"
                onChange={handleChange}
              />
            </div>
            <div className="userUpdateItem">
              <label>Bio</label>
              <input
                name="bio"
                type="text"
                placeholder="e.g. Web Developer"
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
                placeholder="Enter your 10 digit number"
                className="userUpdateInput"
                onChange={handleChange}
              />
            </div>
            <div className="userUpdateItem">
              <label>D.O.B</label>
              <input
                name="dob"
                type="date"
                className="userUpdateInput"
                onChange={handleChange}
              />
            </div>
            <div className="userUpdateItem">
              <label>Address</label>
              <input
                name="address"
                type="text"
                placeholder="e.g. Bangalore | India"
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
                  value="male"
                  onChange={handleChange}
                />
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  onChange={handleChange}
                />
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  name="gender"
                  id="other"
                  value="other"
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
                placeholder="e.g. suddhuk21"
                className="userUpdateInput"
                onChange={handleChange}
                required
              />
            </div>
            <div className="userUpdateItem">
              <label>Email</label>
              <input
                name="email"
                type="email"
                placeholder="e.g. suddhu@developer.com"
                className="userUpdateInput"
                onChange={handleChange}
                required
              />
            </div>
            <div className="userUpdateItem">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="must be atleast 6 characters"
                className="userUpdateInput"
                onChange={handleChange}
                required
              />
            </div>
            <div className="userUpdateUpload">
              <img
                className="userUpdateImg"
                src="https://cdn4.vectorstock.com/i/1000x1000/01/38/young-man-profile-vector-14770138.jpg"
                alt=""
              />
              <label htmlFor="file">
                <Publish className="userUpdateIcon" /> Choose
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
            </div>
            {uploaded || skip ? (
              <>
                <button className="userUpdateButton" onClick={handleSubmit}>
                  REGISTER
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
  );
}
