import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <div className="ml-auto">
          <Link to="/signup">
            <button className="btn btn-primary me-2">Sign up</button>
          </Link>
          {!token ? (
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
          ) : (
            <button className="btn btn-primary" onClick={logout}>
              Log out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
