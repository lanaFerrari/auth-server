const prisma = require("../../utils/dbClient");

async function checkUser(req, res) {
  const { email, password: passwordFromRequest } = req.body;
  //Another way of saying: const passwordFromRequest = req.body.password
  console.log("BODY", req.body);

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(401).json({ message: "Not Authorized" });
    }

    const { password: passwordFromData } = user;

    if (passwordFromData === passwordFromRequest) {
      res.status(200).json({ user });
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  checkUser,
};
