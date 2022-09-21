const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
connectToMongo();
const port = process.env.PORT || 5000; // As port 3000 occupied by React App

app.use(express.json());
app.use(cors());

// Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`);
});
