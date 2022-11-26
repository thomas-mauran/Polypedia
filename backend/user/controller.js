const pool = require("../db")
const queries = require("./queries")
const getUsers = (req, res) => {
    pool.query("SELECT * FROM public.Users", (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows)
    })
}

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getUserById, [id], (error, results) => {
        if(error) throw error;
        if(results.rows.length === 0) res.status(404).json({message: `no users with the id : ${id}`})
        res.status(200).json(results.rows)
    })

}
module.exports = {
    getUsers,
    getUserById
}