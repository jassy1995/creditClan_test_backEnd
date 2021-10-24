const express = require("express");
const { FileReader } = require("../controllers/fileReader");
const router = express.Router();
//read file route
router.post("/fileReader", FileReader);

module.exports = router;
