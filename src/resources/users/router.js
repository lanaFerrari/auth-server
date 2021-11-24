const express = require("express");

const { createUser } = require("./controller");

const router = express.Router();

router.post("/", createUser);

module.exports = router;
