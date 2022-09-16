const express = require("express");

// controllers
const { createOption, getOptions, deleteOption } = require("../controllers/optionController");

const { checkRole } = require("../middlewares/checkRole");
const { checkUserToken } = require("../middlewares/checkToken");

const router = express.Router();

router.post("/create", checkUserToken, createOption);
router.get("/options", getOptions);
router.delete("/delete/:optionId", checkUserToken, checkRole, deleteOption);

module.exports = router;
