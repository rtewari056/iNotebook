import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [credentials, setCredentials] = useState({email:"", password:""})
    let navigate = useNavigate();
    
  const handleLogin = async (e) => {
    e.preventDefault();

    const url = "http://localhost:5000/api/auth/login";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });

    const json = await response.json();
    console.log(json);

    if(json.success) {
        // Save the auth token and redirect to home page
        localStorage.setItem("token", json.token);
        navigate("/");
    } else {
        alert("Invalid credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <form className="container" onSubmit={handleLogin}>
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
          className="form-control"
          id="password"
          name="password"
          value={credentials.password}
          onChange={onChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
}
