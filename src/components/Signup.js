import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup(props) {
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
      const url = "http://localhost:5000/api/auth/createuser";

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
      console.log(json);

      if (json.success) {
        // Save the auth token and redirect to home page
        localStorage.setItem("token", json.token);
        navigate("/");
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
  );
}
