const Pool = require("pg").Pool;

const pool = new Pool({
    user: "admin",
    host: process.env.HOST,
    database: process.env.DB,
    password: process.env.PASSWORD,
    port: process.env.DBPORT
})

module.exports = pool;