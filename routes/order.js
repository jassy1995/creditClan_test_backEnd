const express = require("express");
const { postOrder, getAllMyOrder } = require("../controllers/order");
const { isLogin } = require("../middleware/auth");
const router = express.Router();

//this route get all order belong to a specific user
router.get("/user/fetchMyOrder", isLogin, getAllMyOrder);
//this submit  the get order form
router.post("/user/getOrder", isLogin, postOrder);

module.exports = router;
