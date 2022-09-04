const express = require("express");

// controllers
const { createOrder, getOrders, deleteOrder } = require("../controllers/orderController");

const { checkRole } = require("../middlewares/checkRole");
const { checkUserToken } = require("../middlewares/checkToken");

const router = express.Router();

router.post("/create", checkUserToken, createOrder);
router.get("/orders", checkUserToken, checkRole, getOrders);
router.delete("/delete/:orderId", checkUserToken, checkRole, deleteOrder);

module.exports = router;
