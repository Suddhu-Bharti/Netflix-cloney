import React, { useState } from "react";
import "./login.css";
import { useContext } from "react";
import { login } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isFetching, dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };
  
  if(error){
    alert("Wrong email or password. Please Enter valid credentials!");
  }
  return (
    <div className="login">
      <form action="" className="loginForm">
        <input
          type="email"
          placeholder="Email"
          className="loginInput"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="loginInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="loginButton"
          onClick={handleLogin}
          disabled={isFetching}
        >
          Login
        </button>
      </form>
    </div>
  );
}
