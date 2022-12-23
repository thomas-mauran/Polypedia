const pool = require("../db");
const queries = require("./queries");

const getAllLanguages = (req, res) => {
  pool.query(queries.getAllLanguages, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ error: error });
    }

    res.status(200).json(results.rows)

  });
};



module.exports = {
    getAllLanguages,
}