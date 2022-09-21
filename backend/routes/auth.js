const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Importing User model
const { body, validationResult } = require("express-validator"); // Express validator
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticateUser = require("../middleware/authenticateUser");

// ROUTE 1: Create a User using: POST '/api/auth/createuser'. No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { name, email, password } = req.body; // Destructuring from incoming request

    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check whether the email exists already
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(409).json({
          success: false,
          statusCode: 409,
          message: "Sorry! User with this email already exists",
        });
      }

      //  Hashing a password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      await User.create({
        name,
        email,
        password: hashedPassword,
      });

      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Account created successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        statusCode: 500,
        message: "Internal server error",
        error,
      });
    }
  }
);

// ROUTE 2: Authenticate a user using: POST '/api/auth/login'. No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: errors.array()[0].msg,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body; // Destructuring from incoming request

    try {
      const userExists = await User.findOne({ email }); // Pulling user email from database

      if (!userExists) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: "Please try to login with correct credentials",
        });
      }

      const passwordCompare = await bcrypt.compare(
        password,
        userExists.password
      ); // Returns True if the password entered by the user matches

      if (!passwordCompare) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: "Please try to login with correct credentials",
        });
      }

      // Sending token if authentication is successful
      const token = jwt.sign(
        { id: userExists.id, email: userExists.email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: `${process.env.TOKEN_EXPIRY_TIME}d`,
        }
      );

      // Sending token if authentication is successful
      return res.status(200).json({
        success: true,
        statusCode: 200,
        token,
        message: "Logged in successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        statusCode: 500,
        message: "Internal server error",
        error,
      });
    }
  }
);

// ROUTE 3: Get logged in user details using: POST '/api/auth/getUser'. Login required

router.post("/getUser", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password"); // Select without password included
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
