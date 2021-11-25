const prisma = require("../../utils/dbClient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function checkUser(req, res) {
  const { email, password: passwordFromRequest } = req.body;
  //Another way of saying: const passwordFromRequest = req.body.password

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

    const matchingPassword = await bcrypt.compare(
      passwordFromRequest,
      passwordFromData
    );

    // createToken
    // - input: an object that represents a user
    // - output: a string that represents a json web token

    const createToken = (user) => {
      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: "8h",
      });

      return token;
    };

    const token = createToken(result);
    console.log("Token", token);

    if (matchingPassword) {
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
