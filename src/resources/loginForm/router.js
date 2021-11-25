const express = require("express");

const { checkUser } = require("./controller");

const router = express.Router();

router.post("/", checkUser);

module.exports = router;
