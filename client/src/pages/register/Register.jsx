import React, { useRef, useState } from "react";
import "./register.scss";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const usernameRef = useRef();
  const emailRef = useRef();
  const navigate = useNavigate();
 
  const handleStart = () => {
    setEmail(emailRef.current.value);
    setUsername(usernameRef.current.value);
  };
  const handleFinish = async (e) => {
    e.preventDefault();
    console.log({username, email, password})
    try{
      await axiosInstance.post("auth/register", {username, email, password});
    }catch(err){
      console.log(err)
    }
    navigate("/login");
  };
  
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <Link to="/login" className="link">
          <button className="loginButton">Sign In</button>
          </Link>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        
        {!email ? (
          <div className="input">
            <input type="text" placeholder="Username" ref={usernameRef} />
            <input type="email" placeholder="Email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
