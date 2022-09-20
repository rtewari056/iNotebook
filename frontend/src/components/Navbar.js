import React from "react";
// import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  let location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    props.showAlert("Log out successful", "success");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <Link
                className="btn btn-outline-primary me-2"
                to="/login"
                role="button"
              >
                Login
              </Link>
              <Link className="btn btn-primary" to="/signup" role="button">
                Sign up
              </Link>
            </form>
          ) : (
            <form className="d-flex">
              <Link
                className="btn btn-outline-primary me-2"
                role="button"
                to="/login"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}
