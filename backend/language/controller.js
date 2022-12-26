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


module.exports = {
  getAll,
}