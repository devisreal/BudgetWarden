import "dotenv/config";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// A middleware function which checks whether the JWT token the user provided is valid.
const authorise = async (req, res, next) => {
  // If the client didn't send an `authorisation` header, they are unauthorised
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ message: "This route requires an authentication token" });
  }

  // The client will send the JWT token as part of the `authorisation` header like so: `Bearer ...`
  // We want the token itself, so split that string by a space and get the JWT token (the second part)
  const token = req.headers.authorization.split(" ")[1];

  try {
    // Use the jwt library to check the provided JWT is valid.
    // This is done by comparing it against the JWT secret that was used on creation of the JWT
    const decodedToken = jwt.verify(token, JWT_SECRET);

    // Attach the decoded JWT (the JWT payload) to the request object.
    // Any endpoint that uses this middleware function will be able to access the JWT payload
    req.token = decodedToken;

    // Move on to the next middleware function (if any), otherwise move on to the endpoint.
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "The authentication token is invalid" });
  }
};

export default authorise;
