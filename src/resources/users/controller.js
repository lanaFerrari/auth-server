const prisma = require("../../utils/dbClient");
const bcrypt = require("bcrypt");
const { createToken } = require("../../utils/authentication");

const createUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("BODY", req.body);

  const incriptedPassword = await bcrypt.hash(password, 8);

  try {
    const result = await prisma.user.create({
      data: {
        email,
        password: incriptedPassword,
      },
      select: {
        id: true,
        email: true,
      },
    });

    const token = createToken(result);

    res.status(201).json(token);
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
};
