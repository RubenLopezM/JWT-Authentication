import React from "react";
import { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./navbar.js";

import "../../styles/register.css";

const Signup = () => {
  const { store, actions } = useContext(Context);
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name == "email") {
      setForm({ ...form, email: value });
    }
    if (name == "password") {
      setForm({ ...form, password: value });
    }
    if (name == "username") {
      setForm({ ...form, username: value });
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="signup__wrapper">
        <h2 className="signup__title">Create an account</h2>
        <form className="signup__form">
          <div>
            <label className="signup__label">Email: </label>
            <input
              name="email"
              type="text"
              onChange={handleSubmit}
              className="signup__input"
            />
          </div>
          <div>
            <label className="signup__label">Password: </label>
            <input
              name="password"
              type="password"
              onChange={handleSubmit}
              className="signup__input"
            />
          </div>
          <div>
            <label className="signup__label">Username: </label>
            <input
              name="username"
              type="text"
              onChange={handleSubmit}
              className="signup__input"
            />
          </div>
          <button
            className="signup__button"
            type="button"
            onClick={() => {
              actions.register(form);
              navigate("/login");
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
