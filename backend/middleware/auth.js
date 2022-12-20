const jwt = require("jsonwebtoken");
const pool = require("../db");
const queries = require("../user/queries");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];




    // if there is no token, return an error
    if (!token)
      return res
        .status(401).redirect('/login');

    // Otherwise, verify the token
    jwt.verify(token, process.env.JWT_TOKEN_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).redirect('/login');
      }
// 
      pool.query(queries.getUserById, [decoded.userId], (error, results) => {
        if (error) {
          console.log(error);

          return res.redirect('/login');
        }
        if (results.rows.length === 0)
          res.status(404).redirect('/login');
        else next();

      });

    });

  } catch (error) {
    res.status(401).json("requete non authentified !" );
  }
};
