const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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


// To get a user using it's id 
const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(queries.getUserById, [id]);
    if (results.rows.length === 0) {
      return res.status(404).json({ message: `no users with the id : ${id}` });
    }
    res.status(200).json(results.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
  }
};

// Create a new user
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const cryptedPassword = await bcrypt.hash(password, 10);

    // we check if the mail isn't already used
    const emailExists = await pool.query(queries.checkEmailExists, [email]);
    if (emailExists.rows.length) {
      return res.status(403).send("This email is already in use");
    }

    // we insert the iser
    await pool.query(queries.addUser, [username, email, cryptedPassword, false]);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// Login function
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // We check if the email exists in the db
    const user = await pool.query(queries.getUserByEmail, [email]);
    if (user.rows.length < 1) {
      return res.status(404).send({ error: "Email not found" });
    }

    const dbPassword = user.rows[0].password;
    const userId = user.rows[0].id;
    const is_admin = user.rows[0].is_admin;

    console.log(user);
    console.log(password);
    // we compare argument password to db crypted password

    const validPassword = await bcrypt.compare(password, dbPassword);
    if (!validPassword) {
      return res.status(401).send({ error: "Incorrect password" });
    }
    // We create a token and send it
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN_KEY, { expiresIn: "20m" });
    res.send({ token, id: userId, is_admin });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

const isUserAdmin = async (req, res) => {
  try {
    const userId = req.params.id;

    const isAdminResult = await pool.query(queries.isUserAdmin, [userId]);

    if (isAdminResult.rows.length < 1) {
      res.status(401).send();
    }
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

module.exports = {
  getUserById,
  signup,
  loginUser,
  isUserAdmin,
  getAll
};
