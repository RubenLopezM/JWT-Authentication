import React from "react";
import { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./navbar.js";

import "../../styles/login.css";

const Login = () => {
  const { store, actions } = useContext(Context);
  const [form, setForm] = useState({
    email: "",
    password: "",
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
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="login__wrapper">
        <h2 className="login__title">Log in</h2>
        <form className="login__form">
          <div>
            <label className="login__label">Email: </label>
            <input
              name="email"
              type="text"
              onChange={handleSubmit}
              className="signup__input"
            />
          </div>
          <div>
            <label className="login__label">Password: </label>
            <input
              name="password"
              type="password"
              onChange={handleSubmit}
              className="login__input"
            />
          </div>
          <button
            className="login__button"
            type="button"
            onClick={async () => {
              await actions.login(form);
              navigate("/private");
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
