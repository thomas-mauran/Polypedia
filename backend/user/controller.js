const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pool = require("../db");
const queries = require("./queries");


// Get a user info using his id
const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getUserById, [id], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ error: error });
    }
    if (results.rows.length === 0)
      res.status(404).json({ message: `no users with the id : ${id}` });
    else res.status(200).json(results.rows);
  });
};

// Create a new user
const createUser = async (req, res) => {
  const { login, email, password } = req.body;

  let cryptedPassword = await bcrypt.hash(password, 10);

  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ error: error });
    }
    if (results.rows.length) {
      res.status(403).json({ error: "This email is already used" });
    }
  });

  pool.query(
    queries.addUser,
    [login, email, cryptedPassword, false],
    (error, results) => {
      if (error) throw error;
      res.status(201).json({ message: "User created with succes" });
    }
  );
};

// Login function
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let dbPassword;
  let userId;

  // Check if email exists in the db
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ error: error });
    }
    if (results.rows.length < 1) {
      res.status(404).json({ error: "Email not found" });
    } else {
      // get the password associated with this email
      pool.query(queries.getPasswordByEmail, [email], (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ error: error });
        }

        userId = results.rows[0].id;
        dbPassword = results.rows[0].password;

        // compare the password sent by the user to the one inside the bd
        try {
          let b = bcrypt.compare(password, dbPassword).then((valid) => {
            try {
              // If they are not the same cancel
              if (!valid) {
                return res.status(401).json({ error: "Incorrect password" });
              }
              // If they are the same
              if (valid) {
                // Create a jwt token for the user
                const token = jwt.sign({ userId: userId }, "abc", {
                  expiresIn: "24h",
                });

                // Send back response with token
                res.status(200).send({ token });
              }
            } catch (error) {
              return res.status(500).send({ error: error });
            }
          });
        } catch (error) {
          console.log(error);
          return res.status(500).send({ error: error });
        }
      });
    }
  });
};

module.exports = {
  getUserById,
  createUser,
  loginUser,
};
