const pool = require("../db");
const queries = require("./queries");


// To get a user using it's id 
const getById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(queries.getById, [id]);
    if (results.rows.length === 0) {
      return res.status(404).json({ message: `no author with the id : ${id}` });
    }
    res.status(200).json(results.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
  }
};

const getAttributes = (req, res) => {
  const attributes = [
    {
      name: "fullname",
      type: "text",
      placeholder: "fullname of the author",
      value: "",
    },
  ];
  return res.status(200).send(attributes);
};
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
  try {
    const id = req.params.id;

    const idExist = await pool.query(queries.getById, [id]);

    if (idExist.rows.length < 1) return res.status(404).send("id not found");

    await pool.query(queries.deleteInter, [id]);
    await pool.query(queries.deleteFromDb, [id]);

    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
  }
};

const update = async (req, res) => {
  try {
    let id = req.params.id
    let { fullname } = req.body;
    await pool.query(queries.update, [id, fullname]);
    res.status(204).send({ message: "Tag updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
  }
};


module.exports = {
  getAll,
  insert,
  deleteFromDb,
  getAttributes,
  getById,
  update
};
