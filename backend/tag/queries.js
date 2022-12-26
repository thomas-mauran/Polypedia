const getAll = "SELECT * FROM tags";
const insert = "INSERT INTO tags (name, description) VALUES($1, $2);"
const getByName = "SELECT * FROM tags WHERE name = $1;"
const getById = "SELECT * FROM tags WHERE id = $1;"

module.exports = {
    getAll,
    insert,
    getByName,
    getById
}