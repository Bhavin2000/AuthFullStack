import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { saveToken } from "./tokenUtils";
import { loginUser, registerUser } from "../services/api";

const Auth = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    repeatPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = isLogin
      ? {
        username: formData.username,
        password: formData.password,
      }
      : {
        username: formData.username,
        password: formData.password,
        repeatPassword: formData.repeatPassword,
        email: formData.email,
      };

    if (!isLogin && payload.password !== payload.repeatPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const data = isLogin ? await loginUser(payload) : await registerUser(payload);

      if (data.token) {
        saveToken(data.token);
        localStorage.setItem("userData", JSON.stringify(data));
        setIsAuthenticated(true); // Update the state
        navigate("/"); // Redirect to root path (Dashboard)
      } else {
        setMessage("Registration successful! Please login.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.message || "An error occurred. Please try again.");
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-html">
        <input
          id="tab-1"
          type="radio"
          name="tab"
          className="sign-in"
          defaultChecked
          onClick={() => setIsLogin(true)}
        />
        <label htmlFor="tab-1" className="tab">
          Sign In
        </label>
        <input
          id="tab-2"
          type="radio"
          name="tab"
          className="sign-up"
          onClick={() => setIsLogin(false)}
        />
        <label htmlFor="tab-2" className="tab">
          Sign Up
        </label>
        <div className="login-form">
          {isLogin ? (
            <div className="sign-in-htm">
              <div className="group">
                <label htmlFor="user" className="label">
                  Username
                </label>
                <input
                  id="user"
                  type="text"
                  className="input"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">
                  Password
                </label>
                <input
                  id="pass"
                  type="password"
                  className="input"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="group">
                <input
                  id="check"
                  type="checkbox"
                  className="check"
                  defaultChecked
                />
                <label htmlFor="check">
                  <span className="icon"></span> Keep me Signed in
                </label>
              </div>
              <div className="group">
                <input
                  type="submit"
                  className="button"
                  value="Sign In"
                  onClick={handleSubmit}
                />
              </div>
              <div className="hr"></div>
              <div className="foot-lnk">
                <a href="#forgot">Forgot Password?</a>
              </div>
            </div>
          ) : (
            <div className="sign-up-htm">
              <div className="group">
                <label htmlFor="user" className="label">
                  Username
                </label>
                <input
                  id="user"
                  type="text"
                  className="input"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">
                  Password
                </label>
                <input
                  id="pass"
                  type="password"
                  className="input"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="group">
                <label htmlFor="repeat-pass" className="label">
                  Repeat Password
                </label>
                <input
                  id="repeat-pass"
                  type="password"
                  className="input"
                  name="repeatPassword"
                  value={formData.repeatPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="group">
                <label htmlFor="email" className="label">
                  Email Address
                </label>
                <input
                  id="email"
                  type="text"
                  className="input"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="group">
                <input
                  type="submit"
                  className="button"
                  value="Sign Up"
                  onClick={handleSubmit}
                />
              </div>
              <div className="hr"></div>
              <div className="foot-lnk">
                <label htmlFor="tab-1">Already Member?</label>
              </div>
            </div>
          )}
        </div>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Auth;
