const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.log("Failed to connect to MongoDB Atlas", error);
  }
};

module.exports = connectToMongo;