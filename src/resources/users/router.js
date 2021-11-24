const express = require("express");

const { createUser } = require("./controller");

const router = express.Router();

router.post("/registration", createUser);

module.exports = router;
