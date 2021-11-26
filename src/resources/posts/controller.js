const dbClient = require("../../utils/dbClient");
const prisma = dbClient;

const getAllPosts = async (req, res) => {
  try {
    const result = await prisma.post.findMany();
    res.json({ result });
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllPosts };
