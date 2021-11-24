const { prisma } = require("../../utils/dbClient");

const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
};
