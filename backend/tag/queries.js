const getAllTags = "SELECT * FROM tags";
const insertTag = "INSERT INTO tags (name, description) VALUES($1, $2);"
const getByName = "SELECT * FROM tags WHERE name = $1;"
const getById = "SELECT * FROM tags WHERE id = $1;"

module.exports = {
    getAllTags,
    insertTag,
    getByName,
    getById
}