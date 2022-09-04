const jwt = require("jsonwebtoken");
const { JWT_USER_SECRET } = require("../config/env_variables");
const { failureResponse, statusCodes } = require("../utils/api-response");

// verifies that user jwt token is valid
function checkUserToken(req, res, next) {
  const header = req.headers.authorization;
  try {
    if (typeof header !== "undefined") {
      const bearer = header.split(" ");
      const token = bearer[1] || req.token;
      const decoded = jwt.verify(token, JWT_USER_SECRET);
      req.userData = decoded;
      next();
    } else {
      failureResponse(res, statusCodes.FORBIDDEN, "token is required");
    }
  } catch (error) {
    return failureResponse(res, statusCodes.FORBIDDEN, "Invalid token");
  }
}
module.exports = {
  checkUserToken
};
