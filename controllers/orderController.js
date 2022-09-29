const db = require("../config/db");
const { SUPER_ADMIN_ROLE_NAME, CLIENT_URL } = require("../config/env_variables");
const {
  successResponse,
  failureResponse,
  statusCodes,
  serverFailure
} = require("../utils/api-response");
const { sendMail } = require("../services/emailSender");
const { raiseOrderEmailTemplate } = require("../utils/emailTemplates");

exports.createOrder = async (req, res) => {
  try {
    const {
      customer_name,
      country,
      state,
      city,
      address,
      phone_number,
      email,
      brand,
      production_manager,
      sm_manager,
      items,
      uploader
    } = req.body;

    if (
      !customer_name ||
      !country ||
      !state ||
      !city ||
      !address ||
      !phone_number ||
      !email ||
      !brand ||
      !production_manager ||
      !sm_manager ||
      !uploader
    ) {
      return failureResponse(res, statusCodes.BAD_REQUEST, "Invalid Payload");
    }

    if (!items[0] && !items[0].item_ordered) {
      return failureResponse(res, statusCodes.BAD_REQUEST, "Invalid Payload");
    }

    // create order
    await db("orders").insert({
      customer_name,
      country,
      state,
      city,
      address,
      phone_number,
      email,
      brand,
      production_manager,
      sm_manager,
      uploader,
      items,
      created_at: new Date()
    });

    sendMail({
      to: "kesiena.ogbemi@gmail.com",
      subject: "New Order raised",
      html: raiseOrderEmailTemplate(uploader, `${CLIENT_URL}/admin`, customer_name, city, items)
    })
      .then(info => {
        console.log(info.messageId);
        return successResponse(res, statusCodes.SUCCESS, `order placed succesfully`, {});
      })
      .catch(e => {
        console.log({
          emailErrorLog: e
        });

        return successResponse(res, statusCodes.SUCCESS, `order placed succesfully`, {});
      });
  } catch (error) {
    console.log({ error });
    return serverFailure(res);
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await db("orders").select().orderBy("created_at");
    return successResponse(res, statusCodes.SUCCESS, `orders Fetched succesfully`, { orders });
  } catch (error) {
    console.log({ error });
    return serverFailure(res);
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // check if order exists
    const order = await db("orders").select().where("id", orderId);
    if (!order[0]) {
      return failureResponse(res, statusCodes.BAD_REQUEST, "An order with this id does not exist.");
    }

    if (req.userData.role !== SUPER_ADMIN_ROLE_NAME) {
      return failureResponse(
        res,
        statusCodes.UNAUTHORIZED,
        "you are unauthorized to delete orders"
      );
    }

    // delete order
    await db("orders").delete().where("id", orderId);

    return successResponse(res, statusCodes.SUCCESS, `order deleted succesfully`, {});
  } catch (error) {
    console.log({ error });
    return serverFailure(res);
  }
};
