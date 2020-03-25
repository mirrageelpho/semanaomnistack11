const connection = require("../database/connection");
module.exports = {
  create: async (req, res) => {
    const { id } = req.body;
    console.log(id);
    const ong = await connection("ongs")
      .where("id", id)
      .select("name")
      .first();

    if (!ong) return res.send(401).json({ error: "Not Found" });

    return res.json(ong);
  }
};
