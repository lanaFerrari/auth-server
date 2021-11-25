const prisma = require("../../utils/dbClient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

const createUser = async (req, res) => {
  const { email, password } = req.body;

  const incriptedPassword = await bcrypt.hash(password, 8);

  try {
    const result = await prisma.user.create({
      data: {
        email,
        password: incriptedPassword,
      },
    });

    // createToken
    // - input: an object that represents a user
    // - output: a string that represents a json web token

    const createToken = (result) => {
      const token = jwt.sign({ ...result }, process.env.JWT_SECRET, {
        expiresIn: "8h",
      });

      return token;
    };

    const token = createToken(result);
    console.log("Token", token);

    res.status(201).json(token);
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
};
