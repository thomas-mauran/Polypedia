const getById = "SELECT id, username, email, is_admin FROM users WHERE id = $1";
const getUserByEmail = "SELECT * FROM users WHERE email = $1;"
const getAll = "SELECT id, username, email, is_admin FROM users;"
const checkEmailExists = "SELECT * FROM users WHERE email = $1;"
const isUserAdmin = "SELECT id FROM users WHERE id = $1 AND is_admin = true;"
const update = 'UPDATE users SET "username"=$2, "email"=$3, "is_admin"=$4 WHERE id=$1'


const addUser = "INSERT INTO users(username, email, password, is_admin) VALUES ($1, $2, $3, $4);"

const deleteFromDb = "DELETE FROM users WHERE id = $1;"
const deleteInter = "DELETE FROM books_users WHERE user_id = $1;"



module.exports = {
    getById,
    getUserByEmail,
    getAll,
    checkEmailExists,
    isUserAdmin,

    update,
    addUser,

    deleteFromDb,
    deleteInter
}