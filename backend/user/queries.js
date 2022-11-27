const getUserById = "SELECT * FROM users WHERE id = $1";
const checkEmailExists = "SELECT * FROM users WHERE email = $1"
const addUser = "INSERT INTO users(login, email, password, is_admin) VALUES ($1, $2, $3, $4)"
const getPasswordByEmail = "SELECT id, password FROM users WHERE email = $1"


module.exports = {
    getUserById,
    checkEmailExists,
    addUser,
    getPasswordByEmail
}