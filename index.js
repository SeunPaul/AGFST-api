const express = require("express");
const cors = require("cors");
const { failureResponse, statusCodes, successResponse } = require("./utils/api-response");
const db = require("./config/db");

// config dotenv
require("dotenv").config({
  path: "./config/.env"
});

const app = express();

const PORT = process.env.PORT || 8080;

// body parser
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: true }));

// cors
// allow access from client
// const whiteList = ["https://agfsalestracker.netlify.app"];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whiteList.indexOf(origin) != -1) {
//       callback(null, true);
//     } else if (process.env.NODE_ENV !== "production") {
//       callback(null, true);
//     } else {
//       console.log(origin);
// failureResponse(res, statusCodes.UNAUTHORIZED, "Not Allowed by Cors")
//     }
//   }
// };

app.use(cors());

// create tables
const createTable = async () => {
  try {
    // const y = await db.schema.createTable("users", function (table) {
    //   table.increments("id").notNullable();
    //   table.string("username").notNullable();
    //   table.string("password");
    //   table.string("role");
    //   table.timestamps("create_at");
    // });

    const y = await db.schema.createTable("users", function (table) {
      table.increments("id").notNullable();
      table.string("customer_name").notNullable();
      table.string("country");
      table.string("state");
      table.string("city");
      table.string("address");
      table.string("phone_number");
      table.string("email");
      table.string("brand");
      table.string("production_manager");
      table.string("sm_manager");
      table.specificType("items", "JSONB[]");
      table.string("uploader");
      table.timestamps("create_at");
    });

    console.log("success", y);
  } catch (error) {
    console.log("error", error);
  }
};

createTable();

// routes
// Load routers
const userRouter = require("./routes/userRoute");
const orderRouter = require("./routes/orderRoute");

// Use routers
app.use("/user", userRouter);
app.use("/order", orderRouter);
app.use("/", (req, res) => {
  successResponse(res, statusCodes.SUCCESS, "AGF Sales Tracker API. Server is up and running");
});

// handle other requests
app.use("*", (req, res) => failureResponse(res, statusCodes.NOT_FOUND, "route not found"));

app.listen(PORT, console.log(`app running on port ${PORT}`));
