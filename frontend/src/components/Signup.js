import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";

export default function Signup(props) {
  const context = useContext(NoteContext);
  const { hostName } = context;

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password field is not taking inputs(maybe due to logic) thats why creating another state

  let navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (credentials.password === confirmPassword) {
      const url = `${hostName}/api/auth/createuser`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();

      if (json.success) {
        // Redirect to login page
        navigate("/login");
        props.showAlert("Account created successfully", "success");
      } else {
        props.showAlert("Invalid credentials", "danger");
      }
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className=" d-flex justify-content-center align-items-center my-5">
      <div className="card border-info mb-3" style={{ minWidth: "25rem" }}>
        <div
          className="card-header display-6 p-4 text-center"
          style={{ fontSize: "1.6rem" }}
        >
          Welcome to iNotebook
        </div>
        <div className="card-body">
          <form className="container" onSubmit={handleSignup}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={credentials.name}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={credentials.email}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${
                  credentials.password.length === 0
                    ? ""
                    : credentials.password.length < 5
                    ? "is-invalid"
                    : "is-valid"
                }`}
                id="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
              />
              <div className="invalid-feedback">
                Password must be atleast 5 characters
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="cPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className={`form-control ${
                  credentials.password.length === 0
                    ? ""
                    : credentials.password === confirmPassword
                    ? "is-valid"
                    : "is-invalid"
                }`}
                id="cPassword"
                name="cPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
