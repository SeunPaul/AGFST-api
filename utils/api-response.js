const statusCodes = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  UNPROCESSED_ENTITY: 442
};

exports.statusCodes = statusCodes;

const SERVER_ERROR_MESSAGE = "Ooops! Something went wrong, kindly try again";

exports.SERVER_ERROR_MESSAGE = SERVER_ERROR_MESSAGE;

/**
 *
 * @param {*} res - express response object
 * @param {*} message
 * @param {*} statusCode
 * @param {*} data
 * @returns
 */

exports.successResponse = (res, statusCode = statusCodes.SUCCESS, message, data) =>
  res.status(statusCode).json({
    success: true,
    message,
    data
  });

/**
 *
 * @param {*} res - express response object
 * @param {*} message
 * @param {*} statusCode
 * @returns =
 */
exports.failureResponse = (res, statusCode = statusCodes.BAD_REQUEST, message) =>
  res.status(statusCode).json({
    success: false,
    message
  });

/**
 *
 * @param {*} res - express response object
 * @param {*} message
 * @param {*} statusCode
 */
exports.serverFailure = (
  res,
  statusCode = statusCodes.SERVER_ERROR,
  message = SERVER_ERROR_MESSAGE
) => {
  res.status(statusCode).json({
    success: false,
    message
  });
};
