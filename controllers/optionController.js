const db = require("../config/db");
const { SUPER_ADMIN_ROLE_NAME } = require("../config/env_variables");
const {
  successResponse,
  failureResponse,
  statusCodes,
  serverFailure
} = require("../utils/api-response");

exports.createOption = async (req, res) => {
  try {
    const { type, value } = req.body;

    if (!type || !value) {
      return failureResponse(res, statusCodes.BAD_REQUEST, "Invalid Payload");
    }

    // create option
    await db("options").insert({
      type,
      value
    });

    return successResponse(res, statusCodes.SUCCESS, `option created succesfully`, {});
  } catch (error) {
    console.log({ error });
    return serverFailure(res);
  }
};

exports.getOptions = async (req, res) => {
  try {
    const options = await db("options").select().orderBy("value");
    return successResponse(res, statusCodes.SUCCESS, `options Fetched succesfully`, { options });
  } catch (error) {
    console.log({ error });
    return serverFailure(res);
  }
};

exports.deleteOption = async (req, res) => {
  try {
    const { optionId } = req.params;

    // check if option exists
    const option = await db("options").select().where("id", optionId);
    if (!option[0]) {
      return failureResponse(
        res,
        statusCodes.BAD_REQUEST,
        "An option with this id does not exist."
      );
    }

    if (req.userData.role !== SUPER_ADMIN_ROLE_NAME) {
      return failureResponse(
        res,
        statusCodes.UNAUTHORIZED,
        "you are unauthorized to delete options"
      );
    }

    // delete option
    await db("options").delete().where("id", optionId);

    return successResponse(res, statusCodes.SUCCESS, `option deleted succesfully`, {});
  } catch (error) {
    console.log({ error });
    return serverFailure(res);
  }
};
