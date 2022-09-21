const jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
  try {
    // Get the user from the JWT TOKEN and add id to request object
    const token = req.header("auth-token");

    if (!token) {
      res
        .status(401)
        .send({ error: "Access Denied: Invalid token" });
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      (error, authData) => {
        if (error)
          return res.status(401).json({
            success: false,
            statusCode: 401,
            message: "Access Denied: Invalid token",
          });

        // Setting user email and id for next steps in every API call
        req.email = authData.email;
        req.id = authData.id;
        next();
      }
    );
  } catch (error) {
    res.status(401).send({ error: "Internal server error" });
  }
};

module.exports = fetchUser;
