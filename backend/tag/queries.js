const getAllTags = "SELECT * FROM tags";
const insertTag = "INSERT INTO tags (name, description) VALUES($1, $2);"
const getTagByName = "SELECT * FROM tags WHERE name = $1;"

module.exports = {
    getAllTags,
    insertTag,
    getTagByName
}