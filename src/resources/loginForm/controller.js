const prisma = require("../../utils/dbClient");
const bcrypt = require("bcrypt");
const { createToken } = require("../../utils/authentication");

async function checkUser(req, res) {
  const { email, password: passwordFromRequest } = req.body;
  //Another way of saying: const passwordFromRequest = req.body.password
  console.log("BODY", req.body);

  if (!email || !passwordFromRequest) {
    res.status(400).json({ error: "Email or Password missing" });
  }

  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    console.log("FOUND", foundUser);

    if (!foundUser) {
      res.status(401).json({ message: "Not Authorized" });
    }

    const { password: passwordFromData } = foundUser;

    const matchingPassword = await bcrypt.compare(
      passwordFromRequest,
      passwordFromData
    );

    if (matchingPassword) {
      const userToToken = {
        ...foundUser,
      };

      delete userToToken.password;

      const token = createToken(userToToken);

      res.status(200).json({ token });
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
