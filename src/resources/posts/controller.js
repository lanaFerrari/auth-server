const dbClient = require("../../utils/dbClient");
const prisma = dbClient;
const jwt = require("jsonwebtoken");

const getAllPosts = async (req, res) => {
  console.log({ authorization: req.headers.authorization });

  const token = req.headers.authorization;
  const secretKey = process.env.JWT_SECRET;

  jwt.verify(token, secretKey, async (err, payload) => {
    if (err) {
      throw Error("Not Authorized");
    }

    console.log({ payload });

    try {
      const posts = await prisma.post.findMany({
        where: {
          userId: payload.id,
        },
        include: {
          user: true,
        },
      });

      res.json({ posts });
    } catch (error) {
      console.error({ error });
    }
  });
};

module.exports = { getAllPosts };
