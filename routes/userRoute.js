const express = require("express");

// controllers
const {
  createUser,
  getUsers,
  editUser,
  deleteUser,
  login,
  changePassword,
  getProfile
} = require("../controllers/userController");

const { checkRole } = require("../middlewares/checkRole");
const { checkUserToken } = require("../middlewares/checkToken");

const router = express.Router();

router.post("/create", createUser);
router.get("/users", checkUserToken, checkRole, getUsers);
router.get("/profile", checkUserToken, getProfile);
router.put("/edit/:userId", checkUserToken, checkRole, editUser);
router.delete("/delete/:userId", checkUserToken, checkRole, deleteUser);
router.post("/login", login);
router.put("/change/password", checkUserToken, checkRole, changePassword);

module.exports = router;
