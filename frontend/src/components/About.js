import React from "react";

export default function About() {
  return (
    <div className="container my-5">
      <div className="card text-bg-light border-primary">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={require("../images/Profile_picture.jpg")}
              className="img-fluid rounded-start"
              alt="Rohit Tewari"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">
                <span className="fs-1">👋</span> Hello, I am Rohit
              </h3>

              <p className="card-text fs-5 mt-3">
                I am a MERN Stack Developer who is mostly inclined towards React
                JS. I've also worked on server-side code using Node JS & Express
                JS. I am actively contributing to open-source projects and
                building Web Applications.
              </p>

              <p className="fs-5">
                You can find me using the links below. I am happy to connect
                with you.
              </p>

              <div className="w-25 d-flex justify-content-between">
                <a
                  href="https://www.linkedin.com/in/rtewari056/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className="fab fa-linkedin fs-2"
                    style={{ color: "#0A66C2" }}
                  ></i>
                </a>

                <a
                  href="https://github.com/rtewari056"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github fs-2" />
                </a>

                <a
                  href="https://twitter.com/rtewari056"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className="fab fa-twitter fs-2"
                    style={{ color: "#1DA1F2" }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
