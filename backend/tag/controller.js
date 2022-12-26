const pool = require("../db");
const queries = require("./queries");

const getAll = (req, res) => {
  pool.query(queries.getAll, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ error: error });
    }

    res.status(200).json(results.rows)

  });
};


  const insert = async (req, res) => {
    try {
      let { name, description } = req.body
      const results = await pool.query(queries.getByName, [name]);
      if (results.rows.length > 0) {
        return res.status(403).json({ error: "Tag already exists" });
      }
      await pool.query(queries.insert, [name, description]);
      res.status(201).send({ message: "Tag created" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error });
    }
  };



module.exports = {
  getAll,
    insert
}