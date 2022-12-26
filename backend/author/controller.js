const pool = require("../db");
const queries = require("./queries");

const getAll = async (req, res) => {
  try {
    const results = await pool.query(queries.getAll);
    res.status(200).json(results.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
  }
};

const insert = async (req, res) => {
  try {
    let { fullname } = req.body;
    const results = await pool.query(queries.getByName, [fullname]);
    if (results.rows.length > 0) {
      return res.status(403).json({ error: "Author already exists" });
    }
    await pool.query(queries.insert, [fullname]);
    res.status(201).send({ message: "Author created" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
  }
};



module.exports = {
    getAll,
    insert
}