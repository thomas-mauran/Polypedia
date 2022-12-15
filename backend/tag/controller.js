const pool = require("../db");
const queries = require("./queries");

const getAllTags = (req, res) => {
  pool.query(queries.getAllTags, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ error: error });
    }

    res.status(200).json(results.rows)

  });
};

const insertTag = (req, res) => {
  let { name, description } = req.body
  // Check if name of the tag is already used
  pool.query(queries.getTagByName, [name], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ error: error });
    }

    if (results.rows.length > 0) {
      res.status(403).json({ error: "Tag already exists" });
    }else{
      pool.query(queries.insertTag, [name, description], (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ error: error });
        }
  
        res.status(201).send({ message: "Tag created" });
    
      });
    }
  });

  // Not exists so insert
  
};


module.exports = {
    getAllTags,
    insertTag
}