const { SUPER_ADMIN_ROLE_NAME, ADMIN_ROLE_NAME } = require("../config/env_variables");
const { failureResponse, statusCodes, serverFailure } = require("../utils/api-response");

exports.checkRole = (req, res, next) => {
  try {
    // check if the client is an admin or super admin
    const { role } = req.userData;
    if (role !== ADMIN_ROLE_NAME && role !== SUPER_ADMIN_ROLE_NAME) {
      return failureResponse(
        res,
        statusCodes.UNAUTHORIZED,
        "You are not authorized to access this route."
      );
    }
    next();
  } catch (error) {
    console.log({ error });
    return serverFailure(res);
  }
};
