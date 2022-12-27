const getAll = "SELECT * FROM tags ORDER BY name;";
const getByName = "SELECT * FROM tags WHERE name = $1;"
const getById = "SELECT * FROM tags WHERE id = $1;"

const insert = "INSERT INTO tags (name, description) VALUES($1, $2);"

const deleteFromDb = "DELETE FROM tags WHERE id = $1;"
const deleteInter = "DELETE FROM books_tags WHERE tag_id = $1;"


module.exports = {
    getAll,
    getByName,
    getById,
    insert,
    deleteFromDb,
    deleteInter

}