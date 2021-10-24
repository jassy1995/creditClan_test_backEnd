const express = require("express");
const userController = require("../controllers/user");
const { isLogin } = require("../middleware/auth");
const router = express.Router();

//this submit  the login form
router.post("/user/login", userController.LoginUser);
//this submit the sign up form
router.post("/user/register", userController.RegisterUser);

module.exports = router;
