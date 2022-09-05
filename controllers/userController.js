const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  SUPER_ADMIN_ROLE_NAME,
  USER_ROLE_NAME,
  ADMIN_ROLE_NAME,
  JWT_USER_SECRET
} = require("../config/env_variables");
const {
  successResponse,
  failureResponse,
  statusCodes,
  serverFailure
} = require("../utils/api-response");
// const { sendMail } = require("../services/emailSender");

exports.createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return failureResponse(res, statusCodes.BAD_REQUEST, "Invalid Payload");
    }

    if (role !== USER_ROLE_NAME && role !== ADMIN_ROLE_NAME && role !== SUPER_ADMIN_ROLE_NAME) {
      return failureResponse(res, statusCodes.NOT_FOUND, "user role not found");
    }

    // if (role !== USER_ROLE_NAME && req.userData.role !== SUPER_ADMIN_ROLE_NAME) {
    //   return failureResponse(
    //     res,
    //     statusCodes.UNAUTHORIZED,
    //     "you are unauthorized to create this user role"
    //   );
    // }

    // check if user exists
    const userExists = await db("users").select().where("username", username);
    if (userExists[0]) {
      return failureResponse(
        res,
        statusCodes.BAD_REQUEST,
        "A user with this username already exist."
      );
    }

    const hash = bcrypt.hashSync(password, 8);

    // create user
    await db("users").insert({
      username,
      password: hash,
      role,
      created_at: new Date()
    });

    return successResponse(res, statusCodes.SUCCESS, `user created succesfully`, {});
  } catch (error) {
    console.log({ error });
    return serverFailure(res);
  }
};

exports.getProfile = async (req, res) => {
  try {
    // get id from header token

    const { id } = req.userData;

    // check if user exists
    const user = await db("users").select(["id", "username", "role"]).where("id", id);
    if (!user[0]) {
      return failureResponse(res, statusCodes.BAD_REQUEST, "A user with this id does not exist.");
    }

    return successResponse(res, statusCodes.SUCCESS, `profile fetched succesfully`, { ...user[0] });
  } catch (error) {
    console.log({ error });
    return serverFailure(res);
  }
};

exports.getUsers = async (req, res) => {
  try {
    if (req.userData.role === SUPER_ADMIN_ROLE_NAME) {
      const users = await db("users").select(["id", "username", "role", "created_at"]);
      return successResponse(res, statusCodes.SUCCESS, `user Fetched succesfully`, { users });
    }

    if (req.userData.role === ADMIN_ROLE_NAME) {
      const users = await db("users")
        .select(["id", "username", "role", "created_at"])
        .where("role", USER_ROLE_NAME);
      return successResponse(res, statusCodes.SUCCESS, `user Fetched succesfully`, { users });
    }

    return failureResponse(res, statusCodes.UNAUTHORIZED, "you are unauthorized to fetch users");
  } catch (error) {
    console.log({ error });
    return serverFailure(res);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // check if user exists
    const user = await db("users").select().where("username", username);
    if (!user[0]) {
      return failureResponse(res, statusCodes.UNAUTHORIZED, "Incorrect username or password");
    }

    // compare the passwords using bcrypt
    const passwordIsValid = bcrypt.compareSync(password, user[0].password);

    if (!passwordIsValid) {
      return failureResponse(res, statusCodes.UNAUTHORIZED, "Incorrect username or password");
    }

    const generatedToken = jwt.sign(
      { username: user[0].username, role: user[0].role, id: user[0].id },
      JWT_USER_SECRET,
      {
        expiresIn: "2d"
      }
    );

    return successResponse(res, statusCodes.SUCCESS, "login success", {
      id: user[0].id,
      username: user[0].username,
      role: user[0].role,
      token: generatedToken
    });
  } catch (error) {
    console.log({ error });
    return serverFailure(res);
  }
};

exports.editUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const { userId } = req.params;

    if (!username || !role) {
      return failureResponse(res, statusCodes.BAD_REQUEST, "Invalid Payload");
    }

    if (role !== USER_ROLE_NAME || role !== ADMIN_ROLE_NAME || role !== SUPER_ADMIN_ROLE_NAME) {
      return failureResponse(res, statusCodes.NOT_FOUND, "user role not found");
    }

    if (req.userData.role !== SUPER_ADMIN_ROLE_NAME || req.userData.role !== ADMIN_ROLE_NAME) {
      return failureResponse(res, statusCodes.UNAUTHORIZED, "you are unauthorized to Edit users");
    }

    if (role !== USER_ROLE_NAME && req.userData.role !== SUPER_ADMIN_ROLE_NAME) {
      return failureResponse(
        res,
        statusCodes.UNAUTHORIZED,
        "you are unauthorized to create this user role"
      );
    }

    // check if user exists
    const user = await db("users").select().where("id", userId);
    if (!user[0]) {
      return failureResponse(res, statusCodes.BAD_REQUEST, "A user with this id does not exist.");
    }

    let hash = "";

    if (password) {
      hash = bcrypt.hashSync(password, 8);
    }

    // update user
    await db("users")
      .update({
        username,
        password: hash || user[0].password,
        role
      })
      .where("id", userId);

    return successResponse(res, statusCodes.SUCCESS, `user updated succesfully`, {});
  } catch (error) {
    console.log({ error });
    return serverFailure(res);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // check if user exists
    const user = await db("users").select().where("id", userId);
    if (!user[0]) {
      return failureResponse(res, statusCodes.BAD_REQUEST, "A user with this id does not exist.");
    }

    if (req.userData.role !== SUPER_ADMIN_ROLE_NAME || req.userData.role !== ADMIN_ROLE_NAME) {
      return failureResponse(res, statusCodes.UNAUTHORIZED, "you are unauthorized to delete users");
    }

    if (user[0].role !== USER_ROLE_NAME && req.userData.role !== SUPER_ADMIN_ROLE_NAME) {
      return failureResponse(
        res,
        statusCodes.UNAUTHORIZED,
        "you are unauthorized to delete this user role"
      );
    }

    // delete user
    await db("users").delete().where("id", userId);

    return successResponse(res, statusCodes.SUCCESS, `user deleted succesfully`, {});
  } catch (error) {
    console.log({ error });
    return serverFailure(res);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    const { id } = req.userData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return failureResponse(res, statusCodes.BAD_REQUEST, "Invalid Payload");
    }

    if (req.userData.role !== SUPER_ADMIN_ROLE_NAME || req.userData.role !== ADMIN_ROLE_NAME) {
      return failureResponse(res, statusCodes.UNAUTHORIZED, "you are unauthorized");
    }

    // check if user exists
    const user = await db("users").select().where("id", id);
    if (!user[0]) {
      return failureResponse(res, statusCodes.BAD_REQUEST, "A user with this id does not exist.");
    }

    // compare the old passwords using bcrypt
    const passwordIsValid = bcrypt.compareSync(oldPassword, user[0].password);

    if (!passwordIsValid) {
      return failureResponse(res, statusCodes.UNAUTHORIZED, "Incorrect old password");
    }

    if (newPassword !== confirmPassword) {
      return failureResponse(res, statusCodes.UNAUTHORIZED, "Passwords do not match");
    }

    const hash = bcrypt.hashSync(password, 8);

    // update user
    await db("users")
      .update({
        password: hash
      })
      .where("id", id);

    return successResponse(res, statusCodes.SUCCESS, `password updated succesfully`, {});
  } catch (error) {
    console.log({ error });
    return serverFailure(res);
  }
};
