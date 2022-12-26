const getUserById = "SELECT * FROM users WHERE id = $1";
const checkEmailExists = "SELECT * FROM users WHERE email = $1"
const addUser = "INSERT INTO users(login, email, password, is_admin) VALUES ($1, $2, $3, $4)"
const getUserByEmail = "SELECT * FROM users WHERE email = $1;"
const isUserAdmin = "SELECT id FROM users WHERE id = $1 AND is_admin = true;"
const getAll = "SELECT id, login, email, is_admin FROM users"
module.exports = {
    getUserById,
    checkEmailExists,
    addUser,
    getUserByEmail,
    isUserAdmin,
    getAll
}