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

const deleteFromDb = async (req, res) => {
  try{
    const id = req.params.id

    const idExist = await pool.query(queries.getById, [id]);

    if(idExist.rows.length < 1) return res.status(404).send("id not found")

    await pool.query(queries.deleteInter, [id])
    await pool.query(queries.deleteFromDb, [id])

    return res.status(200).send()

  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
  }

}


module.exports = {
    getAll,
    insert,
    deleteFromDb
}