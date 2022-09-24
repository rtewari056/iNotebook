const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const app = express();
dotenv.config();
connectToMongo();
const PORT = process.env.PORT || 5000; // As port 3000 occupied by React App

app.use(express.json());
app.use(cors());

// API home page for all requests
app.all("/", (req, res) => {
  res.status(200);
  if (req.accepts("html")) {
    return res.status(200).sendFile(path.join(__dirname, "views", "home.html"));
  } else if (req.accepts("json")) {
    return res.status(200).json({
      message: "Hello from Express API",
    });
  } else {
    return res.status(200).type("txt").send("Hello from Express API");
  }
});

// Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// If any other route except above routes, return responses mentioned below
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    return res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    return res.json({ error: "404 Not Found" });
  } else {
    return res.type("txt").send("404 Not Found");
  }
});

app.listen(PORT, () => {
  console.log(`iNotebook backend listening on port ${PORT}`);
});
