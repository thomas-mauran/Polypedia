const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pool = require("../db");
const queries = require("./queries");
const bookQueries = require("../book/queries");

const getAttributes = (req, res) => {
  const attributes = [
    {
      name: "username",
      type: "text",
      placeholder: "this is the username of the user",
      value: "",
    },
    {
      name: "email",
      type: "text",
      placeholder: "email@email.com",
      value: "",
    },
    {
      name: "password",
      type: "text",
      placeholder: "Strong password",
      value: "",
    },
    {
      name: "is_admin",
      type: "checkbox",
      placeholder: "",
      value: false,
    },
  ];
  return res.status(200).send(attributes);
};

const update = async (req, res) => {
  try {
    let id = req.params.id;
    let { username, email, is_admin } = req.body;
    await pool.query(queries.update, [id, username, email, is_admin]);
    res.status(204).send({ message: "User updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
  }
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

// To get a user using it's id
const getById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(queries.getById, [id]);
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
    // If we have the token and the user is admin it means we are sending from the admin pannel
    // So we wanna be able to retrieve the is_admin value

    const token = req.headers["x-access-token"];
    let decoded, is_admin;
    let isAdminResult = [];
    console.log(token);
    if (token !== undefined) {
      decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
      userId = decoded.userId;
      isAdminResult = await pool.query(queries.isUserAdmin, [userId]);
    }

    const { username, email, password } = req.body;

    console.log(isAdminResult.rows);
    if (isAdminResult.rows && isAdminResult.rows.length > 0) {
      is_admin = req.body.is_admin;
    }
    console.log(is_admin);
    let is_adminValue = is_admin !== undefined ? is_admin : false;

    console.log(is_adminValue);

    const cryptedPassword = await bcrypt.hash(password, 10);

    // we check if the mail isn't already used
    const emailExists = await pool.query(queries.checkEmailExists, [email]);
    if (emailExists.rows.length) {
      return res.status(403).send("This email is already in use");
    }

    // we insert the iser
    await pool.query(queries.addUser, [username, email, cryptedPassword, is_adminValue]);
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

    // we compare argument password to db crypted password

    const validPassword = await bcrypt.compare(password, dbPassword);
    if (!validPassword) {
      return res.status(401).send({ error: "Incorrect password" });
    }
    // We create a token and send it
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN_KEY, { expiresIn: "6h" });
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

const deleteFromDb = async (req, res) => {
  try {
    const id = req.params.id;

    const idExist = await pool.query(queries.getById, [id]);

    if (idExist.rows.length < 1) return res.status(404).send("id not found");

    const getAllLikedBooks = await pool.query(bookQueries.getLikedBooks, [id]);

    getAllLikedBooks.rows.forEach(async (bookId) => {
      await pool.query(bookQueries.removeLike, [bookId]);
    });

    await pool.query(queries.deleteInter, [id]);
    await pool.query(queries.deleteFromDb, [id]);

    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
  }
};


module.exports = {
  getById,
  signup,
  loginUser,
  isUserAdmin,
  getAll,
  deleteFromDb,
  getAttributes,
  update
};
