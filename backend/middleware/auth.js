const jwt = require("jsonwebtoken");
const pool = require("../db");
const queries = require("../user/queries");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    // if there is no token, return an error
    if (!token) return res.status(401).send("Unauthorized");

    const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);


    const user = await pool.query(queries.getUserById, [decoded.userId]);
    if (!user) {
      return res.status(401).send('Unauthorized');
    }
      next();
  } catch (error) {
    return res.status(401).send('Unauthorized');
  }
};
