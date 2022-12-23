const pool = require("../db");
const queries = require("./queries");

const getAllAuthors = (req, res) => {
  pool.query(queries.getAllAuthors, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ error: error });
    }

    res.status(200).json(results.rows)

  });
};

const insertAuthor = (req, res) => {
    let { fullname } = req.body
    // Check if fullname of the author is already used
    pool.query(queries.getByName, [fullname], (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ error: error });
      }
  
      if (results.rows.length > 0) {
        res.status(403).json({ error: "Author already exists" });
      }else{
        pool.query(queries.insertAuthor, [fullname], (error, results) => {
          if (error) {
            console.log(error);
            return res.status(500).send({ error: error });
          }
    
          res.status(201).send({ message: "Author created" });
      
        });
      }
    });

    // Not exists so insert
    
  };


module.exports = {
    getAllAuthors,
    insertAuthor
}